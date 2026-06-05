import axios from "axios";


const API = axios.create({

    baseURL: "https://hiremind-ai-3j1y.onrender.com",

});


// =========================
// SIGNUP USER
// =========================
export const signupUser = async (userData: {

    full_name: string;
    email: string;
    password: string;

}) => {

    const response = await API.post(
        "/auth/signup",
        userData
    );

    return response.data;
};



// =========================
// LOGIN USER
// =========================
export const loginUser = async (userData: {

    email: string;
    password: string;

}) => {

    const response = await API.post(
        "/auth/login",
        userData
    );

    return response.data;
};