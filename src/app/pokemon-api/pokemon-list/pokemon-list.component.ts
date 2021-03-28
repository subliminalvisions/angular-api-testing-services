import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { take } from 'rxjs/operators';
import {faHandPointLeft, faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { SelectControlValueAccessor } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { PokeregionService } from '../pokeregion.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.less']
})
export class PokemonListComponent implements OnInit {
  /* All pokemons since page feature is broken */
  pokemonList: Pokemon[] = [];
  /* Pokemons to show, used since feature page is broken */
  pokemonGrid: Pokemon[] = [];
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faHandPointLeft = faHandPointLeft;
  listOffset: number;

  Generation: {
    number: number,
    name: string,
    offset: number
  };
  GenSelected: number;
  // pokemonList: Pokemon[] = [];
  GenerationOptions: {};

  pageSize: number = 25;
  pageNumber: number;
  CurrentOffset: number;
  isLoading: Boolean = true;
  pages: Array<Object> = [];
  error: Boolean = false;
  // Errorsubscribing: <any>;
  Errorsubscribing: any[] = [];
  Region: string;
  regionIndex: number;
  ngForm = new FormGroup({});

  constructor(
    private regions: PokeregionService,
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router,
    // private favoritePokemon: FavoritePokemonService
    ) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false; 
    }
    ngOnInit() {
      this.CurrentOffset=0;
      this.getPageOffset();
    }
    getPageOffset() {
      this.GenerationOptions = this.regions.regionData;
      this.ngForm = new FormGroup({
        state: new FormControl(this.GenerationOptions[0]),
      });
      this.route.params.subscribe(params => {
        this.listOffset = params['offset'];
        this.CurrentOffset = params['offset'];
        // this.ID = this.route.snapshot.params['id'];    
        // reset and set based on new parameter this time
        this.regionIndex = this.matchRegion();
        this.getMyPokeList(this.CurrentOffset);
      });
    }

  matchRegion() {

    let num = this.regions.getRegionOffsetbyID(this.CurrentOffset);
    console.log(num);
    const indx = this.findIndexWithNumber(
      this.regions.regionData, 'offset', num
      );

      console.log('indx', indx);
    return ((indx>0) ? indx : 0); 
  }
  // find where region offset value = this.CurrentOffset
  findIndexWithNumber(array, attr, num) {
    console.log('arr', array);
    const x = num;
    let y: number = +x;
    for(var i = 0; i < array.length; i += 1) {      
      if(array[i][attr] === y) {
            return i;
        }
    }
    return -1;
  }
  

  NextPage() {
    this.CurrentOffset = +this.CurrentOffset +18;
    this.getMyPokeList(this.CurrentOffset);
    this.router.navigateByUrl('/pokelist/'+this.CurrentOffset);
  }
  PrevPage() {
    if ((Math.sign(this.CurrentOffset))>0) {
      this.CurrentOffset = +this.CurrentOffset + -18;
    } else {
      console.log('CurrentOffset', this.CurrentOffset);
      this.CurrentOffset = 0;
    };
    this.getMyPokeList(this.CurrentOffset);
    this.router.navigateByUrl('/pokelist/'+this.CurrentOffset);
  }
  changeGen(region) {
    this.GenSelected = region.number;
    this.CurrentOffset = region.offset;
    this.router.navigateByUrl('/pokelist/'+this.CurrentOffset);
    this.getMyPokeList(this.CurrentOffset);    
  }
  getMyPokeList(PgOffset) {
    const dto = {
    };
    this.isLoading = true;
    var searchCriteria = {
      // limit: this.pageSize,
      // offset: (this.pageNumber * this.pageSize),
      limit: 18,
      offset: PgOffset,
      page: this.pageNumber 
    };
    this.pokemonService.getMyPokeList(searchCriteria).subscribe(
      // err => console.log('HTTP Error??', err),
      response => {
        // add pagination props to this search  
        this.pages = [];
        this.isLoading = false;
        const totalPages = Math.ceil(response.results.length / 18);
        for (let index = 0; index < totalPages; index++) {
          this.pages.push({ index: index + 1 });
        }
        const newDs = response.results.map(obj => {
          
          return {
            ...obj,
            // grab id # from poke url field 
            id: parseInt(obj.url.split('/')[6]),
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseInt(obj.url.split('/')[6])}.png`
          }
        });
        this.pokemonList = newDs;
        this.updatePage({ index: 1 });        
        // this.pokemonGrid = newDs;
        this.isLoading = false;
      }
    );
  }

  // the paginator function, 
  // change a api call for  next property  
  updatePage(page) {
    const pageStart = (page.index - 1) * 15;
    const pageEnd = page.index * 15;

    this.pokemonGrid = [];
    this.pokemonList.forEach(p => {
      if (p.id > pageStart && p.id <= pageEnd) {
        this.pokemonGrid.push(p);
      }
    });
  }

  // For Fave Poke Function
  // onChange(event, pokemon) {
  //   if (event.target.checked) {
  //     // this.favoritePokemon.add(pokemon.id);
  //     pokemon.isChecked = true;
  //   } else {
  //     // this.favoritePokemon.remove(pokemon.id);
  //     pokemon.isChecked = false;
  //   }
  // }

}

