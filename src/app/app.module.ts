import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './pokemon-api/pokemon-list/pokemon-list.component';
import { UiModule } from './pokemon-api/ui.module';
import { PokemonService } from './pokemon-api/pokemon.service';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './pokemon-api/pokemon/pokemon.component';
import { LoaderComponent } from './layout/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'pokelist', component: PokemonListComponent },
  { path: 'pokemon/:id', component: PokemonComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    FontAwesomeModule
  ],
  exports: [RouterModule],

  providers: [PokemonService, ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {}
}
