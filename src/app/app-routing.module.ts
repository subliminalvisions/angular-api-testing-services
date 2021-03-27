import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PokemonService } from './pokemon-api/pokemon.service';
import { PokemonListComponent } from './pokemon-api/pokemon-list/pokemon-list.component';
import { PokemonComponent } from './pokemon-api/pokemon/pokemon.component';

const routes: Routes = [
  // { path: '', component: PokemonListComponent },
  { path: 'pokelist/:offset', component: PokemonListComponent },
  { path: 'pokemon/:id', component: PokemonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
