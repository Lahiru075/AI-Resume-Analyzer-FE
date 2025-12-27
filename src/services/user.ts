import { ref } from "process";
import api from "./api";

export const refreshTokens = async (refreshToken: string) => {
    const res = await api.post("/users/refresh", { refreshToken });
    return res.data;
}