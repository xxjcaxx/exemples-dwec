import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { FormulariComponent } from './formulari/formulari.component';

const routes: Routes = [
  {path: 'home', component: ListaComponent},
  {path: 'formulari', component: FormulariComponent},

  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
