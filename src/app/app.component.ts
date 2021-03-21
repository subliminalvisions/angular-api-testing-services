import { Component } from '@angular/core';
// import { FavoritePokemonService} from '../favorite-pokemon.service';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  title = 'angular-api-testing-services';
}
