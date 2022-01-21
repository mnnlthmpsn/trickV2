import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryProductsComponent } from './pages/category-products/category-products.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { IndexComponent } from './pages/index/index.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ShoppingMyItemsComponent } from './pages/shopping-my-items/shopping-my-items.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'my-favorites', component: FavoritesComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'shopping-my-items', component: ShoppingMyItemsComponent },
  { path: 'sub_category/products', component: CategoryProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
