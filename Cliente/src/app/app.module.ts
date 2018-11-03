import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import 'rxjs';

//Rutas
import { APP_ROUTES } from './app.routes';
import { RegisterComponent } from './login/register.component';

//Modulos
import { PagesModule } from './pages/pages.module';
import { ServiceModule } from './services/service.module';


//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
    
    ],
  imports: [
  BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule
  ],
  providers: [ServiceModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
