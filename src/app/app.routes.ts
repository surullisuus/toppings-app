import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { VentasComponent } from './ventas/ventas.component';
import { ControladorEncendidoComponent } from './controlador-encendido/controlador-encendido.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'sidebar', component: SidebarComponent },
    { path: 'ventas', component: VentasComponent },
    { path: 'ControlEncendido', component: ControladorEncendidoComponent },
    
];
