import { api } from "./index";

const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const token = response.data;
    return token;
  } catch (error) {
    console.error("Login failed:", error);
    throw error; 
  }
};

const userRegister = async ({ name, email, password }) => {
  try {
    const response = await api.post("/auth/register", { 
      name, email, password
    });
    const token = response.data;
    return token;
  } catch (error) {
    console.error("Register failed:", error);
    throw error; 
  }
};


export { loginUser, userRegister };