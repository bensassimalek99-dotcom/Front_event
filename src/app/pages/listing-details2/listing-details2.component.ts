import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-listing-details2',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './listing-details2.component.html',
  styleUrl: './listing-details2.component.css'
})
export class ListingDetails2Component implements AfterViewInit {
  ngAfterViewInit() {
    // Re-initialize jQuery plugins after component loads
    setTimeout(() => {
      if (typeof $ !== 'undefined') {
        $(window).trigger('resize');
      }
    }, 200);
  }
}
