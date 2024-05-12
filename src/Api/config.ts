// config.js

const config = {
  apiUrl: "http://127.0.0.1:8000/api",
  fileUrl     : 'http://127.0.0.1:8080/',
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
