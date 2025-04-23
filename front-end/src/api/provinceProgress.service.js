import { api } from "./index";

const getProvinceProgress = async (provinceId, playerId) => {
    try {
        const response = await api.get('/province', {
            data: {
                provinceId: provinceId,
                playerId: playerId
            }
        });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

export { getProvinceProgress }