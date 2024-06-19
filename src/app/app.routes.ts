import { Routes } from '@angular/router';
import { CreditCardFormComponent } from './components/credit-card-form/credit-card-form.component';
import { SuccessFormComponent } from './components/success-form/success-form.component';
import { FailFormComponent } from './components/fail-form/fail-form.component';

export const routes: Routes = [
    { path:'form', component:CreditCardFormComponent},
    { path:'success', component:SuccessFormComponent},
    { path:'fail', component:FailFormComponent},
    { path: '', redirectTo:'form', pathMatch:'full'},
];
