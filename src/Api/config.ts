const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  fileUrl: import.meta.env.VITE_FILE_URL,
  accessToken: localStorage.getItem("accessToken") || null,
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,

  setAccessToken: (token: string | null) => {
    config.accessToken = token;
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
      console.log(config.apiUrl);
    }
  },
};

export default config;
