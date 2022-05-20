import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { TokenInterceptor } from './token.interceptor';

//gestirà auth-module login e signup

const routes: Routes = [
{
  path: "login",
  component: LoginComponent
},
{
  path: "signup",
  component: SignupComponent
}
];

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  // inserire interceptor
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
