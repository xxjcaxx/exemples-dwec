import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EdificiDetailComponent } from './components/edifici-detail/edifici-detail.component';
import { EdificiFormComponent } from './components/edifici-form/edifici-form.component';
import { EdificiListComponent } from './components/edifici-list/edifici-list.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'edificis', component: EdificiListComponent},
  {path: 'edificis/:criteri', component: EdificiListComponent},
  {path: 'edifici/:id', component: EdificiDetailComponent},
  {path: 'create', component: EdificiFormComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
