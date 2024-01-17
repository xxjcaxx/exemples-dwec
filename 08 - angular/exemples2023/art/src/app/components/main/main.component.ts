import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IArtwork } from '../../interfaces/i-artwork';
import { ArtworkListComponent } from '../artwork-list/artwork-list.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ArtworkListComponent, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
