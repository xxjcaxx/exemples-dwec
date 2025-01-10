import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  nombre = 'Jose';
  apellido = 'Castillo';
  showSurname = false;
  toggleSurname = ()=>{ this.showSurname = !this.showSurname};

  people = [
    {name: 'pepe', surname: 'López', age:25 },
    {name: 'Ana', surname: 'López', age:10 },
    {name: 'Julia', surname: 'López', age:45 },
    {name: 'Antonio', surname: 'Alcantara', age:70 },
  ];
}
