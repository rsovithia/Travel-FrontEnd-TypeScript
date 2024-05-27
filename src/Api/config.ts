// config.js

const config = {
  apiUrl: "https://smart-voyage-recommendation.onrender.com/api",
  fileUrl: "https://smart-voyage-recommendation.onrender.com/api",
  accessToken: localStorage.getItem("accessToken") || null,

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
