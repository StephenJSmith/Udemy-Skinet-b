import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent implements OnInit {
  breadcrumb$: Observable<any[]>;

  constructor(private bcService: BreadcrumbService) { }

  ngOnInit(): void {
    this.breadcrumb$ = this.bcService.breadcrumbs$;
  }

  getLastBreadcrumbLabel(breadcrumbs: any[]): string {
    const len = breadcrumbs.length;
    if (len === 0) { return ''; }

    return breadcrumbs[len - 1].label;
  }

  canDisplayBreadcrumbs(breadcrumbs: any[]): boolean {
    const len = breadcrumbs.length;
    if (len === 0) { return false; }

    return this.getLastBreadcrumbLabel(breadcrumbs) !== 'Home';
  }
}
