import { api } from "./index";

const getGameplayByUserIdAndProvinceId = async (province_id, user_id) => {
    try {
        console.log(`/gameplays/${province_id}/user/${user_id}`);
        
        const response = await api.get(`/gameplays/${province_id.trim()}/user/${user_id}`)
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

const updateGamePlay = async (player_id, landmark_id, score) => {
    try {
        const response = await api.post(`/gameplays/update`, {
            player_id, landmark_id, score
        });
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

export { getGameplayByUserIdAndProvinceId, updateGamePlay }