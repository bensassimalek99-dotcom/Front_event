import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var $: any;

@Component({
    selector: 'app-listing-grid-map-right-sidebar',
    imports: [RouterModule, CommonModule],
    templateUrl: './listing-grid-map-right-sidebar.component.html',
    styleUrl: './listing-grid-map-right-sidebar.component.css'
})
export class ListingGridMapRightSidebarComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Re-initialize jQuery plugins after component loads
    setTimeout(() => {
      if (typeof $ !== 'undefined') {
        $(window).trigger('resize');
      }
    }, 200);
  }
}
