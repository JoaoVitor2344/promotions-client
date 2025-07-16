import { Routes } from '@angular/router';
import { AffiliatesListComponent } from './affiliates-list/affiliates-list.component';
import { AffiliatesFormComponent } from './affiliates-form/affiliates-form.component';

export const affiliatesRoutes: Routes = [
  { path: '', component: AffiliatesListComponent },
  { path: 'new', component: AffiliatesFormComponent },
  { path: 'edit/:id', component: AffiliatesFormComponent },
]; 