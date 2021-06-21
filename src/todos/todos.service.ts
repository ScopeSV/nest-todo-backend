import { Injectable } from '@nestjs/common';
import { ITodo } from '../interfaces/todos.interface'

@Injectable()
export class TodosService {
    private idInc = 0
    private todos: ITodo[] = []
    
    create(todo: ITodo) {
        
        this.idInc = this.idInc + 1
        return this.todos.push({
            ...todo,
            completed: false,
            createdAt: new Date(),
            id: this.idInc
        })
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
