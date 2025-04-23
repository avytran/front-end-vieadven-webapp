import { api } from "./index";

const getPlayerItem = async (itemId, playerId) => {
    try {
        const response = await api.get('/item', {
            data: {
                itemId: itemId,
                playerId: playerId
            }
        });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

export { getPlayerItem }