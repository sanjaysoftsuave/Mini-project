import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './guards/auth.guard';
import { auth2Guard } from './guard2/auth2.guard';

const routes: Routes = [
  {path:'', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent , canActivate: [auth2Guard]},
  {path: 'home', component: HomeComponent, canActivate: [authGuard]},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: LoginComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
