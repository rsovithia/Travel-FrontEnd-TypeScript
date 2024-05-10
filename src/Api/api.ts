// api.ts
import config from "./config";

export const fetchData = async <T>(
  endpoint: string,
  accessToken: string
): Promise<T> => {
  try {
    const response = await fetch(`${config.apiUrl}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Unauthorized or other error");
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}`, error);
    throw error;
  }
};

export default fetchData;
