const redisClient = require('./redisClient');

const redisSubscriber = redisClient.duplicate();

redisSubscriber.on('connect', () => console.log('Redis subscriber connected'));
redisSubscriber.on('error', (err) => console.log(`Redis subscriber error`,err));


function setupAlert(wss) {
    redisSubscriber.subscribe('sso-channel', (err, count) => {
        if(err){
            console.error('Failed to subscribe', err);
            return;
        }
        console.log(`Subscribe to ${count} channel(s)`);
    });

    redisSubscriber.on('message', (channel, message) => {
        if(channel === 'sso-channel'){
            const data = JSON.parse(message);
            console.log('Recived sso alert',data);
            console.log(client)

            wss.clients.forEach(client => {
                if(client.readyState === 1 && client.userId == data.userId) {
                    console.log(`client: ${client}`, `data: ${data}`)
                    client.send(JSON.stringify({
                        type:'SSO_Alert',
                        message: 'You have logged in from another device!'
                    }));
                }
            });
        }
    });
}

module.exports = setupAlert;