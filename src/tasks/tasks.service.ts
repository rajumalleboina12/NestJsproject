import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task/task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './task/dto/create-task.dto';
import { GetTasksFilterDto } from './task/get-tasks-filter.dto/get-tasks-filter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isWeakMap } from 'util/types';
@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}
  private tasks: Task[] = [];
  async insertTask(title: string, description: string, status: TaskStatus) {
    const newTask = new this.taskModel({
      title,
      description,
      status,
    });
    const result = await newTask.save();
    //console.log(result);
    return result.id;
  }
  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.taskModel.find().exec();
    return tasks;
  }
  // getTaskWithFilters(filterdto: GetTasksFilterDto): Task[] {
  //   const { search, status } = filterdto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //     return tasks;
  //   }
  // }
  async getTaskById(taskId: string) {
    // const found = this.tasks.find((task) => task.id === id);
    // if (!found) {
    //   throw new NotFoundException(`Task with ID ${id} is not found`);
    // }
    // return found;
    const task = await this.findTask(taskId);
    // return {
    //   id: task.id,
    //   title: task.title,
    //   description: task.description,
    //   status: task.status,
    // };
    return task;
  }

  private async findTask(id: string): Promise<Task> {
    //const task = await this.taskModel.findById(id);
    let task;
    try {
      task = await this.taskModel.findById(id);
    } catch (error) {
      throw new NotFoundException('could not find task');
    }
    if (!task) {
      throw new NotFoundException('could not find product');
    }
    return task;
  }
  // deleteTaskById(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id != found.id);
  // }
  // updateTaskById(id: string, status: TaskStatus): Task {
  //   const tasks = this.getTaskById(id);
  //   tasks.status = status;
  //   return tasks;
  // }
  async deleteTaskById(taskId: string) {
    const result = await this.taskModel.deleteOne({ _id: taskId }).exec();
    console.log(result);
  }

  async updateTaskById(
    taskId: string,
    title: string,
    description: string,
    status: TaskStatus,
  ) {
    const updatedTask = await this.findTasks(taskId);
    if (title) {
      updatedTask.title = title;
    }
    if (description) {
      updatedTask.description = description;
    }
    if (status) {
      updatedTask.status = status;
    }
    updatedTask.save();
  }
  private async findTasks(id: string): Promise<Task> {
    let task;
    try {
      task = await this.taskModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('could not find product');
    }
    if (!task) {
      throw new NotFoundException('could not find product');
    }
    return task;
  }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
}
