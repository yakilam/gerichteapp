import { Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { GerichtComponent } from './gericht/gericht.component';
import { loginGuard } from './guards/login.guard';
import { ProfilComponent } from './profil/profil.component';

export const routes: Routes = [
    {path: 'nav', component: NavComponent, canActivate: [loginGuard]},
    {path: 'gericht', component: GerichtComponent, canActivate: [loginGuard]},
    {path: 'profil', component: ProfilComponent, canActivate: [loginGuard]},
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: '/login', pathMatch: "full"},
    { path: '**', redirectTo: 'login'}
];
