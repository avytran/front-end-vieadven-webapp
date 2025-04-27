import { api } from "./index";

const getQuestionsAnswer = async (landmark_id) => {
    try {
        const response = await api.get(`/question-answer/${landmark_id}/questions`);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

export { getQuestionsAnswer }