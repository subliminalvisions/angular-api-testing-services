import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { ActivatedRoute } from '@angular/router';
// import { FavoritePokemonService} from '../favorite-pokemon.service';
import { Location } from '@angular/common';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

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

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faCoffee = faCoffee;

  
  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private _location: Location
    // private favoritePokemon: FavoritePokemonService
    ) { }

  ngOnInit() {
    this.ID = this.route.snapshot.params['id'];
    console.log('id', this.ID);
    this.getMyPokeInfo(this.ID);

  }
  backClicked() {
    this._location.back();
  }
  fwdClicked() {
    this._location.back();
  }

  getMyPokeInfo(ID) {
    const dto = {
    };
    this.isLoading = true;
    this.pokemonService.getPokeInfoByID(ID).subscribe(
// getMyPokeInfo
      // err => console.log('HTTP Error??', err),
      response => {
        console.log('getPokeInfoByID --->resp', response);
        this.isLoading = false;
        // const totalPages = Math.ceil(response.results.length / 18);
        // for (let index = 0; index < totalPages; index++) {
        //   this.pages.push({ index: index + 1 });
        // }
        // console.log(response.results.length);
        console.log('response', response);

        this.imgUrl = this.pokemon.getImage(this.ID);
        this.pokemon.name = response.name;
        this.pokemon.id = this.ID;
        this.pokemon.flavor_text_entries = response.flavor_text_entries;

        
        
        // const newDs = response.map(obj => {         
        //   return {
        //     ...obj,
        //     // id: parseInt(obj.url.split('/')[6]),
        //     // imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseInt(obj.url.split('/')[6])}.png`
        //   }
        // });
        // this.pokemonList = newDs;
        // this.updatePage({ index: 1 });
        // console.log('newDs --->', newDs);
        // this.pokemonGrid = newDs;
        // this.isLoading = false;
      }
    );
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
