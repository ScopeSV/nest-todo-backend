import { Injectable } from '@nestjs/common';
import { ITodo } from '../interfaces/todos.interface'
import { InjectModel } from '@nestjs/mongoose'
import { Todo, TodoDocument } from './schemas/todo.schema'
import { Model } from 'mongoose'
import { CreateCatDto } from '../create-cat.dto'
import { CreateTodoDto } from './dtos/createTodo.dto'

@Injectable()
export class TodosService {
    constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}
    private idInc = 0
    private todos: ITodo[] = []
    
    
    create(createTodoDto: CreateTodoDto) {
        const createdTodo = new this.todoModel(createTodoDto)
        return createdTodo.save()
    }
    
    findAll() {
        return this.todos
    }
    
    find(id: number) {
        return this.todos.find((todo) => todo.id === id)
    }
    
    complete(id: number) {
        this.todos.map((storedTodo) => {
            if (storedTodo.id === id) {
                storedTodo.completed = !storedTodo.completed
            }
            return storedTodo
        })
    }
    
    destroy(id: number) {
        return this.todos = this.todos.filter((todo) => id !== todo.id)
    }
}
