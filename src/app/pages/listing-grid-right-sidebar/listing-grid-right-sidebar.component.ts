import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-listing-grid-right-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './listing-grid-right-sidebar.component.html',
  styleUrl: './listing-grid-right-sidebar.component.css'
})
export class ListingGridRightSidebarComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Re-initialize jQuery plugins after component loads
    setTimeout(() => {
      if (typeof $ !== 'undefined') {
        $(window).trigger('resize');
      }
    }, 200);
  }
}
