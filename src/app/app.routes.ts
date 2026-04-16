import { Routes } from '@angular/router';
import { AddListingComponent } from './pages/add-listing/add-listing.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
import { BlogStandardComponent } from './pages/blog-standard/blog-standard.component';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { Home2Component } from './pages/home2/home2.component';
import { Home3Component } from './pages/home3/home3.component';
import { LoginComponent } from './pages/login/login.component';
import { ListingDetailsComponent } from './pages/listing-details/listing-details.component';
import { ListingDetails2Component } from './pages/listing-details2/listing-details2.component';
import { ListingDetails3Component } from './pages/listing-details3/listing-details3.component';
import { ListingGridLeftSidebarComponent } from './pages/listing-grid-left-sidebar/listing-grid-left-sidebar.component';
import { ListingGridMapLeftSidebarComponent } from './pages/listing-grid-map-left-sidebar/listing-grid-map-left-sidebar.component';
import { ListingGridMapRightSidebarComponent } from './pages/listing-grid-map-right-sidebar/listing-grid-map-right-sidebar.component';
import { ListingGridRightSidebarComponent } from './pages/listing-grid-right-sidebar/listing-grid-right-sidebar.component';
import { ListingLeftSidebarComponent } from './pages/listing-left-sidebar/listing-left-sidebar.component';
import { ListingRightSidebarComponent } from './pages/listing-right-sidebar/listing-right-sidebar.component';
import { ListingComponent } from './pages/listing/listing.component';
import { RegisterComponent } from './pages/register/register.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'index-2', component: Home2Component },
  { path: 'index-3', component: Home3Component },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listing', component: ListingComponent, canActivate: [authGuard] },
  { path: 'event/:id', component: EventDetailsComponent, canActivate: [authGuard] },
  { path: 'listing-left-sidebar', component: ListingLeftSidebarComponent },
  { path: 'listing-right-sidebar', component: ListingRightSidebarComponent },
  { path: 'listing-grid-left-sidebar', component: ListingGridLeftSidebarComponent },
  { path: 'listing-grid-right-sidebar', component: ListingGridRightSidebarComponent },
  { path: 'listing-grid-map-left-sidebar', component: ListingGridMapLeftSidebarComponent },
  { path: 'listing-grid-map-right-sidebar', component: ListingGridMapRightSidebarComponent },
  { path: 'listing-details', component: ListingDetailsComponent },
  { path: 'listing-details-2', component: ListingDetails2Component },
  { path: 'listing-details-3', component: ListingDetails3Component },
  { path: 'blog-standard', component: BlogStandardComponent },
  { path: 'blog-details', component: BlogDetailsComponent },
  { path: 'add-listing', component: AddListingComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'coming-soon', component: ComingSoonComponent },
  { path: 'error-404', component: Error404Component },
  { path: '**', component: Error404Component },
  
];
