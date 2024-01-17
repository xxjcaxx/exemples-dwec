import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IArtwork } from '../../interfaces/i-artwork';

@Component({
  selector: 'app-artwork',
  standalone: true,
  imports: [],
  templateUrl: './artwork.component.html',
  styleUrl: './artwork.component.css'
})
export class ArtworkComponent {
@Input() artwork!: IArtwork;

@Output() likeChanged = new EventEmitter<boolean>();

toggleLike(){
  //this.artwork.like = !this.artwork.like;
  this.likeChanged.emit(this.artwork.like)
}

mouseover: boolean = false
}
