import { Observable } from "rxjs";
import { TodoInterface } from "src/app/todos/types/todo.interface";

export interface TodoServiceInterface {
    getTodos(): Observable<TodoInterface[]>
    addTodo(title: string, priority: string): void
    editTodo(id: string, title: string, priority: string): void 
    deleteTodo(id: string): void 
    completeTodo(id: string): void 
}