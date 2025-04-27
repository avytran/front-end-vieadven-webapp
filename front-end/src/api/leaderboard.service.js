import { api } from "./index";

const getTop10 = async () => {
    try {
        const response = await api.get('/leaderboards/top-10');
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

const getRankById = async (player_id) => {
    try {
        const response = await api.get(`/leaderboards/${player_id}`);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

export { getTop10, getRankById }