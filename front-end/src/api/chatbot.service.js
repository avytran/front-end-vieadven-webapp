import { api } from "./index";

const requestChatbot = async (message) => {
    try {
        const response = await api.post('/chatbot',
            {
                message: message
            }
        );
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

export { requestChatbot }