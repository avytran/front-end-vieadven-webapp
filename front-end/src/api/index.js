import axios from "axios";

const ENV = process.env.REACT_APP_ENV.trim() || "development";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

console.log(`Running in ${ENV} mode`);

let api;

if (ENV === 'local'){
    api = {
        get: async (url) => {
            if (url !== ""){
                const mockData = require(`../mocks/data${url}.json`);
                return { data: { data: mockData } };
            }            
            return { data: { data: [] } } 
        },
        post: async (url, payload) => {
            console.log(`POST ${url}`, payload);
            return { data: { message: "Created successfully", data: payload } };
        },
        put: async (url, payload) => {
            console.log(`PUT ${url}`, payload);
            return { data: { message: "Updated successfully", data: payload } }
        },
        delete: async (url) => {
            console.log(`DELETE ${url}`);
            return { data: { message: "Deleted successfully" } }
        }
    }
} else {
    api = axios.create({
        baseURL: API_BASE_URL,
        timeout: 20000,
        headers: {"Content-Type": "application/json"}
    })
}

export { api };