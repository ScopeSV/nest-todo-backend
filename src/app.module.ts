import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsController } from './cats.controller';
import { AppService } from './app.service';
import { AdminController } from "./admin.controller";
import { CatsService } from './cats/cats.service';
import { TodosModule } from './todos/todos.module'
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        TodosModule,
        MongooseModule.forRoot('mongodb+srv://db:pass@cluster0.tmpil.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
    ],
    controllers: [AppController, CatsController, AdminController],
    providers: [AppService, CatsService],
})
export class AppModule {}
/*
export class AppModule implements NestModule {

}
*/
