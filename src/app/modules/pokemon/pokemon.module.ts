import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokemonComponent } from './pokemon.component';

@NgModule({
  declarations: [PokemonComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PokemonComponent }]),
  ],
})
export class PokemonModule {}
