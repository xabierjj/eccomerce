import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http'
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs)


//Interceptors

import { AuthInterceptorService } from './services/auth-interceptor.service';

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
import { ProductEditComponent } from './components/admin/product-edit/product-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ProductsComponent,
    HomeComponent,
    SignupComponent,
    ProductCardComponent,
    AdminProductsComponent,
    ProductEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    APP_ROUTING
  ],
  providers: [AuthService, {
    provide: LOCALE_ID,
    useValue: 'es'
  }, {provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
