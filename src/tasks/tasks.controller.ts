import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task/task.model';
import { CreateTaskDto } from './task/dto/create-task.dto';
//import { get } from 'http';
//import { GetTasksFilterDto } from './task/get-tasks-filter.dto/get-tasks-filter.dto';
//import { UpdateTaskStatusDto } from './task/dto/update-task-status.dto/update-task-status.dto';
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Post()
  async addTask(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('status') status: TaskStatus,
    //@Body('status')status:TaskStatus
  ) {
    const generateId = await this.tasksService.insertTask(
      title,
      description,
      status,
    );
    return { id: generateId };
  }

  // @Get()
  // getTasks(@Query() filterdto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterdto).length) {
  //     return this.tasksService.getTaskWithFilters(filterdto);
  //   } else {
  //     //return this.tasksService.getAllTasks();
  //   }
  // }
  @Get()
  async getAllTasks() {
    const tasks = await this.tasksService.getAllTasks();
    return tasks;
  }
  // @Post()
  // async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task[]> {
  //   const task = await this.tasksService.createTask(createTaskDto);
  //   return task;
  // }
  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    const task = await this.tasksService.getTaskById(id);
    return task;
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id') taskId: string) {
    await this.tasksService.deleteTaskById(taskId);
    return null;
  }
  @Patch('/:id')
  async updateTaskById(
    @Param('id') taskId: string,
    @Body('title') taskTitle: string,
    @Body('description') taskdesc: string,
    @Body('status') taskstatus: TaskStatus,
  ) {
    await this.tasksService.updateTaskById(
      taskId,
      taskTitle,
      taskdesc,
      taskstatus,
    );
    return null;
  }
}
