import { Routes } from '@angular/router';
import { userRoutes } from './user/user.routes';
import { promotionsRoutes } from './promotions/promotions.routes';
import { affiliatesRoutes } from './affiliates/affiliates.routes';
import { schedulesRoutes } from './schedules/schedules.routes';
import { sendLogsRoutes } from './send-logs/send-logs.routes';
import { scrapingRoutes } from './scraping/scraping.routes';
import { importRoutes } from './import/import.routes';

export const routes: Routes = [
  { path: 'user', children: userRoutes },
  { path: 'promotions', children: promotionsRoutes },
  { path: 'affiliates', children: affiliatesRoutes },
  { path: 'schedules', children: schedulesRoutes },
  { path: 'send-logs', children: sendLogsRoutes },
  { path: 'scraping', children: scrapingRoutes },
  { path: 'import', children: importRoutes },
];
