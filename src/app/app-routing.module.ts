import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { PaymentComponent } from './payment/payment.component';
import { LoginComponent } from './login/login.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { NotfoundComponent } from "./notfound/notfound.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomepageComponent
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
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'category/:name',
    component: CategoryPageComponent
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
