import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private login: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    const token = this.login.getToken() // Token de locastorage
    if (token) {
    // Clonem la petició i afegiem el sifix
    //const authReq = req.clone({headers: req.headers.set('Authorization', token)});
    const authReq = req.clone({
      url: req.url.concat(req.url.includes('?') ? `&auth=${token}` : `?auth=${token}` )
    });

    // Enviem la petició en token
    return next.handle(authReq);
    }
    return next.handle(req); // Sense tokens enviem la petició original
  }

}
