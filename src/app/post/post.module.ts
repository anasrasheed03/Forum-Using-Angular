import { NgModule } from '@angular/core';
import { PostComponent } from './post.component';
import { PostProvider } from './post-provider.service';
import { SharedModule } from '../shared';
import { PostRoutingModule } from './post-routing.module';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostCommentComponent } from './components/post-comments/post-comment.component';
import { LikeButtonComponent } from './components/like-button/like-button.component';

@NgModule({
  imports: [
    SharedModule,
    PostRoutingModule
  ],
  declarations: [
    PostComponent,
    PostCommentComponent,
    PostDetailsComponent,
    LikeButtonComponent
  ],

  providers: [
    PostProvider
  ]
})
export class PostModule {}
