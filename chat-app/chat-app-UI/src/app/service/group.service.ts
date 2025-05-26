import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  providedIn: 'root'
})
export class GroupService {

  private baseUrl = 'http://localhost:5000/api'; // backend API base URL

  constructor(private http: HttpClient) {}

  createGroup(name: string, members: string[], userId:string): Observable<any> {
    return this.http.post(`${this.baseUrl}/groups/${userId}`, { name, members });
  }

  getUserGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.baseUrl}/groups`);
  }

  addMember(groupId: string, memberId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/groups/${groupId}/members`, { memberId });
  }

  removeMember(groupId: string, memberId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/groups/${groupId}/members`, { body: { memberId } });
  }

  getGroupMessages(groupId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/groups/${groupId}/messages`);
  }

  sendGroupMessage(groupId: string, sender: string, text: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/groups/${groupId}/messages`, { sender, text });
  }

}
