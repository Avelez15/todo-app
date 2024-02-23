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
    try {
      if (todoState) {
        const todoStateJson = JSON.parse(todoState);
        this.setState(todoStateJson);
      }
    } catch (e) {
      console.error('Error parsing todoState', e);
      alert("Something went wrong... couldn't load previous saved data!");
      localStorage.removeItem('todoState');
    }
    try {
      if (todoState) {
        const todoStateJson = JSON.parse(todoState);
        const deletedTodoList = Array.isArray(todoStateJson.deletedTodoList)
          ? todoStateJson.deletedTodoList
          : [];
        this.setState({ ...todoStateJson, deletedTodoList });
      }
    } catch (e) {
      console.error('Error parsing todoState', e);
      alert("Something went wrong... couldn't load previous saved data!");
      localStorage.removeItem('todoState');
    }

    this.state$.subscribe((value) => {
      localStorage.setItem('todoState', JSON.stringify(value));
      localStorage.setItem(
        'deletedTodoState',
        JSON.stringify(value.deletedTodoList)
      );
      console.log('deletedTodoList:', value.deletedTodoList);
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
