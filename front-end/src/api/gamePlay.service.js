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

export { getGamePlay }