import api from "./api";

export const getFeaturedGuides = async () => {
    const response = await api.get("/guide/featured");

    return response.data;
};