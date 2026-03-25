import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-banner',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './page-banner.component.html',
  styleUrl: './page-banner.component.css'
})
export class PageBannerComponent {
  @Input() title = '';
  @Input() breadcrumb: {label: string, link?: string}[] = [];
}
