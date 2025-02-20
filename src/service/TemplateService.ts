import Template from "../models/Template";

interface ApiResponse<T> {
    data: T,
    message?: string,
    status: number
}

export const fetchTemplates = async (): Promise<Template[]> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/template`, {
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

        const apiResponse: ApiResponse<Template[]> = data;
        return apiResponse.data || [];
    } catch (error) {
        console.error('Error fetching templates:', error);
        throw error;
    }
};

export const fetchTemplateById = async (id: number): Promise<Template> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/template/${id}?includeExercises=true`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        console.log(data)
        const apiResponse: ApiResponse<Template> = data;

        if (!response.ok) {
            console.log(apiResponse.message);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return apiResponse.data;
    } catch (error) {
        console.error('Error fetching templates:', error);
        throw error;
    }
};


export const addTemplate = async (templateName: string, templateDescription: string): Promise<Template> => {
    if (!templateName || !templateDescription) {
        throw new Error("Template name and description are required");
    }
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/template`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                templateName: templateName,
                description: templateDescription
            })
        });

        const apiResponse: ApiResponse<Template> = await response.json();

        if (!response.ok) {
            throw new Error('Failed to create template');
        }

        return apiResponse.data;
    } catch (e) {
        console.error('Error adding template:', e);
        throw e;
    }
};