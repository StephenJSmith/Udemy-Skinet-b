import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShopParams } from '../../_models/shopParams';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {
  @Input() shopParams: ShopParams;
  @Output() pageChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {  }

  onPageChanged(event: any): void {
    this.pageChanged.emit(event.page);
  }
}
