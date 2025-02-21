import { EExerciseType, Exercise } from "../models/Exercise";
import { ApiResponse } from "../types";

export const getExercises = async (): Promise<Exercise[]> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/exercise`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${data.message}`);
        }

        const apiResponse: ApiResponse<Exercise[]> = data;
        return apiResponse.data || [];
    } catch (error) {
        console.error('Error fetching exercises:', error);
        throw error;
    }
};

// Retrieve users exercise by given id 
export const getExerciseById = async (id: number): Promise<Exercise> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/exercise/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        console.log(data)
        const apiResponse: ApiResponse<Exercise> = data;

        if (!response.ok) {
            console.log(apiResponse.message);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return apiResponse.data;
    } catch (error) {
        console.error('Error fetching exercises:', error);
        throw error;
    }
};


// Add new exercise to user profile
export const addExercise = async (
        exerciseName: string, 
        exerciseDescription: string,
        exerciseType: EExerciseType
    ): Promise<Exercise> => {

    if (!exerciseName || !exerciseType) {
        throw new Error("Exercise name and type are required!");
    }

    const exerciseTypeKey = Object.keys(EExerciseType)
    .find(key => EExerciseType[key as keyof typeof EExerciseType] === exerciseType);


    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/exercise`, {
            method: "POST",
            credentials: "include",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            exerciseName: exerciseName,
            description: exerciseDescription,
            type: exerciseTypeKey
            })
    });

        const apiResponse: ApiResponse<Exercise> = await response.json();

        if (!response.ok) {
            throw new Error('Failed to create exercise');
        }

        return apiResponse.data;
    } catch (e) {
        console.error('Error adding exercise:', e);
        throw e;
    }
};

// Create an exercise and add it to template using templateExercise
export const AddNewExerciseToTemplate = (
    exerciseName: string, 
    exerciseDescription: string,
    exerciseType: EExerciseType,
    templateId: number
) => {
    
}