import api from "./api";

export const analyzeResumeAPI = async (file: File, jobTitle: string, jobDescription: string) => {
    const formData = new FormData();
    
    formData.append('resume', file); 
    formData.append('jobTitle', jobTitle);
    formData.append('jobDescription', jobDescription);

    const response = await api.post('/analysis/analyze', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

export const getUserHistoryAPI = async () => {
    const response = await api.get('/analysis/history');
    console.log(response)
    return response.data;
};