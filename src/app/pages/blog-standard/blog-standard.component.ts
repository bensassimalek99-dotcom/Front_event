import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var $: any;

@Component({
    selector: 'app-blog-standard',
    imports: [RouterModule, CommonModule],
    templateUrl: './blog-standard.component.html',
    styleUrl: './blog-standard.component.css'
})
export class BlogStandardComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Re-initialize jQuery plugins after component loads
    setTimeout(() => {
      if (typeof $ !== 'undefined') {
        $(window).trigger('resize');
      }
    }, 200);
  }
}
