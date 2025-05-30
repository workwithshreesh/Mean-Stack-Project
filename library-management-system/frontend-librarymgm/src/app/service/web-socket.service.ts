import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket!: WebSocket

  connect(userId: string){
    console.log('userId',userId)
    if(!this.socket || this.socket.readyState !== WebSocket.OPEN){
      console.log(`ws://localhost:8000?userId=${userId}`)
      this.socket = new WebSocket(`ws://localhost:8000?userId=${userId}`);

      this.socket.onopen = () => {
        console.log('websocket connection stablished');
      };

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if(data.type == 'SSO_Alert'){
          console.log("msg")
          alert(data.message);
        }
      };
  
      this.socket.onerror = (error) => {
        console.error('Websocket error', error);
      };
  
      this.socket.onclose = () => {
        console.warn('websocket connection closed');
      };
    }
  }


  disconnect() {
    if(this.socket){
      this.socket.close();
    }
  }


  
}
