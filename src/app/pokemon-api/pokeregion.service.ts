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
      },  
      { 
          number: 6,
          name: 'Kalos',
          offset: 648
      },
      { 
          number: 7,
          name: 'Unreleased',
          offset: 722
      }  
      
  ];
  num: number;
  constructor() { }

  getRegionbyID(id: number) {
    const r = " Region";
    let current = "Kanto";
    if (id<152) { current = "Kanto" };
    if (150<id && id<251) { current =  "Johto" };
    if (251<id && id<387) { current =  "Hoenn" };
    if (386<id && id<495) { current =  "Sinnoh" };
    if (494<id && id<648) { current =  "Unova" };
    if (647<id && id<722) { current =  "Kalos" };
    if (721<id ) { current =  "Unreleased" };
    return current+r;
  }

  getRegionOffsetbyID(id: number) {
    let current = 0;
    if (id<151) { current = 0 };
    if (150<id && id<251) { current =  151 };
    if (250<id && id<386) { current =  251 };
    if (385<id && id<494) { current =  386 };
    if (493<id && id<648) { current =  494 };
    if (647<id && id<723) { current =  648 };
    if (721<id ) { current =  722 };
    return current;
  }

}
