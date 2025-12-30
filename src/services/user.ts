import api from "./api";

type RegisterType = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const login = async (email: string, password: string) => {
    const res = await api.post("/users/login", { email, password });
    return res.data;
}

export const getMyDetails = async () => {
    const res = await api.get("/users/me");
    return res.data;
}

export const register = async (data: RegisterType) => {
    const res = await api.post("/users/register", data);
    return res.data;
}

export const refreshTokens = async (token: string) => {
    const res = await api.post("/users/refresh", { token });
    return res.data;
}