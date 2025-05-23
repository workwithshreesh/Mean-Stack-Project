import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { CommonsettingService } from '../../service/commonsetting.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  isAuthenticate:any;

  constructor(
    private authService: AuthService,
    private commonSetting: CommonsettingService
  ){}


  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }


  onLogout(){
    this.authService.logout();
    this.commonSetting.sweetInfo('User is logout')
  }

}
