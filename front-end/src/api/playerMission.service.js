import { api } from "./index";

const getPlayerMission = async (player_id) => {
    try {
        const response = await api.get(`/player-dailymissions/${player_id}/missions`);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

export { getPlayerMission }