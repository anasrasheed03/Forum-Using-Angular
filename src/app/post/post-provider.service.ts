import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Post, PostService, AuthService } from '../core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PostProvider implements Resolve<Post> {
  constructor(
    private postService: PostService,
    private router: Router,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.postService.getPostById(route.params['id'])
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}
