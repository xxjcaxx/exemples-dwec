import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AnimesService } from './services/animes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'animes';

  searchForm: FormGroup;

  constructor(private animesService: AnimesService, private fb: FormBuilder){
    this.searchForm = this.fb.group({
      search: [''],
    })
  }

  ngOnInit(): void {
  }

  search(){

  }


}
