import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsController } from './cats.controller';
import { AppService } from './app.service';
import { AdminController } from "./admin.controller";
import { CatsService } from './cats/cats.service';
import { TodosModule } from './todos/todos.module'
import decodeIDToken from './config/authenticateToken'

@Module({
    imports: [TodosModule],
    controllers: [AppController, CatsController, AdminController],
    providers: [AppService, CatsService],
})
export class AppModule {}
/*
export class AppModule implements NestModule {

}
*/
