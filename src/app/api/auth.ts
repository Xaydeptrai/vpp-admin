const API_BASE_URL = "https://vpp-server-production.up.railway.app/api/v1";

export interface LoginResponse {
  isSuccess: boolean;
  result?: { token: string };
  message?: string;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error("Lỗi kết nối đến server");
  }
};
