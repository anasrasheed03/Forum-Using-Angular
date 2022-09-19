import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AuthService, Post, PostService } from '../core';
import io from 'socket.io-client';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {
  private socket = io('http://localhost:8081');
  public post: Post = {} as Post;
  public postForm: FormGroup;
  public errors: Object = {};
  public isSubmitting = false;
  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService:AuthService
  ) {
    this.postForm = this.fb.group({
      title: '',
      body: ''
    });
  }

  ngOnInit() {
    this.route.data.subscribe((data: { post: Post }) => {
      console.log(data)
      if (data.post) {
        this.post = data.post;
        this.postForm.patchValue(data.post);
      }
    });
  }

  public submitForm() {
    this.isSubmitting = true;
    this.updateModel(this.postForm.value);
    let payload = {
      ...this.post,
      createdBy:this.authService.getCurrentUser().username
    }
    //new post case
    if (!this.post.id) {
      this.postService.savePost(payload).subscribe(
        message => {
          this.socket.emit('updatedata', message);
          this.router.navigateByUrl('/')
        },
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
    }
    //update post case
    else {
      let payload = {
        ...this.post,
        createdBy:this.authService.getCurrentUser().username
      }
      this.postService.updatePost(payload).subscribe(
        message => {
          this.socket.emit('updatedata', message);
          this.router.navigateByUrl('/')},
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
    }
  }

  private updateModel(values: Object) {
    Object.assign(this.post, values);
  }
}
