import { api } from "./index";

const getAllProvincesOfAPlayer = async (player_id) => {
    try {
        const response = await api.get(`/province-progress/${player_id}/provinces`);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

const getPlayerProvinceProgress = async (player_id, province_id) => {
    try {
        const response = await api.get(`/province-progress/${player_id}/provinces/${province_id}`);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

export { getAllProvincesOfAPlayer, getPlayerProvinceProgress }