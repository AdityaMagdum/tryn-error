import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpHeaders, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = {};
    request.headers.keys().forEach(key => {
      headers[key] = request.headers.get(key);
    });
    if (headers['X-Skip']) {
      delete headers['If-Modified-Since'];
      delete headers['Cache-Control'];
      delete headers['Pragma'];
      delete headers['X-Skip'];
      console.log('Request is ' + request.url + ' and deleted headers');
    }

    request = request.clone({
      headers: new HttpHeaders(headers)
    });
    console.log('Request is ' + request.url + ' and headers are ', request.headers);

    return next.handle(request);
  }
}
