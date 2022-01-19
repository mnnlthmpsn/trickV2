import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'my-account', component: MyAccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
