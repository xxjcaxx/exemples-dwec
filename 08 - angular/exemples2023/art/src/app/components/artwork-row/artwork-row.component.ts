import { Component, Input } from '@angular/core';
import { IArtwork } from '../../interfaces/i-artwork';

@Component({
  selector: '[app-artwork-row]',
  standalone: true,
  imports: [],
  templateUrl: './artwork-row.component.html',
  styleUrl: './artwork-row.component.css'
})
export class ArtworkRowComponent {
  @Input() artwork!: IArtwork;
}
