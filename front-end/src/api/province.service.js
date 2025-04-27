import { api } from "./index";

const getProvinceById = async (provinceId) => {
    try {
        const response = await api.get(`/province/${provinceId}`);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

const getAllowedProvinces = async (player_id) => {
    try {
        const response = await api.get(`/provinces/${player_id}/allowed`);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

export { getProvinceById, getAllowedProvinces, }