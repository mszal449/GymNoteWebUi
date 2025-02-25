import WorkoutExercise from "./WorkoutExercise";

interface ExerciseSet {
    id: number;
    workoutExercise: WorkoutExercise;
    setNumber: number;
    reps?: number;
    weight?: number;       // in kg
    duration?: number;     // in seconds
    distance?: number;     // in meters
    notes?: string;
    setOrder: number;      // Min value of 0
  }

export default ExerciseSet;