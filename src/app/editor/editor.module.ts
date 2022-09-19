import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EditorComponent } from './editor.component';
import { EditableProvider } from './editable-provider.service';
import { AuthGuard } from '../core';
import { SharedModule } from '../shared';
import { EditorRoutingModule } from './editor-routing.module';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  imports: [SharedModule, EditorRoutingModule,AngularEditorModule ],
  declarations: [EditorComponent],
  providers: [EditableProvider]
})
export class EditorModule {}
