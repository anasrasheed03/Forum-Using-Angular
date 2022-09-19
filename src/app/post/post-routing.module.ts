import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post.component';
import { PostProvider } from './post-provider.service';

const routes: Routes = [
  {
    path: ':id',
    component: PostComponent,
    resolve: {
      post: PostProvider
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {}
