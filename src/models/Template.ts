import TemplateExercise from "./TemplateExercise";

export default interface Template {
  id: number;
  userId: number;
  name: string;
  description: string;
  createdAt: string;
  exercises: TemplateExercise[];
}
