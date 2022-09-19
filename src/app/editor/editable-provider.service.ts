import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Post, PostService, AuthService } from '../core';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class EditableProvider implements Resolve<Post> {
  constructor(
    private postService: PostService,
    private router: Router,
    private authService: AuthService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    console.log(route.params)
    return this.postService.getPostById(route.params['id'])
      .pipe(
        map(
          post => {
            if (this.authService.getCurrentUser().username === post.createdBy) {
              return post;
            } else {
              this.router.navigateByUrl('/');
            }
          }
        ),
        catchError((err) => this.router.navigateByUrl('/'))
      );
  }
}
