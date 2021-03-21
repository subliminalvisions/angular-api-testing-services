import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { Test3Component } from './test3/test3.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ LayoutComponent, PokemonComponent, Test3Component ],
  exports: [LayoutComponent]
})
export class UiModule { }
