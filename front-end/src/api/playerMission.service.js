import { api } from "./index";

const getPlayerMissions = async (userId) => {
    try {
        const response = await api.get('/player-dailymissions', {
            params: {
                userId: userId
            }
        });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

export { getPlayerMissions }