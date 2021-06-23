import { Inject, Injectable, Scope } from '@nestjs/common';
import { IRequestWithUser, RequestTodo, RequestTodos } from '../interfaces/todos.interface'
import { InjectModel } from '@nestjs/mongoose'
import { Todo, TodoDocument } from './schemas/todo.schema'
import { Model } from 'mongoose'
import { CreateTodoDto } from './dtos/createTodo.dto'
import { REQUEST } from '@nestjs/core'


@Injectable({ scope: Scope.REQUEST})
export class TodosService {
    private userId = this.request.user.uid
    constructor(
        @InjectModel(Todo.name) private todoModel: Model<TodoDocument>, 
        @Inject(REQUEST) private readonly request: IRequestWithUser) {}
    
    async create(createTodoDto: CreateTodoDto): RequestTodo {
        try {
            const createdTodo = new this.todoModel({
                ...createTodoDto,
                belongsTo: this.userId,
                completed: false
            })

            return await createdTodo.save()
        } catch (err) {
            return err
        }
    }
    
    async findAll(): RequestTodos {
        try {
            return await this.todoModel.find(
                { belongsTo: this.userId}
            )
        } catch (err) {
            return err
        }
    }
    
    async find(id: string): RequestTodo {
        try {
            return await this.todoModel.findOne(
                { _id: id, belongsTo: this.userId }
            )
        } catch (err) {
            return err
        }
    }
    
    async complete(id: string): RequestTodo {
        try {
            const todo = await this.find(id)
            const completedTodo = {
                ...todo.toObject(),
                completed: !todo.completed
            }
            
            return await this.todoModel.findOneAndUpdate(
                { _id: id, belongsTo: this.userId},
                completedTodo,
                {new: true }
            )
        } catch (err) {
            return err
        }
    }
    
    async destroy(id: string) {
        try {
            return await this.todoModel.findOneAndDelete(
                { _id: id, belongsTo: this.userId }
            )
        } catch (err) {
            return err
        }
    }
}
