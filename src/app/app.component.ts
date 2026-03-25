import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';

declare var $: any;

const NO_LAYOUT_ROUTES = ['/register', '/coming-soon'];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  showLayout = true;

  constructor(private router: Router) {
    // Initialize based on the current URL so there is no flash on direct navigation
    this.showLayout = !NO_LAYOUT_ROUTES.includes(this.router.url);
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.showLayout = !NO_LAYOUT_ROUTES.includes(event.urlAfterRedirects);
      // Re-initialize jQuery plugins after navigation
      setTimeout(() => {
        if (typeof $ !== 'undefined' && typeof $.fn !== 'undefined') {
          $(window).trigger('load');
        }
      }, 100);
      // Scroll to top on navigation
      window.scrollTo(0, 0);
    });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
