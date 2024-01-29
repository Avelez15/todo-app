import { Injectable } from '@angular/core';
import { TodoItem } from './todo-item/todo-item.interface';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';

export interface AppState {
  todoList: TodoItem[];
  currentTodoId: string | null;
}

export const initialState: AppState = {
  todoList: [],
  currentTodoId: null,
};

@Injectable({
  providedIn: 'root',
})
export class StoreServiceService extends ComponentStore<AppState> {
  constructor() {
    super(initialState);
  }

  addItem(todoItem: TodoItem) {
    this.setState((state) => {
      return {
        ...state,
        todoList: [...state.todoList, todoItem],
      };
    });
  }

  updateTodo = this.updater((state: AppState, todoItem: TodoItem) => {
    return {
      ...state,
      todoList: state.todoList.map((todo) => {
        if (todoItem.todoId === todo.todoId) {
          return todoItem;
        }

        return todo;
      }),
    };
  });

  deleteTodo = this.updater((state: AppState, todoId: string) => {
    return {
      ...state,
      todoList: state.todoList.filter((todo) => todo.todoId !== todoId),
    };
  });

  todoList$: Observable<TodoItem[]> = this.select((state) => state.todoList);
  todo$ = this.select((state) => state.todoList);
  currentTodoId$ = this.select((state) => state.currentTodoId);
  currentTodo$ = this.select(
    this.todo$,
    this.currentTodoId$,
    (todoList, currentTodoId) => {
      todoList.find((todo) => todo.todoId === currentTodoId);
    }
  );
}
