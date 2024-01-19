import { Component, Inject } from '@angular/core';
import { InputButtonComponent } from '../input-button/input-button.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    @Inject(InputButtonComponent)
    private inputButtonComponent: InputButtonComponent
  ) {}

  addTask() {
    console.log('addTask works!');
  }
}
