import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiBaseUrlInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = 'https://www.quandl.com/api/v3/datasets/WIKI/';
        req = req.clone({
          url: url + req.url
        });
        return next.handle(req);
      }
}
