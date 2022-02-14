import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mob-header',
  templateUrl: './mob-header.component.html',
  styleUrls: ['./mob-header.component.css']
})
export class MobHeaderComponent implements OnInit {

  @Input() menus: any[] = []


  constructor() { }

  ngOnInit(): void {
  }

}
