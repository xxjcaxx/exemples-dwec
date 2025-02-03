import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  private eventSource: EventSource | null = null;
  private messagesSubject = new Subject<string>();

  // Observador para los mensajes SSE
  messages$ = this.messagesSubject.asObservable();

  constructor() {}

  // Método para conectar al servidor SSE
  connectToSse(): void {
    if (this.eventSource) {
      this.eventSource.close();  // Cerrar conexión previa si existe
    }

    // Crear una nueva conexión SSE
    this.eventSource = new EventSource('http://localhost:8081/events');

    // Manejar los mensajes recibidos
    this.eventSource.onmessage = (event) => {
      //console.log(event);
      this.messagesSubject.next(event.data); // Emitir el mensaje recibido
    };

    // Manejo de errores
    this.eventSource.onerror = (error) => {
      console.error('Error SSE:', error);
      this.eventSource?.close();
    };
  }

  // Método para cerrar la conexión SSE
  disconnectFromSse(): void {
    if (this.eventSource) {
      this.eventSource.close();
      console.log('Conexión SSE cerrada');
    }
  }
}
