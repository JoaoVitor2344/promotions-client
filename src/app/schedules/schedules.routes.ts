import { Routes } from '@angular/router';
import { SchedulesListComponent } from './schedules-list/schedules-list.component';
import { SchedulesFormComponent } from './schedules-form/schedules-form.component';

export const schedulesRoutes: Routes = [
  { path: '', component: SchedulesListComponent },
  { path: 'new', component: SchedulesFormComponent },
  { path: 'edit/:id', component: SchedulesFormComponent },
]; 