import { Request } from 'express'
import firebase from 'firebase/app'

export interface ITodo {
    id: number
    todo: string
    belongsTo: string
    completed: boolean
    createdAt: Date
    toObject?: () => Record<string, unknown>
}

export interface IRequestWithUser extends Request {
    user: firebase.User
}

export type RequestTodo = Promise<ITodo>
export type RequestTodos = Promise<ITodo[]>