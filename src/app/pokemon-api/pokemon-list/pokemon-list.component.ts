import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { take } from 'rxjs/operators';
import {faHandPointLeft, faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { SelectControlValueAccessor } from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms';

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

  Generation: {
    number: number,
    name: string,
    offset: number
  };
  GenSelected: number;
  // pokemonList: Pokemon[] = [];

  // GenList: Array<Generation>;
  GenerationOptions = [
    {     
      number: 1,
      name: 'Kanto',
      offset: 0
    },
    { 
      number: 2,
      name: 'Johto',
      offset: 151
    },
    { 
      number: 3,
      name: 'Hoenn',
      offset: 251
    },
    { 
      number: 4,
      name: 'Sinnoh',
      offset: 386
    },
    { 
      number: 5,
      name: 'Unova',
      offset: 494
    }  
  ];
  ngForm = new FormGroup({
    state: new FormControl(this.GenerationOptions[1]),
  });
  // type MyArrayType = Array<{id: number, text: string}>;
  // not so sure bout this
  pageSize: number = 25;
  pageNumber: number;
  CurrentOffset: number;
  isLoading: Boolean = true;
  pages: Array<Object> = [];
  error: Boolean = false;
  // Errorsubscribing: <any>;
  Errorsubscribing: any[] = [];

  constructor(
    private pokemonService: PokemonService,
    // private favoritePokemon: FavoritePokemonService
    ) { }

  ngOnInit() {


    this.CurrentOffset=0;
    this.getMyPokeList(this.CurrentOffset);
    // this.getPokeImage(15);
  }

  // <mat-paginator [hidePageSize]="true" [pageSizeOptions]="[5, 10, 25, 100]" [pageSize]="pageSize" [length]="totalRows" (page)="pageChanged($event)"></mat-paginator>
  
  // pageChanged(e) {
  //   this.pageNumber = e.pageIndex;
  //   this.pageSize = e.pageSize;
  //   console.log(this.pageNumber + '---' + this.pageSize);
  //   this.getMyPokeList();
  // }



  NextPage() {
    this.CurrentOffset +=18;
    this.getMyPokeList(this.CurrentOffset);
  }

  changeGen(region) {
    console.log('c_offset= ', region.offset);
    this.GenSelected = region.number;

    this.CurrentOffset = region.offset;

    this.getMyPokeList(this.CurrentOffset);
  }
  PrevPage() {
    this.CurrentOffset -=18;
    this.getMyPokeList(this.CurrentOffset);
  }

  getMyPokeList(PgOffset) {
    const dto = {
    };
    this.isLoading = true;



    // const orderBy = (this.sortOrder === 'asc') ? this.sortField : '-' + this.sortField;

    var searchCriteria = {
      // orderBy: orderBy,
      // limit: this.pageSize,
      // offset: (this.pageNumber * this.pageSize),
      // limit: 33,
      limit: 18,
      // Johto is offset by 151 - Chikorita
      // Hoenn is offset by 251 - Treeko
      // Sinnoh is offset by 386 - Turtwig
      offset: PgOffset,
      page: this.pageNumber 
    };

      // call service for search, not NgRx
      //-----
    // this.pokemonService.getMyPokeList(searchCriteria).pipe(
    //   take(1),
    // ).subscribe(
    //   data => {
    //     console.log('service', data.body.data); // ??? 
    //     this.dataSource.data = data.body.data.results;
    //     this.filteredHeroes = data.body.data.total;
    //     this.totalRows = this.filteredHeroes;
    //   }
    // );
    this.pokemonService.getMyPokeList(searchCriteria).subscribe(

      // err => console.log('HTTP Error??', err),

      response => {


        console.log('getMyPokeList --->resp', response);

        // trying to add pagination props to this search  
        this.pages = [];
        this.isLoading = false;

        const totalPages = Math.ceil(response.results.length / 18);

        for (let index = 0; index < totalPages; index++) {
          this.pages.push({ index: index + 1 });
        }

        console.log(response.results.length);
        console.log(this.pages);


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

        console.log('newDs --->', newDs);
        
        this.pokemonGrid = newDs;
        this.isLoading = false;

      }

    );

  }

  // the paginator function, 
  // which needs to change to a new api call on the next property  
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

  getPokeImage(url: string) {
    console.log('url', url);

    this.pokemonService.getPokeImage(url).subscribe(
      response => {
        console.log('getPokeImage', response);
      }
    );
  }

/*
  getListOfPokes() {

    // dto criteria
    const pokeListOjbect = {

    };

    this.pokemonService.getMyPokeList(pokeListOjbect)
      .then((pokemon) => {
        this.pages = [];
        this.isLoading = false;

        const totalPages = Math.ceil(pokemon.length / 15);

        for (let index = 0; index < totalPages; index++) {
          this.pages.push({ index: index + 1 });
        }

        this.pokemonList = pokemon;

        this.updatePage({ index: 1 });
      })
      .catch(() => {
        this.error = true;
        this.isLoading = false;
      });
  }
  */

 

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

