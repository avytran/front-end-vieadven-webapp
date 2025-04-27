import { api } from "./index";

const getPlayerItem = async (playerId) => {
    try {
        const response = await api.get(`/player-item/${playerId}/items`);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

export { getPlayerItem }