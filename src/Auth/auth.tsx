import config from "../Api/config";

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  role: number;
  avatar: string;
  phone: string | null;
  is_active: number;
  creator_id: number | null;
  updater_id: number | null;
  deleter_id: number | null;
}

interface LoginResponse {
  message: string;
  success: boolean;
  user: User;
  access_token: string;
  role: string;
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
      const errorText = await response.text();
      throw new Error(`Authentication failed: ${errorText}`);
    }

    const data: LoginResponse = await response.json();
    config.setAccessToken(data.access_token);

    localStorage.setItem("id", data.user.id.toString());
    localStorage.setItem("name", data.user.name);
    localStorage.setItem("email", data.user.email);
    localStorage.setItem(
      "email_verified_at",
      data.user.email_verified_at || ""
    );
    localStorage.setItem("created_at", data.user.created_at);
    localStorage.setItem("updated_at", data.user.updated_at);
    localStorage.setItem("role", data.role);
    localStorage.setItem("avatar", data.user.avatar);
    localStorage.setItem("phone", data.user.phone || "");
    localStorage.setItem("is_active", data.user.is_active.toString());
    localStorage.setItem("creator_id", data.user.creator_id?.toString() || "");
    localStorage.setItem("updater_id", data.user.updater_id?.toString() || "");

    return data;
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
};

const logout = (): void => {
  config.setAccessToken(null);
  localStorage.clear();
};

const isAuthenticated = (): boolean => {
  const token = config.accessToken;
  return !!token;
};

const isAdmin = (): boolean => {
  const role = localStorage.getItem("role");
  return role === "admin";
};

export { authenticate, logout, isAuthenticated, isAdmin };
