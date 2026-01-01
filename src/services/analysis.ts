import api from "./api";

export const analyzeResumeAPI = async (file: File, jobTitle: string, jobDescription: string) => {
    const formData = new FormData();
    
    formData.append('resume', file); 
    formData.append('jobTitle', jobTitle);
    formData.append('jobDescription', jobDescription);

    // 3. API Call එක සිදුකරන්න
    const response = await api.post('/analysis/analyze', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};