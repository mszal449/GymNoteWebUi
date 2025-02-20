export interface Exercise {
    id: number;
    userId: number;
    exerciseName: string;
    type: EExerciseType;
    description?: string;
    orderIndex?: number;
}

export enum EExerciseType {
    REPS = "Repetitions",
    DURATION = "Duration",
    DISTANCE = "Distance"
}
