import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import io from 'socket.io-client';
import { AutoFetchService, Post, PostService } from '../../../core';
@Component({
  selector: 'app-post-list',
  styleUrls: ['post-list.component.css'],
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {
  private socket = io('http://localhost:8081');
  public postList: Post[];
  public loading = false;
  public isAutoFetch: boolean = true;
  constructor(
    private postService: PostService,
    private cdr: ChangeDetectorRef,
    private autoFetchService: AutoFetchService
  ) { }

  ngOnInit() {
    this.autoFetchService.getFetch().subscribe(res => {
      this.isAutoFetch = res;
    })

    this.socket.on('update-data', function (data: any) {
      this.loadData();
    }.bind(this));
    this.loadData();
  }


  loadData() {
   if(this.isAutoFetch){
    this.loading = true;
    this.postList = [];
    this.postService.getPostList().subscribe(
      data => {
        this.loading = false;
        this.postList = data.posts;
        this.cdr.detectChanges();
      }
    )
  }
  }

  editBody(body) {
    return body.slice(0, 100)
  }
}
