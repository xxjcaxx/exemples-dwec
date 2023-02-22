import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    const token = localStorage.getItem('idToken'); // Token de locastorage
    console.log('Interceptor');
    
    if (token) {
    // Clonem la petició i afegiem el sufix
       const authReq = req.clone({url: req.url.concat(`?auth=${token}`)});
    // Enviem la petició en token
    return next.handle(authReq);   }
    return next.handle(req); 
 // Sense tokens enviem la petició original
  }
}
