import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.css']
})
export class ProfileSidebarComponent implements OnInit {

  currentRoute: string;
  customer: any

  constructor(private router: Router, private auth: AuthService, private cookies: CookieService) {
    this.currentRoute = router.url;
  }


  ngOnInit(): void {
    this.getCustomer()
  }

  getCustomer(): void {
    this.auth.isAuthenticated()
      .then(res => this.customer = res)
      .catch(err => this.customer = null)
  }

  logout(): void {
    this.cookies.deleteAll()
    localStorage.setItem('qqrcfh', JSON.stringify(false))
    this.router.navigateByUrl('/')
  }

}
