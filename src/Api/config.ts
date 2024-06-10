const config = {
  apiUrl: "https://smart-voyage-recommendation.onrender.com/api",
  fileUrl: "https://smart-voyage-recommendation.onrender.com/",
  accessToken: localStorage.getItem("accessToken") || null,
  googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Add your valid API key here

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
