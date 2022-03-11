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
  editingTitle: string = ''
  @ViewChild('titleInput') titleInput: ElementRef
  editingPriority: string = ''
  @ViewChild('priorityInput') priorityInput: ElementRef

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.editingTitle = this.todoProps.title
    this.editingPriority = this.todoProps.priority
  }
  
  // To set autofocus while editing todo
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditingProps'].currentValue) {
      setTimeout(() => {
        this.titleInput.nativeElement.focus()
      }, 0) 
    }
  }

  setTodoInEditMode(): void {
    this.setEditingIdEvent.emit(this.todoProps.id)
  }

  deleteTodo(): void {
    this.todosService.deleteTodo(this.todoProps.id)
  }

  completeTodo(): void {
    this.todosService.completeTodo(this.todoProps.id)
  }
  
  changeTitle(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.editingTitle = value
  }

  changePriority(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.editingPriority = value
  }

  //Update Todo title and close editing mode
  editTodo(): void {
    this.todosService.editTodo(this.todoProps.id, this.editingTitle, this.editingPriority)
    this.setEditingIdEvent.emit(null)
  }
}
