import { Component, OnInit } from '@angular/core';
import { IArtwork } from '../../interfaces/i-artwork';
import { ArtworkComponent } from '../artwork/artwork.component';
import { ArtworkRowComponent } from '../artwork-row/artwork-row.component';
import { ApiServiceService } from '../../services/api-service.service';
import { ArtworkFilterPipe } from '../../pipes/artwork-filter.pipe';

@Component({
  selector: 'app-artwork-list',
  standalone: true,
  imports: [ArtworkComponent, ArtworkRowComponent, ArtworkFilterPipe],
  templateUrl: './artwork-list.component.html',
  styleUrl: './artwork-list.component.css'
})
export class ArtworkListComponent implements OnInit  {

  constructor(private artService: ApiServiceService){
  }

  ngOnInit(): void {
    this.artService.getArtWorks()
    .subscribe((artworkList: IArtwork[]) => this.quadres = artworkList);
  }

  toggleLike($event: boolean, artwork: IArtwork){
    console.log($event,artwork);
    artwork.like = !artwork.like;
  }

  quadres: IArtwork[] = [];
  filter: string = 'woman';
 
}
