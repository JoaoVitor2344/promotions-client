import { inject } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';

export function loaderInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const loaderService = inject(LoaderService);
  loaderService.show();
  return next(req).pipe(
    finalize(() => loaderService.hide())
  );
} 