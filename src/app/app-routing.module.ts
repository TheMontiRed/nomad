import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddProductComponent } from './pages/products/add-product/add-product.component';
import { AuthGuard } from './services/guard/guard.guard';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard]  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
