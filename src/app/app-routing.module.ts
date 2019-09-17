import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { PaymentComponent } from './payment/payment.component';
import { NotfoundComponent } from "./notfound/notfound.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'productdetails',
    component: ProductdetailComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
