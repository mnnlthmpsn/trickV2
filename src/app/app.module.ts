import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { HeaderComponent } from './widgets/header/header.component';
import { HomeShopComponent } from './components/home/home-shop/home-shop.component';
import { ProductCardComponent } from './widgets/product-card/product-card.component';
import { MostViewedComponent } from './components/home/most-viewed/most-viewed.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { FooterComponent } from './widgets/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopCategoriesComponent } from './components/home/top-categories/top-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    HomeShopComponent,
    ProductCardComponent,
    MostViewedComponent,
    MyAccountComponent,
    FooterComponent,
    TopCategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
