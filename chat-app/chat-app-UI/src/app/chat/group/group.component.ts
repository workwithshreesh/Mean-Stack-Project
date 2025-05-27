import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SocketService } from '../../service/socket.service';
import { CommonsettingService } from '../../service/commonsetting.service';
import { GroupService } from '../../service/group.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  currentUserId: any;
  adminId!:string;
  newMemberId = '';
  search = '';
  groupModalRef:any;
  users: any[] = [];
  membersToGroup: any[] = [];
  @ViewChild('groupMembers') groupMember!: TemplateRef<any>;



  constructor(
    private groupService: GroupService,
    private commonSetting: CommonsettingService,
    private http: HttpClient,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    const userData = this.commonSetting.getSessionItem('auth');
    if (userData) {
      this.currentUserId = JSON.parse(userData).id;
      console.log(this.currentUserId)
    } else {
      console.error('User is not logged in');
      this.currentUserId = null;
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

  getAllMember(group:any, open:string){
    if(open == 'open'){
      this.openModal();
    }
    // const groupId = group._id;
    this.selectedGroup = group._id;
    console.log(this.selectedGroup)
    this.groupService.getGroupMembers(this.selectedGroup).subscribe({
      next: (res:any) => {
        console.log(res)
        this.membersToGroup = res.members;
        this.adminId = res.admin._id;
      },
      error: (error:any) => {
        console.log(error);
      }
    })
  }


  openModal() {
    this.groupModalRef = this.modalService.open(this.groupMember, {
      centered: true,
      scrollable: true,
      size: 'lg'
    });
  }
  
  
  closeModal() {
    if (this.groupModalRef) {
      this.groupModalRef.close();
    }
  }
    

  removeMember(member: any) {
    const memberId = member._id;
    console.log(this.selectedGroup, memberId)
    if (!this.selectedGroup || !memberId) return;
    this.groupService.removeMember(this.selectedGroup, memberId).subscribe((res) => {
      console.log(res)
      this.loadGroups();
      this.getAllMember(this.selectedGroup,'close');
    },
    (error:any) => {
      console.log(error);
    }
  );
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
