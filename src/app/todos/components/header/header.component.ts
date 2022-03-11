import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/todos/services/todos.service';

@Component({
  selector: 'app-todos-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  title: string = '';
  priority: string = 'low'

  constructor(private todosService: TodosService) {}

  changeTitle(event: Event): void {
    const target = event.target as HTMLInputElement
    this.title = target.value
  }

  selectPriority(event: Event): void {
    const target = event.target as HTMLInputElement
    this.priority = target.value
  }

  addTodo(): void {
    this.todosService.addTodo(this.title, this.priority)
    this.title = ''
  }
}
