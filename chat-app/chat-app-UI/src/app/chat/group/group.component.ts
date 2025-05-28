import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SocketService } from '../../service/socket.service';
import { CommonsettingService } from '../../service/commonsetting.service';
import { GroupService } from '../../service/group.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-group',
  standalone: false,
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent implements OnInit {

  groups: any[] = [];
  selectedGroup: any = null;
  messages: any[] = [];

  newGroupName = '';
  newGroupMembers: string[] = [];
  newMessageText = '';
  newMemberId = '';
  search = '';
  users: any[] = [];
  membersToGroup: any[] = [];

  currentUserId: any;
  userData:any;
  adminId!: string;
  messageSub!: Subscription;
  groupModalRef: any;

  @ViewChild('groupMembers') groupMember!: TemplateRef<any>;

  constructor(
    private http: HttpClient,
    private groupService: GroupService,
    private commonSetting: CommonsettingService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    const userData = this.commonSetting.getSessionItem('auth');
    if (userData) {
      this.userData = userData;
      console.log("chr",JSON.parse(this.userData).username)
      this.currentUserId = JSON.parse(userData).id;
    } else {
      console.error('User not logged in');
      return;
    }
    this.groupService.onAny((event, ...args) => {
    });
    
    console.log('this.currentUserId',this.currentUserId)
    this.groupService.register(this.currentUserId);
    this.loadGroups();
  }

  ngOnDestroy(): void {
    if (this.messageSub) {
      this.messageSub.unsubscribe();
    }
  }

  onSearch(): void {
    if (!this.search.trim()) return;
    this.http.get(`http://localhost:5000/api/users/search?username=${this.search}`)
      .subscribe((res: any) => this.users = res);
  }


  addUserToNewGroup(user: any): void {
    if (!this.newGroupMembers.includes(user._id)) {
      this.newGroupMembers.push(user._id);
    }
  }

  createGroup(): void {
    this.groupService.createGroup(this.newGroupName, this.newGroupMembers, this.currentUserId);
    this.groupService.createdGroupDetail().subscribe((res: any) => {
      this.groups.push(res.group);
      this.newGroupName = '';
      this.newGroupMembers = [];
    });
  }

  loadGroups(): void {
    this.groupService.getUserGroups().subscribe((groups) => {
      this.groups = groups;
    });
  }

  selectGroup(group: any): void {
    if (this.messageSub) this.messageSub.unsubscribe();  // 🧹 Cleanup
  
    this.selectedGroup = group;
    this.messages = [];
  
    this.groupService.getGroupMessage(group._id);  // Emit to server to get history
  
    this.groupService.getGroupMessageRecived(group._id).subscribe(res => {
      this.messages = res;
    });
  
    // Listen to new incoming messages via socket stream
    this.messageSub = this.groupService.receiveGroupMessages(group._id).subscribe((msg:any) => {
      this.messages.push(msg);
    });
  }
  

  sendMessage(): void {
    if (!this.newMessageText.trim() || !this.selectedGroup) return;
  
    const text = this.newMessageText.trim();
    const groupId = this.selectedGroup._id;
    const senderId = this.currentUserId;
  
    // Push message to local UI immediately
    this.messages.push({
      sender: { _id: senderId, username: JSON.parse(this.userData).username },  // Optional: adjust as per real data
      text: text
    });
  
    // Emit to socket
    this.groupService.sendGroupMessages(groupId, senderId, text);
  
    this.newMessageText = '';
  }
  


  addMember(): void {
    if (!this.newMemberId || !this.selectedGroup) return;
    
    this.groupService.addMember(this.selectedGroup._id, this.newMemberId).subscribe(() => {
      this.newMemberId = '';
      this.loadGroups();
    });
  }

  getAllMember(group: any, open: string): void {
    if (open === 'open') this.openModal();
    this.selectedGroup = group._id;

    this.groupService.getGroupMembers(this.selectedGroup).subscribe({
      next: (res: any) => {
        this.membersToGroup = res.members;
        this.adminId = res.admin._id;
      },
      error: (error: any) => console.error(error)
    });
  }

  openModal(): void {
    this.groupModalRef = this.modalService.open(this.groupMember, {
      centered: true,
      scrollable: true,
      size: 'lg'
    });
  }

  closeModal(): void {
    if (this.groupModalRef) this.groupModalRef.close();
  }

  removeMember(member: any): void {
    const memberId = member._id;
    if (!this.selectedGroup || !memberId) return;

    this.groupService.removeMember(this.selectedGroup, memberId).subscribe({
      next: () => {
        this.loadGroups();
        this.getAllMember({ _id: this.selectedGroup }, 'close');
      },
      error: (error: any) => console.error(error)
    });
  }


//   removeSelectedMembers() {
//   if (!this.selectedGroup || this.membersToRemove.length === 0) return;

//   // Call API to remove multiple members (adjust your backend API accordingly)
//   this.groupService.removeMember(this.selectedGroup._id, this.membersToRemove).subscribe(() => {
//     // After success, refresh group and clear selection
//     this.membersToRemove = [];
//     this.loadGroups();

//     // Also update selectedGroup's members locally if available
//     if (this.selectedGroup.members) {
//       this.selectedGroup.members = this.selectedGroup.members.filter(
//         (m: any) => !this.membersToRemove.includes(m._id || m)
//       );
//     }
//   });
// }


}
