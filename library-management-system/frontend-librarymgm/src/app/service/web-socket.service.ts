import { forwardRef, Inject, Injectable, Injector } from '@angular/core';
import { CommonsettingService } from './commonsetting.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private authService!: AuthService;


  private socket!: WebSocket;

  constructor(
    private commonSetting: CommonsettingService,
    private router: Router,
    private injector: Injector
  ) { }


  private getAuthService(): AuthService {
    if (!this.authService) {
      this.authService = this.injector.get(AuthService)
    }
    return this.authService
  }



  connect(token: string) {
    console.log('Connecting with token:', token);

    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      const wsUrl = `ws://localhost:8000?token=${token}`;
      console.log(`Connecting to: ${wsUrl}`);

      this.socket = new WebSocket(wsUrl);

      this.socket.onopen = () => {
        console.log('WebSocket connection established');
      };

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Message received:', data);

        if (data.type === 'SSO_Alert') {
          this.commonSetting.questionOk('Click on Ok Button!', data.message).
            then((result:any) => {
              if (result.isConfirmed) {
                this.commonSetting.sweetSuccsess('You chose to continue');
                this.getAuthService().logout();
                this.router.navigate(['/login']);
              } 
            });
        }
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.socket.onclose = () => {
        console.warn('WebSocket connection closed');
      };
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
