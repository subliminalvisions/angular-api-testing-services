import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { PokemonComponent } from './pokemon/pokemon.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ LayoutComponent, PokemonComponent ],
  exports: [LayoutComponent]
})
export class UiModule { }
