import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeregionService {

  num: number;
  constructor() { }

  getRegionbyID(id: number) {
    const r = " Region";
    let current = "Kanto";
    if (id<152) { current = "Kanto" };
    if (151<id && id<252) { current =  "Johto" };
    if (251<id && id<387) { current =  "Hoenn" };
    if (386<id && id<495) { current =  "Sinnoh" };
    if (494<id && id<649) { current =  "Unova" };
    if (648<id && id<722) { current =  "Kalos" };
    if ( 721<id ) { current =  "Unreleased" };
    return current+r;
  }
  currentRegionbyRange(num1: number, num2: number) {
    // will determine region by min & max #s 
    // still in progress
    let current = "Kanto";
    const r = " Region";
    if (151<num1 && num2<252) { current =  "Johto" };
    return current+r;
  }

}
