import Workout from "../models/Workout";
import { ApiResponse } from "../types";

export const getTemplateWorkouts = async (templateId: number): Promise<Workout[]> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/template/${templateId}/workout`, {
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

        const apiResponse: ApiResponse<Workout[]> = data;
        return apiResponse.data || [];
    } catch (error) {
        console.error('Error fetching workouts:', error);
        throw error;
    }
};

export const startWorkout = async (templateId: number): Promise<Workout> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/template/${templateId}/start`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${data.message}`);
        }

        const apiResponse: ApiResponse<Workout> = data;
        return apiResponse.data;
    } catch (error) {
        console.error('Error starting workout:', error);
        throw error;
    }
};
