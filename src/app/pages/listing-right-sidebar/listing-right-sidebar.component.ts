import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-listing-right-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './listing-right-sidebar.component.html',
  styleUrl: './listing-right-sidebar.component.css'
})
export class ListingRightSidebarComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Re-initialize jQuery plugins after component loads
    setTimeout(() => {
      if (typeof $ !== 'undefined') {
        $(window).trigger('resize');
      }
    }, 200);
  }
}
