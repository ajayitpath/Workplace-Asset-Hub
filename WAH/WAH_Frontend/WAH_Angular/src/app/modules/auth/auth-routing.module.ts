import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';



const routes: Routes = [
    {
    path: '',
    redirectTo:'register',
    pathMatch: 'full'
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'emailverify',
    component: EmailVerifyComponent
  },
  {
    path:'forgot-password',
    component: ForgotpasswordComponent,
  },
  {
    path:'reset-password',
    component:ResetpasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
