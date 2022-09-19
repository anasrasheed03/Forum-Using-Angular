import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Post } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class PostService {
  constructor(
    private apiService: ApiService
  ) { }

  getPostList() {
    return this.apiService
      .get(
        '/post');
  }

  getPostById(id): Observable<Post> {
    return this.apiService.get('/post/' + id)
      .pipe(map(data => data.post));
  }

  deletePost(id) {
    return this.apiService.get('/deletePost/' + id);
  }

  savePost(body): Observable<Post> {
    return this.apiService.post('/post/', body)
      .pipe(map(data => data.post));

  }

  updatePost(body): Observable<Post> {
    return this.apiService.post('/updatePost/', body)
      .pipe(map(data => data.message));

  }

}
