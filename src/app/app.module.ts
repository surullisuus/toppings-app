import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { VentasComponent } from './ventas/ventas.component';
import { ControladorEncendidoComponent } from './controlador-encendido/controlador-encendido.component';
import { TemperaturaComponent } from './temperatura/temperatura.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    SidebarComponent,
    VentasComponent,
    ControladorEncendidoComponent,
    TemperaturaComponent
      ],
  imports: [

    BrowserModule,
    CommonModule,
    FormsModule,

    HttpClientModule,
           RouterModule.forRoot(routes),

],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
