import { Component } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.css'],
})
export class ListManagerComponent {
  addItem(title: string) {
    this.todoList.push({ title });
  }

  todoList: TodoItem[] = [];
}
