import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ITodo } from '../../interfaces/todos.interface'

export type TodoDocument = ITodo & Document

@Schema()
export class Todo {
    @Prop()
    todo: string
    
    @Prop()
    belongsTo: string
    
    @Prop()
    completed: boolean
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
