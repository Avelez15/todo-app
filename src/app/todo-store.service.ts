import { Injectable } from '@angular/core';
import { TodoItem } from './todo-item.interface';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';

export interface AppState {
  todoList: TodoItem[];
  deletedTodoList: TodoItem[];
  currentTodoId: string | null;
}

export const initialState: AppState = {
  todoList: [],
  deletedTodoList: [],
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
    console.log('todoState:', todoState);

    const deletedTodoState = localStorage.getItem('deletedTodoState');
    console.log('deletedTodoState:', deletedTodoState);

    if (todoState) {
      const todoStateJson = JSON.parse(todoState);
      this.setState(todoStateJson);
    }

    if (deletedTodoState !== null && deletedTodoState !== undefined) {
      try {
        const deletedTodoStateJson = JSON.parse(deletedTodoState);
        this.setState((state) => ({
          ...state,
          deletedTodoList: deletedTodoStateJson,
        }));
      } catch (error) {
        console.error('Error parsing deletedTodoStateJSON', error);
      }
    }

    this.state$.subscribe((value) => {
      localStorage.setItem('todoState', JSON.stringify(value));
      localStorage.setItem(
        'deletedTodoState',
        JSON.stringify(value.deletedTodoList)
      );
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
    const deletedTodo = state.todoList.find((todo) => todo.todoId === todoId);

    if (deletedTodo) {
      return {
        ...state,
        todoList: state.todoList.filter((todo) => todo.todoId !== todoId),
        deletedTodoList: [...state.deletedTodoList, deletedTodo],
      };
    }
    return state;
  });

  todo$ = this.select((state) => state.todoList);
  deletedTodos$ = this.select((state) => state.deletedTodoList);

  currentTodoId$ = this.select((state) => state.currentTodoId);
  currentTodo$ = this.select(
    this.todo$,
    this.currentTodoId$,
    (todoList, currentTodoId) =>
      todoList.find((todo) => todo.todoId === currentTodoId)
  );
}
