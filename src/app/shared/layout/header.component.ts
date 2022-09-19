import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { User, AuthService, AutoFetchService } from '../../core';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnChanges {
  constructor(
    private authService: AuthService,
    private router:Router,
    private autoFetchService:AutoFetchService
  ) {}
  public isAutoFetch:boolean = true;
  public currentUser: User;

  ngOnInit() {
    this.authService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );

  }

  ngOnChanges(): void {
    this.autoFetchService.getFetch().subscribe(res=>{
      this.isAutoFetch = Boolean(res);
    })
  }

  logout() {
    this.authService.removeUserData();
    this.router.navigateByUrl('/');
  }

  onAutoFetchChange(value){
    this.authService.setAutoFetch(value.checked);
    this.autoFetchService.getFetch().subscribe(res=>{
      console.log(res)
      return res;
    })
  }

  
}
