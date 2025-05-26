import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-search',
  imports: [],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.css'
})
export class UserSearchComponent {

  username = '';
  searchResults: any[] = [];

  @Output() userSelected = new EventEmitter<any>();

  constructor(private userService: UserService) {}

  onSearch() {
    if (!this.username.trim()) return;

    this.userService.searchUser(this.username).subscribe(
      (res: any) => {
        this.searchResults = res.users || [];
      },
      err => {
        console.error(err);
        this.searchResults = [];
      }
    );
  }

  selectUser(user: any) {
    this.userSelected.emit(user);
    this.username = '';
    this.searchResults = [];
  }


}
