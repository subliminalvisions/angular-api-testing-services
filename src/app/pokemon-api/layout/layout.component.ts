import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
  @Input('isLoading') isLoading: Boolean;

  @Input('isFixedBottom') isFixedBottom: Boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
