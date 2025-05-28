import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

interface Group {
  _id: string;
  name: string;
  admin: string;
  members: string[];
}

interface Message {
  _id: string;
  sender: { _id: string; username: string };
  text: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private baseUrl = 'http://localhost:5000/api';
  private socket: Socket = io('http://localhost:5000');

  private messageSubjects: Map<string, Subject<Message>> = new Map();

  constructor(private http: HttpClient) {}

  register(userId: string) {
    console.log('resgister',userId)
    this.socket.emit('register', userId);
  }

  onAny(listener: (event: string, ...args: any[]) => void): void {
    this.socket.onAny(listener);
  }


  createGroup(name: string, members: string[], adminId: string) {
    this.socket.emit('create_group', { name, members, adminId });
  }

  createdGroupDetail(): Observable<any> {
    return new Observable(observer => {
      const handler = (msg: any) => observer.next(msg);
      this.socket.on('group_created', handler);
      return () => this.socket.off('group_created', handler);
    });
  }

  receiveGroupMessages(groupId: string): Observable<any> {
    return new Observable(observer => {
      const eventName = `receive_group_message_${groupId}`;
      this.socket.on(eventName, (msg) => observer.next(msg));
  
      // Cleanup on unsubscribe
      return () => {
        this.socket.off(eventName);
      };
    });
  }
  
  sendGroupMessage(data: any) {
    this.socket.emit('send_group_message', data);
  }
  

  sendGroupMessages(groupId: string, senderId: string, text: string): void {
    this.socket.emit('send_group_message', { groupId, senderId, text });
  }

  getGroupMessage(groupId: string): void {
    this.socket.emit('get_group_messages', { groupId });
  }

  getGroupMessageRecived(groupId: string): Observable<Message[]> {
    return new Observable(observer => {
      const handler = (messages: Message[]) => {
        observer.next(messages);
      };
      this.socket.on(`group_messages_${groupId}`, handler);
      return () => this.socket.off(`group_messages_${groupId}`, handler);
    });
  }

  getUserGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.baseUrl}/groups`);
  }

  getGroupMembers(groupId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/groups/${groupId}/members`);
  }

  addMember(groupId: string, memberId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/groups/${groupId}/members`, { memberId });
  }

  removeMember(groupId: string, memberId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/groups/${groupId}/members`, {
      body: { memberId },
    });
  }


}
