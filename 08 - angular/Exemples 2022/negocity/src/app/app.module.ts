import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { GlobalComponent } from './components/global/global.component';
import { LoginComponent } from './components/login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SurvivorListComponent } from './components/survivors/survivor-list/survivor-list.component';
import { SurvivorItemComponent } from './components/survivors/survivor-item/survivor-item.component';
import { CitiesListComponent } from './components/cities/cities-list/cities-list.component';
import { CitiesItemComponent } from './components/cities/cities-item/cities-item.component';
import { RegistrerComponent } from './components/registrer/registrer.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { HomeComponent } from './components/home/home.component';
import { SurvivorFormComponent } from './components/survivors/survivor-form/survivor-form.component';
import { CorreuDirective } from './directives/validators/correu.directive';
import { PasswordDirective } from './directives/validators/password.directive';
import { PointsComponent } from './components/points/points.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GlobalComponent,
    LoginComponent,
    SurvivorListComponent,
    SurvivorItemComponent,
    CitiesListComponent,
    CitiesItemComponent,
    RegistrerComponent,
    HomeComponent,
    SurvivorFormComponent,
    CorreuDirective,
    PasswordDirective,
    PointsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxChartsModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
