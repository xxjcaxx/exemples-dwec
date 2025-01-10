import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaPokemonsComponent } from './components/lista-pokemons/lista-pokemons.component';
import { FormulariPokemonsComponent } from './components/formulari-pokemons/formulari-pokemons.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FiltrePokemonsPipe } from './filtre-pokemons.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListaPokemonsComponent,
    FormulariPokemonsComponent,
    FiltrePokemonsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
