import { api } from "./index";

const getPlayerMission = async (userId) => {
    try {
        const response = await api.get('/mission', {
            data: {
                userId
            }
        });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

export { getPlayerMission }