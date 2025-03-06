import ExerciseSetDTO from "../models/ExerciseSetDTO";
import CreateExerciseSetRequest from "../models/exerciseSet/CreateExerciseSetRequest";
import { ApiResponse } from "../types";

export const createExerciseSet = async (
    workoutId: number,
    exerciseId: number,
    set: CreateExerciseSetRequest
): Promise<ExerciseSetDTO> => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/workout/${workoutId}/exercise/${exerciseId}/set`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(set)
            }
        );

        const data = await response.json();
        if (!response.ok) throw new Error(`HTTP error! status: ${data.message}`);

        const apiResponse: ApiResponse<ExerciseSetDTO> = data;
        return apiResponse.data;
    } catch (error) {
        console.error('Error creating exercise set:', error);
        throw error;
    }
};

export const updateExerciseSet = async (
    workoutId: number,
    exerciseId: number,
    setId: number,
    set: Partial<CreateExerciseSetRequest>
): Promise<ExerciseSetDTO> => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/workout/${workoutId}/exercise/${exerciseId}/set/${setId}`,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(set)
            }
        );

        const data = await response.json();
        if (!response.ok) throw new Error(`HTTP error! status: ${data.message}`);

        const apiResponse: ApiResponse<ExerciseSetDTO> = data;
        return apiResponse.data;
    } catch (error) {
        console.error('Error updating exercise set:', error);
        throw error;
    }
};

export const deleteExerciseSet = async (
    workoutId: number,
    exerciseId: number,
    setId: number
): Promise<void> => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/workout/${workoutId}/exercise/${exerciseId}/set/${setId}`,
            {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const data = await response.json();
        if (!response.ok) throw new Error(`HTTP error! status: ${data.message}`);
    } catch (error) {
        console.error('Error deleting exercise set:', error);
        throw error;
    }
};
