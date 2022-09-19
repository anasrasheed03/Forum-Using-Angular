import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LikesService, Post, User, AuthService } from '../../../core';
import { of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html'
})
export class LikeButtonComponent implements OnInit {
  constructor(
    private likeService: LikesService,
    private router: Router,
    private authService: AuthService
  ) { }
  private currentUser: User;
  @Input() post: Post;
  @Output() toggle = new EventEmitter<boolean>();
  public isSubmitting = false;
  private socket = io('http://localhost:8081');

  ngOnInit() {
    // Load the current user's data
    this.authService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
      }
    );
  }

  likeAction() {
    this.isSubmitting = true;
    this.authService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return of(null);
        }
        // like the post if it isn't liked yet
        if (!this.post.liked) {
          let payload = {
            postId: this.post.id,
            createdBy: this.currentUser.username
          }
          return this.likeService.likePost(payload)
            .pipe(tap(
              data => {
                this.socket.emit('updatedata', data);
                this.isSubmitting = false;
                this.toggle.emit(true);
              },
              err => this.isSubmitting = false
            ));

          // unlike handler
        } else {
          return this.likeService.unlikePost(this.post.likeId)
            .pipe(tap(
              data => {
                this.socket.emit('updatedata', data);
                this.isSubmitting = false;
                this.toggle.emit(false);
              },
              err => this.isSubmitting = false
            ));
        }

      }
    )).subscribe();
  }
}
