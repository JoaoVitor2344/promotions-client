import { Routes } from '@angular/router';
import { PromotionsListComponent } from './promotions-list/promotions-list.component';
import { PromotionsFormComponent } from './promotions-form/promotions-form.component';
import { PromotionsPendingComponent } from './promotions-pending/promotions-pending.component';

export const promotionsRoutes: Routes = [
  { path: '', component: PromotionsListComponent },
  { path: 'new', component: PromotionsFormComponent },
  { path: 'edit/:id', component: PromotionsFormComponent },
  { path: 'pending', component: PromotionsPendingComponent },
]; 