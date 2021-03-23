import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './pokemon-api/pokemon-list/pokemon-list.component';
import { UiModule } from './pokemon-api/ui.module';
// import { LayoutComponent } from './pokemon-api/layout/layout.component';
import { PokemonService } from './pokemon-api/pokemon.service';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './pokemon-api/pokemon/pokemon.component';
import { LoaderComponent } from './layout/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { SelectControlValueAccessor } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// import { FaIconComponent, FontAwesomeModule } from "@fortawesome/angular-fontawesome";

// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { FontAwesomeModule, FaIconLibrary  } from '@fortawesome/angular-fontawesome';
// import { faCoffee, fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeModule, FaIconLibrary  } from '@fortawesome/angular-fontawesome';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { FontAwesomeModule, FaIconLibrary  } from '@fortawesome/angular-fontawesome';
// import { faCoffee, fas } from '@fortawesome/free-solid-svg-icons';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'pokemon/:id', component: PokemonComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    // FaIconComponent,
    LoaderComponent,
    // LayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    // FontAwesomeModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  // exports: [
  //   FontAwesomeModule
  // ],
  providers: [PokemonService, ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {}

  // constructor(library: FaIconLibrary) {
  //   library.addIconPacks(fas);
  //   library.addIcons(faCoffee);
  // }
}
