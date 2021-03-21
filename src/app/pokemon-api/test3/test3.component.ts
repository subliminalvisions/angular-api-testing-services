import { Component, OnInit } from '@angular/core';

import {faCoffee, faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { SelectControlValueAccessor } from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-test3',
  templateUrl: './test3.component.html',
  styleUrls: ['./test3.component.less']
})

export class Test3Component implements OnInit {
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faCoffee = faCoffee;

  constructor() { }

  ngOnInit(): void {
  }
  testPage() {
    console.log('testpage () .. ')
  }

}
