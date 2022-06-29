import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimeListComponent } from './components/anime-list/anime-list.component';
import { AnimeDetailComponent } from './components/anime-detail/anime-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { HashtagPipe } from './pipes/hashtag.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AnimeListComponent,
    AnimeDetailComponent,
    HashtagPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
