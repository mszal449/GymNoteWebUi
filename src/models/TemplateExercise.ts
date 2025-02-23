import { Exercise } from "./Exercise";

export default interface TemplateExercise {
    id: number;
    templateId: number;
    order: number;
    exercise: Exercise;
    createdAt: Date;
  }
  