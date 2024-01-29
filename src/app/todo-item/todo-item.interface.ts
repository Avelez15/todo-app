export interface TodoItem {
  title: string;
  updatedTitle?: string;
  completed?: boolean;
  todoId: string | null;
  showUpdate?: boolean;
}
