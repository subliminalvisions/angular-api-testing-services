import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeregionService {
  regionData = [
      {     
          number: 1,
          name: 'Kanto',
          offset: 0,
          maxnum: 150
      },
      { 
          number: 2,
          name: 'Johto',
          offset: 151,
          maxnum: 250
      },
      { 
          number: 3,
          name: 'Hoenn',
          offset: 251,
          maxum: 385
      },
      { 
          number: 4,
          name: 'Sinnoh',
          offset: 386,
          maxnum: 493
      },
      { 
          number: 5,
          name: 'Unova',
          offset: 494
      }  
  ];
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

  getRegionOffsetbyID(id: number) {
    let current = 0;
    if (id<152) { current = 0 };
    if (151<id && id<252) { current =  151 };
    if (251<id && id<387) { current =  251 };
    if (386<id && id<495) { current =  386 };
    if (494<id && id<649) { current =  494 };
    if (648<id && id<722) { current =  648 };
    if ( 721<id ) { current =  721 };
    return current;
  }



  // num1: number, num2: number
  // testing still ... tbd
  currentRegionbyRange(offset: number) {
    // will determine region by min & max #s 
    // still in progress
    let current = "Kanto";
    const r = " Region";
    // if (151<num1 && num2<252)
    if (151<offset && offset<252) { current =  "Johto" };
    return current+r;
  }

}
