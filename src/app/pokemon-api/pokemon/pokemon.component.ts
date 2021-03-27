import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { PokeregionService } from '../pokeregion.service';
import { Pokemon } from '../pokemon';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';

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
  nextID: number;
  prevID: number;
  regionOffset: number;
  Region: string;

  constructor(
    private pokemonService: PokemonService,
    private currentRegion: PokeregionService,
    private route: ActivatedRoute,
    private router: Router,
    ) {
            // force route reload whenever params change;
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     }

  ngOnInit() {
    this.setPageId();
    this.getMyPokeInfo(this.ID);
  }
  setPageId() {

    this.route.params.subscribe(params => {
      this.ID = params['id'];
      // this.ID = this.route.snapshot.params['id'];    
      // reset and set based on new parameter this time
      this.getMyPokeInfo(this.ID);
    });
    this.Region = this.currentRegion.getRegionbyID(this.ID);
    this.regionOffset = this.currentRegion.getRegionOffsetbyID(this.ID);
    console.log(this.Region);

    this.nextID = +this.ID + +1;
    this.prevID = this.ID-1;
    console.log('id', this.ID);
    // console.log('nextID', this.nextID);
    // console.log('prevID', this.prevID);
  }
  goToPokeList= function () {
    // this.router.navigateByUrl('/pokelist');
    this.router.navigateByUrl('/pokelist/'+this.regionOffset);

  }
  loadNext() {
    this.router.navigate(['pokemon', this.nextID]);
    console.log('load nxt');
    // <!-- [routerLink]="['/pokemon', nextID]" -->
  }
  loadPrev() {
    this.router.navigate(['pokemon', this.prevID]);
    console.log('load Prev')
  }
  getMyPokeInfo(ID) {
    const dto = {};
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

}
