import { Component } from '@angular/core';
import { TodoItem } from '../todo-item/todo-item.interface';
import { StoreServiceService } from '../store-service.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.css'],
  animations: [
    trigger('cardAnimation', [
      state('void', style({ opacity: 0 })),
      transition(':enter,:leave', [animate('0.5s')]),
    ]),
  ],
  providers: [StoreServiceService],
})
export class ListManagerComponent {
  constructor(private storeService: StoreServiceService) {}

  todoList$ = this.storeService.todoList$;
  currentItem$ = this.storeService.todoList$;
  newTodoTitle = '';

  toggleUpdate(todo: TodoItem) {
    todo.showUpdate = !todo.showUpdate;
  }

  addItem() {
    const todoId = Math.ceil(Math.random() * 100).toString();

    const newTodo: TodoItem = {
      title: this.newTodoTitle,
      todoId,
    };

    this.storeService.addItem(newTodo);

    this.newTodoTitle = '';
  }

  onDelete(todoId: string) {
    this.storeService.deleteTodo(todoId);
  }
  submitUpdatedTodo(todo: TodoItem) {
    const updatedTitle = todo.updatedTitle || todo.title;

    const updatedTodo: TodoItem = {
      ...todo,
      title: updatedTitle,
      showUpdate: false,
    };

    this.storeService.updateTodo(updatedTodo);
  }

  completeTodo(todoItem: TodoItem) {
    const updatedTodo: TodoItem = {
      ...todoItem,
      completed: !todoItem.completed,
    };

    this.storeService.updateTodo(updatedTodo);
  }
}
