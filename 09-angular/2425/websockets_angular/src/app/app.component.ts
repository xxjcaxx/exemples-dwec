import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebSocketService } from './services/websockets.service';
import { CommonModule } from '@angular/common';
import { skip } from 'rxjs';
import { SseService } from './services/sse.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'websockets_angular';

  messages: string[] = [];

 constructor(private webSocketService:WebSocketService,
  private sseService: SseService
 ){}

  emoji_list: string[] = [];

  ngOnInit(){
    this.webSocketService.connect('ws://localhost:8080').pipe(
      skip(1)
    ).subscribe(
      {
        next: (message) => {
          console.log('Mensaje recibido:', message);
          this.emoji_list.push(message.message);
          if(this.emoji_list.at(-1)===this.emoji_list.at(-2)){
            this.emoji_list.pop();
            this.emoji_list.pop();
          }
        },
        error: (error) => console.error('Error:', error),
        complete: () => console.log('Conexión cerrada'),
      }
    );

    this.sseService.connectToSse();

    // Suscribirse a los mensajes SSE
    this.sseService.messages$.subscribe((message) => {
   
      this.messages.push(message); // Añadir mensaje a la lista
    });
  }

  sendEmoji(emoji: string){
    this.webSocketService.sendMessage({message: emoji});
  }


}
