import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/characters',
    pathMatch: 'full'
  },
  {
    path: 'characters',
    loadComponent: () => import('./components/characters/characters.component').then(m => m.CharactersComponent),
    title: 'Characters - Harry Potter'
  },
  {
    path: 'spells',
    loadComponent: () => import('./components/spells/spells.component').then(m => m.SpellsComponent),
    title: 'Spells - Harry Potter'
  },
  {
    path: '**',
    redirectTo: '/characters'
  }
];
