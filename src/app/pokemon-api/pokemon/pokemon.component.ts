import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { ActivatedRoute } from '@angular/router';
// import { FavoritePokemonService} from '../favorite-pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.less']
})
export class PokemonComponent implements OnInit {
  pokemon: Pokemon = new Pokemon();
  isChecked: Boolean = false;
  isLoading: Boolean = true;
  error: Boolean = false;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    // private favoritePokemon: FavoritePokemonService
    ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.pokemonService.getPokemonInfo(id)
      .then((pokemon) => {
        this.pokemon = pokemon;
        this.isLoading = false;
      })
      .catch(() => {
        this.error = true;
        this.isLoading = false;
      });
  }

  onChange(event, pokemon) {
    if (event.target.checked) {
        // this.favoritePokemon.add(pokemon.id);
        pokemon.isChecked = true;
    } else {
        // this.favoritePokemon.remove(pokemon.id);
        pokemon.isChecked = false;
    }
}

}
