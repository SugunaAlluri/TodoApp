import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoInterface } from 'src/app/todos/types/todo.interface';
import { FilterEnum } from 'src/app/todos/types/filter.enum';
import { TodoServiceInterface } from 'src/app/todos/types/todo.service.interface';

@Injectable({
  providedIn: 'root'
})
export class TodosService implements TodoServiceInterface{
  url = 'http://localhost:3000'
  constructor(private httpClient: HttpClient) {}
  
  todos$ = new BehaviorSubject<TodoInterface[]>([])
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all)

  getTodos(): Observable<TodoInterface[]> {
    //return this.httpClient.get('/api/todo') as Observable<TodoInterface[]>
    return this.httpClient.get(this.url) as Observable<TodoInterface[]>
  }

  addTodo(title: string, priority: string): void {

    const newTodo: TodoInterface = {
      title,
      status: false,
      id: Math.random().toString(16),
      dateCreated: new Date().toLocaleString(),
      priority
    };
    const updatesTodos = [...this.todos$.getValue(), newTodo]
    this.todos$.next(updatesTodos)
    // TODO : Include call to BE to fetch values
  }

  toggleAll(status: boolean): void {
    const updatedTodos = this.todos$.getValue().map(todo => {
      return {
        ...todo,
        status
      }
    });
    this.todos$.next(updatedTodos)
  }

  changeFilter(filterName: FilterEnum): void {
    this.filter$.next(filterName)
  }

  editTodo(id: string, title: string, priority: string): void {
    const updatedTodos = this.todos$.getValue().map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          title,
          priority,
        };
      }
      return todo
    });
    this.todos$.next(updatedTodos);
  }

  deleteTodo(id: string): void {
    const updatedTodos = this.todos$
      .getValue()
      .filter((todo) => todo.id != id)
      this.todos$.next(updatedTodos)
  }

  // sets a todo status to Completed
  completeTodo(id: string): void {
    const updatedTodos = this.todos$.getValue().map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          status: !todo.status,
        }
      }
      return todo
    });
    this.todos$.next(updatedTodos)
  }
}
