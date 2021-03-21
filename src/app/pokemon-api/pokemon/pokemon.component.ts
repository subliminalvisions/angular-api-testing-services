import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { ActivatedRoute } from '@angular/router';

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
  imgUrl: string;
  pokeName: string;
  ID: number;


  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.ID = this.route.snapshot.params['id'];
    console.log('id', this.ID);
    this.getMyPokeInfo(this.ID);

  }
  loadNext() {
    console.log('load nxt')
  }

  getMyPokeInfo(ID) {
    const dto = {
    };
    this.isLoading = true;
    this.pokemonService.getPokeInfoByID(ID).subscribe(
      // err => console.log('HTTP Error??', err),
      response => {
        console.log('getPokeInfoByID --->resp', response);
        this.isLoading = false;
        console.log('response', response);
        this.imgUrl = this.pokemon.getImage(this.ID);
        this.pokemon.id = this.ID;
        this.pokemon.name = response.name;
        this.pokemon.flavor_text_entries = response.flavor_text_entries;
        this.isLoading = false;
      }
    );
  }

  // onChange(event, pokemon) {
  //   if (event.target.checked) {
  //       // this.favoritePokemon.add(pokemon.id);
  //       pokemon.isChecked = true;
  //   } else {
  //       // this.favoritePokemon.remove(pokemon.id);
  //       pokemon.isChecked = false;
  //   }
  // }

}
