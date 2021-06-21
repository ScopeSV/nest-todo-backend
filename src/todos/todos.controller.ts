import { Body, Controller, Delete, Get, Param, Post, Put, Headers, Req } from "@nestjs/common";
import { TodosService } from './todos.service'
import { CreateTodoDto } from './dtos/createTodo.dto'
import { ITodo } from '../interfaces/todos.interface'

@Controller('todos')
export class TodosController {
    constructor(private todosService: TodosService) {}
    
    @Get()
    findAll() {
        return this.todosService.findAll()
    }
    @Get(':id')
    findOne(@Param() params: { id: number }) {
        return this.todosService.find(Number(params.id))
    }
    @Post()
    create(@Body() createTodoDto: CreateTodoDto & ITodo) {
        return this.todosService.create(createTodoDto)
    }
    @Put(':id')
    complete(@Param() params) {
        this.todosService.complete(Number(params.id))
    }
    @Delete(':id')
    destroy(@Param() params) {
        this.todosService.destroy(Number(params.id))
    }
}
