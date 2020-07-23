import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Components for Routes:
import { HomeComponent } from './home/home.component';
import { ChartsComponent } from './charts/charts.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// Import Auth Guard to prevent unauthenicated users from accessing home
import { AuthGuard } from './_guards';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'charts', component: ChartsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
