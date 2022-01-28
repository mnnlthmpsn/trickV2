import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TricklesService } from 'src/app/services/trickles.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  items: any[] = []

  constructor(private router: ActivatedRoute, private tricklesService: TricklesService) { }

  ngOnInit(): void {
    this.getURLParams()
  }

  getURLParams(): void {
    this.router.queryParams.subscribe(params => {
      this.tricklesService.SearchProduct(params['search_name'])
        .subscribe(
          res => !res.resp_code ? (this.items = res) : this.items = [],
          err => console.log(err)
        )
    })
  }
}
