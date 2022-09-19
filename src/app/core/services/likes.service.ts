import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Like } from '../models/like.model';


@Injectable()
export class LikesService {
  constructor(
    private apiService: ApiService
  ) { }

  likePost(payload): Observable<Like> {
    return this.apiService
      .post(
        `/like`, payload
      ).pipe(map(data => data.message));
  }

  getAllLikes(id): Observable<Like[]> {
    return this.apiService.get(`/likes/${id}`)
      .pipe(map(data => data.likes));
  }

  unlikePost(like) {
    return this.apiService
      .get(`/removeLike/${like}`);
  }

}
