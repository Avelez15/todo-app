import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-button',
  templateUrl: './input-button.component.html',
  styleUrls: ['./input-button.component.css'],
})
export class InputButtonComponent implements OnInit {
  title = 'Hello World';

  ngOnInit(): void {}

  submitValue(newTitle: string): void {
    this.title = newTitle;
    this.submit.emit(newTitle);
  }

  getInputValue(event: Event) {
    return (event.target as HTMLInputElement).value;
  }

  @Output() submit: EventEmitter<String> = new EventEmitter<String>();
}
