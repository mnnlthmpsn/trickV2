import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirtimeComponent } from './pages/airtime/airtime.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryProductsComponent } from './pages/category-products/category-products.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { FaqComponent } from './pages/faq/faq.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { IndexComponent } from './pages/index/index.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { ProductDefaultComponent } from './pages/product-default/product-default.component';
import { SearchComponent } from './pages/search/search.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ShoppingMyItemsComponent } from './pages/shopping-my-items/shopping-my-items.component';
import { TransactionHistoryComponent } from './pages/transaction-history/transaction-history.component';
import { UserInformationComponent } from './pages/user-information/user-information.component';
import { WalletComponent } from './pages/wallet/wallet.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'airtime', component: AirtimeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'faqs', component: FaqComponent },
  { path: 'my-favorites', component: FavoritesComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'my-account/password-reset', component: PasswordResetComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'product-details', component: ProductDefaultComponent },
  { path: 'query', component: SearchComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'shopping-my-items', component: ShoppingMyItemsComponent },
  { path: 'sub_category/products', component: CategoryProductsComponent },
  { path: 'transaction-history', component: TransactionHistoryComponent },
  { path: 'user-information', component: UserInformationComponent },
  { path: 'wallets', component: WalletComponent },
  { path: '**', pathMatch: 'full', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
