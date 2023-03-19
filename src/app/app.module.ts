import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { SpinnerComponent } from './pages/components/spinner/spinner.component';
import { ProfileComponent } from './pages/shared/profile/profile.component';
import { NavbarComponent } from './pages/shared/navbar/navbar.component';
import { DashboardComponent } from './pages/components/dashboard/dashboard.component';
import { AddProductComponent } from './pages/products/add-product/add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    SpinnerComponent,
    ProfileComponent,
    NavbarComponent,
    DashboardComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
