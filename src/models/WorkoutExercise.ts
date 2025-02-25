import { Exercise } from "./Exercise";
import ExerciseSet from "./ExerciseSet";
import TemplateExercise from "./TemplateExercise";
import Workout from "./Workout";

interface WorkoutExercise {
    id: number;
    workout: Workout;
    exercise: Exercise;
    exerciseOrder: number;
    templateExercise?: TemplateExercise;
    sets: ExerciseSet[];
  }

export default WorkoutExercise;
  