import { Body, Controller, Delete, Get, Param, Post, Put, Headers, Req } from "@nestjs/common";
import { TodosService } from './todos.service'
import { CreateTodoDto } from './dtos/createTodo.dto'
import { ITodo } from '../interfaces/todos.interface'

@Controller('todos')
export class TodosController {
    constructor(private todosService: TodosService) {}
    
    @Get()
    async findAll() {
        try {
            return await this.todosService.findAll()
        } catch (err) {
            return err
        }
    }
    
    @Get(':id')
    async findOne(@Param() params: { id: string }) {
        try {
            return this.todosService.find(params.id)
        } catch (err) {
            return err
        }
    }
    
    @Post()
    async create(@Body() createTodoDto: CreateTodoDto & ITodo) {
        try {
            return await this.todosService.create(createTodoDto)
        } catch (err) {
            return err
        }
    }
    @Put(':id')
    async complete(@Param() params) {
        try {
            return await this.todosService.complete(params.id)
        } catch (err) {
            return err
        }
    }
    @Delete(':id')
    async destroy(@Param() params) {
        try {
            return await this.todosService.destroy(params.id)
        } catch (err) {
            return err
        }
    }
}
