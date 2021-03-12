import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pokemon } from './pokemon';
// import { FavoritePokemonService } from './favorite-pokemon.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  constructor(
    private http: HttpClient,
    // private favoritePokemon: FavoritePokemonService
    ) { }

  protected getHeaders() {
    const requestHeaders = new HttpHeaders();
    requestHeaders.set('Content-Type', 'application/json');
    return { headers: requestHeaders };
  }

  urlToID(pokemonurl) {
    // pokemonurl.match(/\/[0-9]+(?=\/)/gm);
    // pokemonurl.match(/\/[0-9]+(?=\/)/gm).substring(1);
    pokemonurl.match(/\/[0-9]+(?=\/)/gm).replace('/', '');
    // .replace(/ 
    console.log(pokemonurl);
    return pokemonurl;
  }
  // remove this function later 

  getMyPokeList(dto: any) {
    console.log('getMyPokeList', dto);
    const url = environment.urls.pokemon;

    return this.http.get<any>(url, this.getHeaders());
  }

  getPokeImage(url: string) {

    return this.http.get<any>(url, this.getHeaders());
  }

  getPokemonList(dto: any) {

    

    // pokemonList
    // JohtopokemonList // HoennpokemonList
    return this.http.get(environment.urls.HoennpokemonList, this.getHeaders())
      .toPromise()
      .then((res: HttpResponse<Pokemon>) => {

        let info = res;
        // let fullurl = '';
        let pokemonList = [];

        info["pokemon_entries"].forEach((entry) => {
          
          let newid = '';
          let idnum: number;
          newid = entry.pokemon_species.url.match(/\/[0-9]+(?=\/)/g).toString(); 
          newid = newid.substring(1); 
          idnum = parseInt(newid); 
          
            // only create Pokemon for Gen 2 ... testing 
            // pokemon.id = entry.entry_number;
            // pokemon.id = this.urlToID(entry.pokemon_species.url); 
            // newid = entry.pokemon_species.url.match(/\/[0-9]+(?=\/)/g).replace('/', ''); 
            // newid.replace('/', ''); 
            // console.log(parseInt(newid));
            // console.log(pokemon.name);
              let pokemon = new Pokemon();
              pokemon.name = entry.pokemon_species.name;
              pokemon.id = parseInt(newid); 
              
              // pokemon.isChecked = this.favoritePokemon.has(pokemon.id) ? true : false;
              pokemonList.push(pokemon);
              if (+(idnum) >= +(151)) {
              }



        });
        console.log(pokemonList);
        return pokemonList;

      });
  }

  getPokemonInfo(id: number) {
    return this.http.get(environment.urls.pokemon + id + '/', this.getHeaders())
      .toPromise()
      .then((res: HttpResponse<Pokemon>) => {
        let info = res;
        let pokemon = new Pokemon();
        pokemon.name = info["name"];
        pokemon.id = info["id"];
        // pokemon.isChecked = this.favoritePokemon.has(pokemon.id) ? true : false;
        
        info["types"].forEach((type) => {
          pokemon.types.push(type.type.name);
        });

        info["stats"].forEach((stats) => {
          pokemon.stats.push({
            name: stats.stat.name,
            value: stats.base_stat
          });
        });

        return pokemon;
      });
  }
}
