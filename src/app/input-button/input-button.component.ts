import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-button',
  templateUrl: './input-button.component.html',
  styleUrls: ['./input-button.component.css'],
})
export class InputButtonComponent implements OnInit {
  title = 'Hello World';

  ngOnInit(): void {}

  changeTitle(newTitle: string) {
    this.title = newTitle;
  }

  getInputValue(event: Event) {
    return (event.target as HTMLInputElement).value;
  }
}
