import TemplateExercise from "./TemplateExercise";

export default interface Template {
  id: number;
  userId: number;
  templateName: string;
  description: string;
  createdAt: string;
  templateExercises: TemplateExercise[];
}
