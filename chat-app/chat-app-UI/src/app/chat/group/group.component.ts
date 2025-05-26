import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../service/socket.service';
import { CommonsettingService } from '../../service/commonsetting.service';
import { GroupService } from '../../service/group.service';
import { HttpClient } from '@angular/common/http';

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
  currentUserId: any; // TODO: replace with actual logged in user id
  newMemberId = '';
  search = '';
  users: any[] = [];
  membersToRemove: string[] = [];



  constructor(
    private groupService: GroupService,
    private commonSetting: CommonsettingService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const userData = this.commonSetting.getSessionItem('auth');
    if (userData) {
      this.currentUserId = JSON.parse(userData).id;
      console.log(this.currentUserId)
    } else {
      console.error('User is not logged in');
      this.currentUserId = null; // or redirect to login or show a message
    }

    this.loadGroups();
  }

  loadGroups() {
    this.groupService.getUserGroups().subscribe(groups => {
      this.groups = groups;
    });
  }

  createGroup() {
    if (!this.newGroupName) return alert('Group name is required');
    if (this.newGroupMembers.length === 0) return alert('Add at least one member');
    console.log(this.currentUserId)
    this.groupService.createGroup(this.newGroupName, this.newGroupMembers, this.currentUserId).subscribe(() => {
      this.newGroupName = '';
      this.newGroupMembers = [];
      this.search = '';
      this.users = [];
      this.loadGroups();
    });
  }
  

  onSearch() {
    if (!this.search) return;
    this.http.get(`http://localhost:5000/api/users/search?username=${this.search}`)
      .subscribe((res: any) => this.users = res);
  }
  
  addUserToNewGroup(user: any) {
    if (!this.newGroupMembers.includes(user._id)) {
      this.newGroupMembers.push(user._id);
    }
  }
  
  selectGroup(group: any) {
    this.selectedGroup = group;
    this.loadMessages(group._id);
  }

  loadMessages(groupId: string) {
    this.groupService.getGroupMessages(groupId).subscribe(messages => {
      this.messages = messages;
    });
  }

  sendMessage() {
    if (!this.newMessageText || !this.selectedGroup) return;
    this.groupService.sendGroupMessage(this.selectedGroup._id, this.currentUserId, this.newMessageText)
      .subscribe(() => {
        this.newMessageText = '';
        this.loadMessages(this.selectedGroup._id);
      });
  }

  addMember() {
    if (!this.newMemberId || !this.selectedGroup) return;
    this.groupService.addMember(this.selectedGroup._id, this.newMemberId).subscribe(() => {
      this.newMemberId = '';
      this.loadGroups();
    });
  }

  toggleRemoveMember(memberId: string) {
    const index = this.membersToRemove.indexOf(memberId);
    if (index === -1) {
      this.membersToRemove.push(memberId);
    } else {
      this.membersToRemove.splice(index, 1);
    }
  }
  
  isSelectedForRemoval(memberId: string): boolean {
    return this.membersToRemove.includes(memberId);
  }
  

  removeMember(memberId: string) {
    if (!this.selectedGroup) return;
    this.groupService.removeMember(this.selectedGroup._id, memberId).subscribe(() => {
      this.loadGroups();
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
