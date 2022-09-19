import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Comment, User, AuthService } from '../../../core';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html'
})
export class PostCommentComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) {}

  @Input() comment: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();
  @Output() updateCommentValue = new EventEmitter<Object>();
  public isEdit:boolean;
  public canModify: boolean;
  public commentControl = new FormControl();

  ngOnInit() {
    // Load the current user's data
    this.authService.currentUser.subscribe(
      (userData: User) => {
        this.canModify = (userData.username === this.comment.createdBy);
      }
    );
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }

  editComment(){
    this.isEdit = !this.isEdit;
    this.commentControl.setValue(this.comment.comment)
  }

  updateComment(){
    console.log({value:this.commentControl.value, id:this.comment.id})
    this.updateCommentValue.emit({value:this.commentControl.value, id:this.comment.id})
    this.editComment();
  }


}
