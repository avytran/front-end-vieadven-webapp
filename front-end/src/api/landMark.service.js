import { api } from "./index";

const getLandMarks = async (provinceId) => {
    try {
        const response = await api.get(`/landmarks/province/${provinceId}`);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

export { getLandMarks }