import { Component, OnInit } from '@angular/core';
import { concat, Subscription } from 'rxjs';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {
  loading: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(private pokemonService: PokemonService) {}
  get pokemons(): any[] {
    return this.pokemonService.pokemons;
  }
  set subscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }
  ngOnInit(): void {
    if (!this.pokemons.length) {
      this.loadMore();
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) =>
      subscription ? subscription.unsubscribe() : 0
    );
  }
  loadMore(): void {
    this.loading = true;
    this.subscription = this.pokemonService.getNext().subscribe({
      next: (res) => {
        this.pokemonService.next = res.next;
        const details = res.results.map((i: any) =>
          this.pokemonService.get(i.name)
        );
        this.subscription = concat(...details).subscribe((response: any) => {
          this.pokemonService.pokemons.push(response);
        });
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  getType(pokemon: any): string {
    return this.pokemonService.getType(pokemon);
  }
}
