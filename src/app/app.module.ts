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
import { CategoryCardComponent } from './widgets/category-card/category-card.component';
import { NewArrivalsComponent } from './components/home/new-arrivals/new-arrivals.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { SubcategoryCardComponent } from './widgets/subcategory-card/subcategory-card.component';
import { CategoryProductsComponent } from './pages/category-products/category-products.component';
import { CategoryMenuComponent } from './widgets/category-menu/category-menu.component';
import { FilterComponent } from './widgets/filter/filter.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ShoppingMyItemsComponent } from './pages/shopping-my-items/shopping-my-items.component';
import { SidebarModule } from 'ng-sidebar';

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
    TopCategoriesComponent,
    CategoryCardComponent,
    NewArrivalsComponent,
    CategoriesComponent,
    SubcategoryCardComponent,
    CategoryProductsComponent,
    CategoryMenuComponent,
    FilterComponent,
    FavoritesComponent,
    ShoppingCartComponent,
    ShoppingMyItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    SidebarModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
