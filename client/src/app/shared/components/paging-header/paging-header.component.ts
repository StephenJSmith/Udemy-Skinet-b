import { Component, Input, OnInit } from '@angular/core';
import { ShopParams } from '../../_models/shopParams';

@Component({
  selector: 'app-paging-header',
  templateUrl: './paging-header.component.html',
  styleUrls: ['./paging-header.component.scss']
})
export class PagingHeaderComponent implements OnInit {
  @Input() shopParams: ShopParams;

  constructor() { }

  ngOnInit(): void {
  }
}
