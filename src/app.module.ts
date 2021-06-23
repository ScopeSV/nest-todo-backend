import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module'
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        TodosModule,
        MongooseModule.forRoot('mongodb+srv://db:pass@cluster0.tmpil.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
