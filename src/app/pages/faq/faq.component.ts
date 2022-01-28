import { Component, OnInit } from '@angular/core';
import { TricklesService } from 'src/app/services/trickles.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  faq_list: any = [];

  constructor(private tricklesAPI: TricklesService) { }

  ngOnInit(): void {
    this.GetFAQs();
  }


  GetFAQs() {
    this.tricklesAPI.GetFAQRequest()
      .subscribe(
        data => {
          this.faq_list = data;
        }
      )
  }

}

