import { api } from "./index";

const getLandMarks = async (provinceId) => {
    try {
        const response = await api.get(`/landmark/${provinceId}`);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

export { getLandMarks }