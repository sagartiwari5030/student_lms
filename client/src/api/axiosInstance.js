// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:5001",
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || "";

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }else {
//       console.log("No access token found in sessionStorage");
//     }

//     return config;
//   },
//   (err) => Promise.reject(err,"err yha h")
 
// );

// export default axiosInstance;


import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001", // Set the base URL for the API
});

axiosInstance.interceptors.request.use(
  (config) => {
    try {
      // Retrieve the access token from sessionStorage
      const accessToken = sessionStorage.getItem("accessToken");

      if (accessToken) {
        // Set the Authorization header with the Bearer token
        config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
      } else {
        console.warn("No access token found in sessionStorage");
      }

      return config;
    } catch (error) {
      console.error("Error retrieving access token:", error);
      return config; // Proceed without token
    }
  },
  (error) => {
    console.error("Request interceptor error:", error); // Log request errors
    return Promise.reject(error); // Reject the request
  }
);

export default axiosInstance;
