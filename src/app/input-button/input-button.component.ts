import { Component } from '@angular/core';

@Component({
  selector: 'app-input-button',
  templateUrl: './input-button.component.html',
  styleUrls: ['./input-button.component.css'],
})
export class InputButtonComponent {
  title = 'Learn about components';

  constructor() {
    this.changeTitle('todo app');
  }

  changeTitle(newTitle: string) {
    this.title = newTitle;
  }
}
