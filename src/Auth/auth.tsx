// auth.tsx
import config from "../Api/config";

interface User {
  name: string;
  email: string;
}

interface LoginResponse {
  user: User;
  role: string;
  access_token: string;
}

const authenticate = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${config.apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    const data: LoginResponse = await response.json();
    config.setAccessToken(data.access_token);

    localStorage.setItem("name", data.user.name);
    localStorage.setItem("role", data.role);

    return data;
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
};

const logout = (): void => {
  config.setAccessToken(null);
};

const isAuthenticated = (): boolean => {
  return !!config.accessToken;
};

export { authenticate, logout, isAuthenticated };
