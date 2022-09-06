import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokemonListComponent } from './pokemon-list.component';
import { MatCardModule } from '@angular/material/card';
import { SearchFilterPipe } from 'src/app/shared/search-filter.pipe';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [PokemonListComponent, SearchFilterPipe],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PokemonListComponent }]),
    FormsModule,
    MatCardModule,
  ],
})
export class PokemonListModule {}
