import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'

import { TodosController } from './todos.controller'
import { TodosService } from './todos.service'
import { Todo, TodoSchema} from './schemas/todo.schema'
import decodeIDToken from '../config/authenticateToken'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
    imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])],
    controllers: [TodosController],
    providers: [TodosService],
})
// export class TodosModule {}
export class TodosModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(decodeIDToken)
            .forRoutes({ path: 'todos', method: RequestMethod.ALL })
    }
}