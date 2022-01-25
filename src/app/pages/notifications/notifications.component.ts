import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TricklesService } from 'src/app/services/trickles.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  submitted = false;
  customer_id: string | null = "";
  notifications_list: any[] = [];
  card_wallets = [];
  currentRoute: string = '';

  constructor(private auth: AuthService, private tricklesAPI: TricklesService, private router: Router) { }

  ngOnInit(): void {

    this.getCustomerID();

    this.currentRoute = this.router.url;
  }

  getCustomerID(): void {
    this.auth.isAuthenticated()
      .then(res => {
        this.customer_id = res.customer_id
        this.getNotificationsList()
      })
      .catch(err => this.customer_id = null)
  }

  getNotificationsList() {
    this.tricklesAPI.getNotificationRequest(this.customer_id)
      .subscribe(
        data => {
          this.notifications_list = data;
        },
      )
  }


}
