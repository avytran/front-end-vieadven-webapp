import { api } from "./index";

const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const token = response.data.accessToken;
    return token;
  } catch (error) {
    console.error("Login failed:", error);
    throw error; 
  }
};

const register = async ({ name, email, password }) => {
  try {
    console.log(name, email, password);
    
    const response = await api.post("/auth/register", { 
      name, email, password
    });
    const token = response.data.accessToken;
    return token;
  } catch (error) {
    console.error("Register failed:", error);
    throw error; 
  }
};


export { loginUser, register };