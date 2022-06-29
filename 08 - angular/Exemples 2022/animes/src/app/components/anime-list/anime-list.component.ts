import { Component, OnInit } from '@angular/core';
import { Anime } from 'src/app/interfaces/anime';
import { AnimesService } from '../../services/animes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css']
})
export class AnimeListComponent implements OnInit {

  constructor(private animesService: AnimesService, private r: Router, private route: ActivatedRoute) { }

  public animes: Anime[] = [];
  public start = 0;

  ngOnInit(): void {
    this.route.params.subscribe(p=>{
      p['page'] ? this.start = parseInt(p['page']) : this.start = 0;
      this.getAnimes();
    });

  }

  getAnimes(): void{
    this.animesService.getAnimes(this.start).subscribe(a => this.animes = a)
  }

  anterior(){
    this.start <= 0 ? this.start = 0 : this.start -= 20;
  this.r.navigate(['/list',this.start]);

  }
  seguent(){
    this.start += 20;
    this.r.navigate(['/list',this.start]);
  }

}
