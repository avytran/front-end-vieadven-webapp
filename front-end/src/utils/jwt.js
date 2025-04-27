export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
};

export const setAccessToken = (token) => {
    localStorage.setItem("accessToken", token);
};

export const removeAccessToken = () => {
    localStorage.removeItem("accessToken");
};

export const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
};
