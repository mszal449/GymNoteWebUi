import { Exercise } from "./Exercise";

export default interface TemplateExercise {
    id: number;
    templateId: number;
    order: number;
    exerciseOrder: number;
    exercise: Exercise
    createdAt: Date;
  }
  