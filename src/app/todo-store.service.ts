import { Injectable } from '@angular/core';
import { TodoItem } from './todo-item.interface';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';

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
export class TodoStoreService
  extends ComponentStore<AppState>
  implements OnStoreInit
{
  constructor() {
    super(initialState);
  }

  ngrxOnStoreInit() {
    const todoState = localStorage.getItem('todoState');
    if (todoState) {
      const todoStateJson = JSON.parse(todoState);
      this.setState(todoStateJson);
    }
    this.state$.subscribe((value) => {
      localStorage.setItem('todoState', JSON.stringify(value));
      console.log(value);
    });
  }

  addItem(todoItem: TodoItem): void {
    this.setState((state) => {
      const updatedState = {
        ...state,
        todoList: [...state.todoList, todoItem],
      };
      return updatedState;
    });
  }

  updateTodo = this.updater((state: AppState, todoItem: TodoItem) => {
    const updatedState = {
      ...state,
      todoList: state.todoList.map((todo) =>
        todoItem.todoId === todo.todoId ? todoItem : todo
      ),
    };
    return updatedState;
  });

  deleteTodo = this.updater((state: AppState, todoId: string) => {
    const updatedState = {
      ...state,
      todoList: state.todoList.filter((todo) => todo.todoId !== todoId),
    };
    return updatedState;
  });

  todo$ = this.select((state) => state.todoList);

  currentTodoId$ = this.select((state) => state.currentTodoId);
  currentTodo$ = this.select(
    this.todo$,
    this.currentTodoId$,
    (todoList, currentTodoId) =>
      todoList.find((todo) => todo.todoId === currentTodoId)
  );
}
