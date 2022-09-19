import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'newpost',
    loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then(m => m.PostModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
