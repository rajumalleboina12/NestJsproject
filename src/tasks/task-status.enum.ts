// export class Task {
//   id: string;
//   title: string;
//   description: string;
//   status: TaskStatus;
// }
// import * as mongoose from 'mongoose';

// export const TaskSchema = new mongoose.Schema({
//   title: { type: String, required: true },

//   description: { type: String, required: true },
// });

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'FINISHED',
}
