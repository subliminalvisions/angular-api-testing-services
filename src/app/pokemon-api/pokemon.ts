import { environment } from '../../environments/environment';

export class Pokemon {
    name: string;
    id: number;
    types = [];
    stats = [];
    flavor_text_entries = [];
    isChecked = false;

    constructor() { }

    capitalizeName() {
        return this.name ?
            this.name.charAt(0).toUpperCase() + this.name.slice(1) : '';
    }

    getImage(id) {
        const pokeImgae = environment.urls.sprite + id + '.png';
        console.log('pokeImgae', pokeImgae);
        return pokeImgae;
    }
}
