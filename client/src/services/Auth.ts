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
  let timer = setTimeout(() => {
    throw new Error();
  }, 5000);
  try {
    const response = await api.post("/user/login", {
      username,
      password,
    });
    clearTimeout(timer);
    return response.data;
  } catch ({ response }) {
    clearTimeout(timer);
    if (response) return response.data;
    return { error: true, message: "No respond from server" };
  }
};

export const register = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  let timer = setTimeout(() => {
    throw new Error();
  }, 5000);
  try {
    const response = await api.post("/user/register", {
      username,
      password,
    });
    clearTimeout(timer);
    return response.data;
  } catch ({ response }) {
    clearTimeout(timer);
    if (response) return response.data;
    return { error: true, message: "No respond from server" };
  }
};

export const resetPassword = async (
  newPassword: string,
  token: string
): Promise<AuthResponse> => {
  let timer = setTimeout(() => {
    throw new Error();
  }, 5000);
  try {
    const response = await api.post(
      "/user/changepassword",
      {
        newPassword,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    clearTimeout(timer);
    return response.data;
  } catch ({ response }) {
    clearTimeout(timer);
    if (response) return response.data;
    return { error: true, message: "No respond from server" };
  }
};

// export const sendReset = async () => {
//   try {
//     let timer = setTimeout(() => {
//       throw new Error();
//     }, 5000);
//     await api.get("/user/resetemail");
//     clearTimeout(timer);
//     return "success";
//   } catch ({ response }) {
//     return "error";
//   }
// };
