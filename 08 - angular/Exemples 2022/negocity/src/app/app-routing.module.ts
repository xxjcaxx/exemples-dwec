import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalComponent } from './components/global/global.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrerComponent } from './components/registrer/registrer.component';
import { HomeComponent } from './components/home/home.component';
import { LoggedGuard } from './guards/logged.guard';
import { PointsComponent } from './components/points/points.component';

const routes: Routes = [
  { path: 'global', canActivate: [LoggedGuard], component: GlobalComponent },

  { path: 'home', component: HomeComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrerComponent },
  { path: 'points', component: PointsComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
