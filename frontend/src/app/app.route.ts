import {RouterModule,Routes} from '@angular/router';

import {LoginComponent} from './components/login/login.component'
import {HomeComponent} from './components/home/home.component'
import {SignupComponent} from './components/signup/signup.component'
import {ProductsComponent} from './components/products/products.component'
import {AdminProductsComponent} from './components/admin/admin-products/admin-products.component'
import {ProductEditComponent} from './components/admin/product-edit/product-edit.component'


import { AuthGuard } from './guards/auth.guard';

const app_routes: Routes = [
    {path: 'home', component: ProductsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    // {path: 'products', component: ProductsComponent},
    {path: 'admin/products', component: AdminProductsComponent, canActivate:[AuthGuard]},
    {path: 'admin/products/edit/:id', component: ProductEditComponent, canActivate:[AuthGuard]},

    {path: '**', pathMatch: 'full' , redirectTo:'home'},
]

export const APP_ROUTING = RouterModule.forRoot(app_routes)