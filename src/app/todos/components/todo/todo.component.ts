import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { TodoInterface } from 'src/app/todos/types/todo.interface';
import { TodosService } from 'src/app/todos/services/todos.service';


@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html'
})

export class TodoComponent implements OnInit,OnChanges {
  @Input('todo') todoProps: TodoInterface
  @Input('isEditing') isEditingProps: boolean
  @Output('setEditingId') setEditingIdEvent: EventEmitter<
   string | null
  > = new EventEmitter()
  editingText: string = ''
  @ViewChild('textInput') textInput: ElementRef

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.editingText = this.todoProps.text
  }
  
  // To set autofocus while editing todo
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditingProps'].currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus()
      }, 0) 
    }
  }

  setTodoInEditMode(): void {
    this.setEditingIdEvent.emit(this.todoProps.id)
  }

  removeTodo(): void {
    this.todosService.removeTodo(this.todoProps.id)
  }

  toggleTodo(): void {
    this.todosService.toggleTodo(this.todoProps.id)
  }
  
  changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.editingText = value
  }

  //Update Todo text and close editing mode
  changeTodo(): void {
    this.todosService.changeTodo(this.todoProps.id, this.editingText)
    this.setEditingIdEvent.emit(null)
  }
}
