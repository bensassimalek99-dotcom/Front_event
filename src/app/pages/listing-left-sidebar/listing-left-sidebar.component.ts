import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var $: any;

@Component({
    selector: 'app-listing-left-sidebar',
    imports: [RouterModule, CommonModule],
    templateUrl: './listing-left-sidebar.component.html',
    styleUrl: './listing-left-sidebar.component.css'
})
export class ListingLeftSidebarComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Re-initialize jQuery plugins after component loads
    setTimeout(() => {
      if (typeof $ !== 'undefined') {
        $(window).trigger('resize');
      }
    }, 200);
  }
}
