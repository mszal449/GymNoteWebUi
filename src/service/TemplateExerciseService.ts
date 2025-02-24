import { Exercise } from "../models/Exercise";
import { ApiResponse } from "../types";

export const addExerciseToTemplate = async (templateId: number, exerciseId: number, exerciseOrder: number) : Promise<Exercise> => {
    try {     
        const body = {
            templateId,
            exerciseId,
            exerciseOrder
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/template/${templateId}/exercise`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${data.message}`);
        }

        const apiResponse: ApiResponse<Exercise> = data;
        return apiResponse.data || null
   
    } catch (error) {
        console.error('Error fetching templates:', error);
        throw error;
    }
    
}