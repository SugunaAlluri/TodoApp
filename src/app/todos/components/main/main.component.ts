import { Component } from '@angular/core';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { TodosService } from 'src/app/todos/services/todos.service';
import { TodoInterface } from 'src/app/todos/types/todo.interface';
import { FilterEnum } from 'src/app/todos/types/filter.enum';

@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html'
})
export class MainComponent {
  visibleTodos$: Observable<TodoInterface[]>;
  noTodoClass$: Observable<boolean>
  isAllTodosSelected$: Observable<boolean>
  editingId: string | null = null

  constructor(private todosService: TodosService) {

    this.isAllTodosSelected$ = this.todosService.todos$.pipe(
      map((todos) => todos.every((todo) => todo.status))
    );

    this.noTodoClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );

    this.visibleTodos$ = combineLatest([
       this.todosService.todos$,
       this.todosService.filter$]
    ).pipe(map(([todos,filter]) => {
       if (filter === FilterEnum.active) {
         return todos.filter(todo => !todo.status)
       } else if (filter === FilterEnum.completed) {
        return todos.filter(todo => todo.status)
       }
       return todos;
      })
    );
  }

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement
    this.todosService.toggleAll(target.checked)
  }

  setEditingId(editingId: string | null): void {
    this.editingId = editingId
  }
}
