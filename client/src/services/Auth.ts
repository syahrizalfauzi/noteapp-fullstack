import api from "./Api";

type AuthToken = string;

interface AuthReponse {
  error: boolean;
  message: string;
  token?: AuthToken;
}

export const login = async (
  username: string,
  password: string
): Promise<AuthReponse> => {
  try {
    const response = await api.post("/user/login", {
      username,
      password,
    });
    console.log("login", response.data);
    return response.data;
  } catch ({ response }) {
    if (response.data.message) return response.data;
    return { error: true, message: "No respond from server" };
  }
};

export const register = async (
  username: string,
  password: string
): Promise<AuthReponse> => {
  try {
    const response = await api.post("/user/register", {
      username,
      password,
      name: username,
    });
    return response.data;
  } catch ({ response }) {
    if (response.data.message) return response.data;
    return { error: true, message: "No respond from server" };
  }
};
