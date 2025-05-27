import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../service/theme.service';

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
    public themeService: ThemeService
  ){}


  isAuthenticated(): boolean {
    return this.authService.isLoggedIn();
  }


  onLogout(){
    this.authService.logout();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  isDark(): boolean {
    return this.themeService.getTheme() === 'dark';
  }

  


}
