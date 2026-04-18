import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ListingComponent } from './pages/listing/listing.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { Error404Component } from './pages/error404/error404.component';
import { authGuard } from './guards/auth.guard';
import { CreateEventComponent } from './pages/admin/create-event/create-event.component';
import { EditEventComponent } from './pages/admin/edit-event/edit-event.component';
import { ManageInscriptionsComponent } from './pages/admin/manage-inscriptions/manage-inscriptions.component';

export const routes: Routes = [
  // Page d'accueil
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  
  // Authentification
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  
  // Événements (protégés par authGuard)
  { path: 'listing', component: ListingComponent, canActivate: [authGuard] },
  { path: 'event/:id', component: EventDetailsComponent, canActivate: [authGuard] },
  
  // Contact
  { path: 'contact-us', component: ContactUsComponent },
  
  // Admin routes
{ 
  path: 'admin/create-event', 
  component: CreateEventComponent, 
  canActivate: [authGuard] 
},
{ 
  path: 'admin/edit-event/:id', 
  component: EditEventComponent, 
  canActivate: [authGuard] 
}, 

{ 
  path: 'admin/inscriptions', 
  component: ManageInscriptionsComponent, 
  canActivate: [authGuard] 
},

// Erreur 404 - Toute route non trouvée
{ path: '**', component: Error404Component }

];