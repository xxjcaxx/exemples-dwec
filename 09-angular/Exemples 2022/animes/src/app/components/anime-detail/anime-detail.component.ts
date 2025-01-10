import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Anime } from 'src/app/interfaces/anime';
import { AnimesService } from '../../services/animes.service';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.css']
})
export class AnimeDetailComponent implements OnInit {

  public anime?: Anime;
  formulariAnime: FormGroup;

  constructor(private route: ActivatedRoute, private animesService:AnimesService, private fb: FormBuilder) {

    this.formulariAnime = this.fb.group({
      title: ['',[Validators.required]],
      picture: ['',[Validators.pattern("http.*\.jpg")]],
      thumbnail: ['',[Validators.pattern("http.*\.jpg")]]
    })
  }




  ngOnInit(): void {
    this.route.params.subscribe(p => {
      let id = p['id'];
      this.animesService.getAnime(id).subscribe(a=> {this.anime = a; this.formulariAnime.patchValue(a)})
    });
  }

}
