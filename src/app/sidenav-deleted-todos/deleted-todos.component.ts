import { Component, OnInit } from '@angular/core';
import { TodoStoreService } from '../todo-store.service';
@Component({
  selector: 'app-deleted-todos',
  templateUrl: './deleted-todos.component.html',
  styleUrls: ['./deleted-todos.component.css'],
})
export class SidenavDeletedTodosComponent implements OnInit {
  deletedTodoList$ = this.todoStoreService.select(
    (state) => state.deletedTodoList
  );

  constructor(private todoStoreService: TodoStoreService) {}

  ngOnInit(): void {}
}
