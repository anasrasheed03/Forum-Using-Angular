import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Comment } from '../models';
import { map } from 'rxjs/operators';


@Injectable()
export class CommentsService {
  constructor (
    private apiService: ApiService
  ) {}

  addComment(payload): Observable<Comment> {
    return this.apiService
    .post(
      `/comment/`,payload
    ).pipe(map(data => data.message));
  }

  getAllComments(id): Observable<Comment[]> {
    return this.apiService.get(`/comments/${id}`)
      .pipe(map(data => data.comments));
  }

  deleteComment(commentId) {
    return this.apiService
           .get(`/deleteComment/${commentId}`);
  }

  updateComment(payload):Observable<Comment>{
    return this.apiService.post
    (`/updateComment/`,payload).pipe(map(data=>data.message));
  }

}
