import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,    
    ReactiveFormsModule
  ],
  providers: [  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
