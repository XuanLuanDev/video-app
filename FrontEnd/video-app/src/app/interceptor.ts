import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Endpoints } from './endpoints';

@Injectable()
export class Interceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const baseUrl = environment.apiUrl;
        if (req.url == Endpoints.upload){
            const apiReq = req.clone( { url: `${baseUrl}${req.url}` });
        return next.handle(apiReq);
        }
        const apiReq = req.clone({setHeaders: {'Content-Type': "application/json"}, url: `${baseUrl}${req.url}` });
        return next.handle(apiReq);
    }
}