import { Routes } from '@angular/router';
import { DocumentFormComponent } from './components/document-form/document-form.component';
import { DocumentListComponent } from './components/document-list/document-list.component';

export const routes: Routes = [
    { path: '', component: DocumentListComponent },
    { path: 'document', component: DocumentFormComponent },
    { path: '**', redirectTo: '' }
  ];