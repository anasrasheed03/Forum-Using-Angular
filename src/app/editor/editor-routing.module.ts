import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor.component';
import { EditableProvider } from './editable-provider.service';
import { AuthGuard } from '../core';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: EditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      post: EditableProvider
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule {}
