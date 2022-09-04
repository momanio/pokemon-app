import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'pokemon-list', pathMatch: 'full' },
  {
    path: 'pokemon-list',
    loadChildren: () =>
      import('./modules/pokemon-list/pokemon-list.module').then(
        (m) => m.PokemonListModule
      ),
  },
  {
    path: 'pokemon/:name',
    loadChildren: () =>
      import('./modules/pokemon/pokemon.module').then((m) => m.PokemonModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
