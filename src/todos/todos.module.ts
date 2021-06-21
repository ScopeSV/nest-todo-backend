import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import decodeIDToken from '../config/authenticateToken'

@Module({
    imports: [],
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