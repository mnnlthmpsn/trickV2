import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { Product } from 'src/app/models/product.model';
import { TricklesService } from 'src/app/services/trickles.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product = new Product()

  constructor(private tricklesAPI: TricklesService) {}

  ngOnInit(): void {}
}
