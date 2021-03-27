
export class Pokemon {
    name: string;
    id: number;
    num: number;

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


    constructor() { }

    mapRegionOffset() {
        return this.name ?
            this.name.charAt(0).toUpperCase() + this.name.slice(1) : '';
    }

}
