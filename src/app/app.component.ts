import { Component, OnInit } from '@angular/core';

import { AuthService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor (
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.setUserData();
    // this.authService.connectSocket();
  }

  ngOnDestroy() {
    // this.authService.disconnectSocket();
  }
}
