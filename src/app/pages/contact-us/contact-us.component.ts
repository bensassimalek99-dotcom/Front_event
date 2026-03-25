import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Re-initialize jQuery plugins after component loads
    setTimeout(() => {
      if (typeof $ !== 'undefined') {
        $(window).trigger('resize');
      }
    }, 200);
  }
}
