import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { io } from 'socket.io-client';

import {
  Post,
  PostService,
  Comment,
  CommentsService,
  User,
  AuthService,
  LikesService,
  AutoFetchService
} from '../core';
import { Like } from '../core/models/like.model';

@Component({
  selector: 'app-post-page',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {
  public post: Post;
  private currentUser: User;
  public canModify: boolean;
  public comments: Comment[];
  public commentControl = new FormControl();
  public commentFormErrors = {};
  public isSubmitting = false;
  public isDeleting = false;
  public likes: Like[] = [];
  private socket = io('http://localhost:8081');
  public isAutoFetch: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentsService: CommentsService,
    private router: Router,
    private authService: AuthService,
    private likesService: LikesService,
    private autoFetchService: AutoFetchService
  ) { }

  ngOnInit() {
    this.autoFetchService.getFetch().subscribe(res => {
      this.isAutoFetch = res;
    })
    this.socket.on('update-data', function (data: any) {
      this.populateComments();
      this.populateLikes();
    }.bind(this));
    // Retreive the prefetched post
    this.route.data.subscribe(
      (data: { post: Post }) => {
        this.post = data.post;
        this.populateComments();
        this.populateLikes();
      }
    );

    this.authService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        this.canModify = (this.currentUser.username === this.post.createdBy);
      }
    );
  }

  onLikeToggle(like: boolean) {
    if (like)
      this.populateLikes();
  }

  deletePost() {
    this.isDeleting = true;

    this.postService.deletePost(this.post.id)
      .subscribe(
        success => {
          this.socket.emit('updatedata', success);
          this.router.navigateByUrl('/');
        }
      );
  }

  populateComments() {
    if (this.isAutoFetch) {
      this.commentsService.getAllComments(this.post.id)
        .subscribe(comments => this.comments = comments);
    }
  }

  populateLikes() {
    if (this.isAutoFetch) {
      this.likesService.getAllLikes(this.post.id)
        .subscribe(likes => {
          this.post.totalLike = likes.length
          this.post.liked = likes.filter(like => like.createdBy == this.currentUser.username).length > 0 ? true : false;
          this.post.likeId = likes.filter(like => like.createdBy == this.currentUser.username).length > 0 ? likes.find(like => like.createdBy == this.currentUser.username).id : undefined;
          this.likes = likes;
        });
    }
  }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};

    let payload = {
      comment: this.commentControl.value,
      postId: this.post.id,
      createdBy: this.currentUser.username
    }
    this.commentsService
      .addComment(payload)
      .subscribe(
        comment => {
          this.socket.emit('updatedata', comment);
          this.populateComments();
          this.commentControl.reset('');
          this.isSubmitting = false;
        },
        errors => {
          this.isSubmitting = false;
          this.commentFormErrors = errors;
        }
      );
  }

  onDeleteComment(comment) {
    this.commentsService.deleteComment(comment.id)
      .subscribe(
        success => {
          this.socket.emit('updatedata', success);
          this.comments = this.comments.filter((item) => item !== comment);
        }
      );
  }

  onEditComment(comment) {
    this.isSubmitting = true;
    this.commentFormErrors = {};

    let payload = {
      comment: comment.value,
      postId: this.post.id,
      id: comment.id
    }
    this.commentsService
      .updateComment(payload)
      .subscribe(
        comment => {
          this.socket.emit('updatedata', comment);
          this.populateComments();
          this.isSubmitting = false;
        },
        errors => {
          this.isSubmitting = false;
          this.commentFormErrors = errors;
        }
      );
  }

}
