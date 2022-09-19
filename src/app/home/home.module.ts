import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared';
import { HomeRoutingModule } from './home-routing.module';
import { PostListComponent } from './components/post-list/post-list.component';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    PostListComponent
  ],
  providers: [
  ]
})
export class HomeModule {}
