// server.js
const express = require('express');
const http = require('http');
const { connection } = require('./config/conn');
const dotenv = require('dotenv');
const cors = require('cors');
const socketIO = require('socket.io');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const messageRoutes = require('./routes/message.routes');
const chatSocket = require('./sockets/chat.socket');
const groupRoutes = require('./routes/group.routes');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api', groupRoutes);

// Socket.IO setup
chatSocket(io);

// MongoDB Connection

connection(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB connected');
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
