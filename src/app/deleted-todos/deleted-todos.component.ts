import { Component } from '@angular/core';
import { TodoStoreService } from '../todo-store.service';

@Component({
  selector: 'app-deleted-todos',
  templateUrl: './deleted-todos.component.html',
  styleUrls: ['./deleted-todos.component.css'],
})
export class DeletedTodosComponent {
  deletedTodoList$ = this.store.select((state) => state.deletedTodoList);

  constructor(public store: TodoStoreService) {}

  openDeletedTodoList() {}
}
