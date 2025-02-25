import Template from "./Template";
import WorkoutExercise from "./WorkoutExercise";

interface Workout {
    id: number;
    template?: Template;
    name: string;
    startTime: string;
    endTime?: string;
    notes?: string;
    workoutExercises: WorkoutExercise[];
  }

export default Workout;
