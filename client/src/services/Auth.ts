import api from "./Api";

type AuthToken = string;

interface AuthResponse {
  error: boolean;
  message: string;
  token?: AuthToken;
  username?: string;
}

export const login = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await api.post("/user/login", {
      username,
      password,
    });

    return response.data;
  } catch ({ response }) {
    if (response.data.message) return response.data;
    return { error: true, message: "No respond from server" };
  }
};

export const register = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await api.post("/user/register", {
      username,
      password,
    });
    return response.data;
  } catch ({ response }) {
    if (response.data.message) return response.data;
    return { error: true, message: "No respond from server" };
  }
};
