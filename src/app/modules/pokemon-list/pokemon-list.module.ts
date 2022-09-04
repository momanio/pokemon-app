import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokemonListComponent } from './pokemon-list.component';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [PokemonListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PokemonListComponent }]),
    MatCardModule,
  ],
})
export class PokemonListModule {}
