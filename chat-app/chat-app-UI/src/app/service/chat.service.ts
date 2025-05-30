import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = io('http://localhost:5000');

  register(userId: string) {
    this.socket.emit('register', userId);
  }

  sendPrivateMessage(data: any) {
    this.socket.emit('private_message', data);
  }

  receivePrivateMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('receive_private_message', (msg) => observer.next(msg));
    });
  }

  sendGroupMessage(data: any) {
    this.socket.emit('group_message', data);
  }

  receiveGroupMessages(groupId: string): Observable<any> {
    return new Observable(observer => {
      this.socket.on(`receive_group_message_${groupId}`, msg => observer.next(msg));
    });
  }


}
