import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
//import { TaskSchema } from './task-status.enum';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
@Module({
  imports: [TypeOrmModule.forFeature([TasksRepository, Task]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}

//imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
