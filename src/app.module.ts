import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';

import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://raju:1185@cluster0.bft6drf.mongodb.net/demo?retryWrites=true&w=majority',
      useUnifiedTopology: true,
      useNewUrlParser: true,
      j: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// useNewUrlParser: true,
//       synchronize: true,
//       logging: true,
//       entities: ['src/entities/*.*'],

// MongooseModule.forRoot(
//   'mongodb+srv://raju:1185@cluster0.bft6drf.mongodb.net/demo?retryWrites=true&w=majority',
// ),

// TypeOrmModule.forRoot({
//   type: 'mongodb',
//   host: '@cluster0.bft6drf.mongodb.net/demo?retryWrites=true&w=majority',
//   port: 27017,
//   username: 'raju',
//   password: '1185',
//   database: 'demo',
//   useNewUrlParser: true,
//   synchronize: true,
//   logging: true,
//   entities: ['src/tasks/task.entity.ts/*.*'],
// }),
