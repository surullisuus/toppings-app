import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent,
    LoginComponent
      ],
  imports: [BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
           RouterModule.forRoot(routes),
           
],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
