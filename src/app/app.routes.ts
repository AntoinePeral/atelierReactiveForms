import { Routes } from '@angular/router';
import { SignUpFormPageComponent } from './pages/sign-up-form-page/sign-up-form-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: SignUpFormPageComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
