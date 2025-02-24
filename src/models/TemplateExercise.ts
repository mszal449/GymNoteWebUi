import { Exercise } from "./Exercise";

export default interface TemplateExercise {
    id: number;
    templateId: number;
    order: number;
    exerciseOrder: Exercise;
    createdAt: Date;
  }
  