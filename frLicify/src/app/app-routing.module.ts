import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Components
import { InvoicesComponent } from './components/invoices/invoices.component'
import { SignupComponent } from './components/signup/signup.component'
import { SigninComponent } from './components/signin/signin.component'

import { AuthGuard } from './auth.guard'
import { InvoiceComponent } from './components/invoice/invoice.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full'
  },
  {
    path: 'invoices',
    component: InvoicesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'invoice/:id',
    component: InvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
