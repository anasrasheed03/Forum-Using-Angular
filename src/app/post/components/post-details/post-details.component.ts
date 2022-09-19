import { Component, Input } from '@angular/core';

import { Post } from '../../../core';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html'
})
export class PostDetailsComponent {
  @Input() post: Post;
}
