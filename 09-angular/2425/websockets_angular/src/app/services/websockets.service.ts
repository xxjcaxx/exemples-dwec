import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$!: WebSocketSubject<any>;

  connect(url: string): Observable<any> {
    this.socket$ = webSocket(url);

 /*   this.socket$.subscribe(
      {
        next: (message) => console.log('Mensaje recibido:', message),
        error: (error) => console.error('Error:', error),
        complete: () => console.log('Conexión cerrada'),
      }
    );*/

    return this.socket$;
  }

  sendMessage(message: any): void {
    if (this.socket$) {
      this.socket$.next(message);
    }
  }

  close(): void {
    if (this.socket$) {
      this.socket$.complete();
    }
  }
}
