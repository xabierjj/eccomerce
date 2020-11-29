import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

//Servicios
import { AuthService } from './services/auth.service';

// Rutas
import { APP_ROUTING } from './app.route';

//Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ProductsComponent,
    HomeComponent,
    SignupComponent,
    ProductCardComponent,
    AdminProductsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    APP_ROUTING
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
