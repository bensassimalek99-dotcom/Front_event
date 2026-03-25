import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-listing-details3',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './listing-details3.component.html',
  styleUrl: './listing-details3.component.css'
})
export class ListingDetails3Component implements AfterViewInit {
  ngAfterViewInit() {
    // Re-initialize jQuery plugins after component loads
    setTimeout(() => {
      if (typeof $ !== 'undefined') {
        $(window).trigger('resize');
      }
    }, 200);
  }
}
