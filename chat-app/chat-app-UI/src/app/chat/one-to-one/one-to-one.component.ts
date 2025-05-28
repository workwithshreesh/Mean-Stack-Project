import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../service/socket.service';
import { CommonsettingService } from '../../service/commonsetting.service';

@Component({
  selector: 'app-one-to-one',
  standalone: false,
  templateUrl: './one-to-one.component.html',
  styleUrl: './one-to-one.component.css'
})
export class OneToOneComponent implements OnInit {
  users: any[] = [];
  messages: any[] = [];
  message = '';
  search = '';
  selectedUser: any;
  currentUser: any;
  chattedUsers:any;

  constructor(
    private http: HttpClient,
    private socketService: SocketService,
    private commonSetting: CommonsettingService
  ) {}

  ngOnInit() {
    this.currentUser = JSON.parse(this.commonSetting.getSessionItem('auth')!);
    this.socketService.register(this.currentUser.id);

    this.socketService.emitChatStarted(this.currentUser.id);
    this.socketService.updatedChatList().subscribe(users => {
      this.chattedUsers = users;
    });

    this.socketService.receivePrivateMessages().subscribe(msg => {
      if (msg.sender === this.selectedUser?._id || msg.receiver === this.selectedUser?._id) {
        this.messages.push(msg);
      }
    });
  }

  onSearch() {
    if (!this.search || this.search.trim() === '') {
      this.users = [];
      return;
    }
  
    this.http.get(`http://localhost:5000/api/users/search?username=${this.search}`)
      .subscribe((res: any) => {
        this.users = res;
        this.users = this.users.filter(user => user._id !== this.currentUser.id);
      });
  }
  

  selectUser(user: any) {
    this.selectedUser = user;
    console.log(this.selectedUser._id);
    console.log(this.currentUser.id)
    this.http.get(`http://localhost:5000/api/messages/private?user1=${this.currentUser.id}&user2=${user._id}`)
      .subscribe((res: any) => this.messages = res);
  }

  send() {
    const msg = {  
      sender: this.currentUser.id,
      receiver: this.selectedUser._id,
      text: this.message,
    };
    console.log("message",msg)
    this.socketService.sendPrivateMessage(msg);
    this.messages.push(msg);
    this.message = '';
  }

  
  


}

