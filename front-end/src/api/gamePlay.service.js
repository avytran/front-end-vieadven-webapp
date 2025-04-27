import { api } from "./index";

const getGamePlay = async (userId, landmarkId) => {
    try {
        const response = await api.get('/gameplay', {
            data: {
                userId,
                landmarkId
            }
        });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

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

export { getGamePlay, getGameplayByUserIdAndProvinceId }