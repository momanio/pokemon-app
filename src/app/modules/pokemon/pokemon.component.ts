import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  pokemon: any = null;

  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  set subscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      if (this.pokemonService.pokemons.length) {
        this.pokemon = this.pokemonService.pokemons.find(
          (i) => i.name === params['name']
        );
        if (this.pokemon) {
          this.getEvolution();
          return;
        }
      }

      this.subscription = this.pokemonService.get(params['name']).subscribe({
        next: (res) => {
          this.pokemon = res;
          this.getEvolution();
        },
        error: (e) => {
          console.error(e);
        },
      });
    });
  }

  getEvolution() {
    if (!this.pokemon.evolutions || !this.pokemon.evolutions.length) {
      this.pokemon.evolutions = [];
      this.subscription = this.pokemonService
        .getSpecies(this.pokemon.name)
        .subscribe((response) => {
          const id = this.getId(response.evolution_chain.url);
          this.subscription = this.pokemonService
            .getEvolution(id)
            .subscribe((response) => this.getEvolves(response.chain));
        });
    }
  }

  getEvolves(chain: any) {
    this.pokemon.evolutions.push({
      id: this.getId(chain.species.url),
      name: chain.species.name,
    });

    if (chain.evolves_to.length) {
      this.getEvolves(chain.evolves_to[0]);
    }
  }

  getType(pokemon: any): string {
    return this.pokemonService.getType(pokemon);
  }

  getId(url: string): number {
    const splitUrl = url.split('/');
    return +splitUrl[splitUrl.length - 2];
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) =>
      subscription ? subscription.unsubscribe() : 0
    );
  }
}
