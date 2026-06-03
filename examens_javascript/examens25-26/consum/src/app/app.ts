import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Carret } from "./components/carret/carret";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Carret],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('consum');
}
