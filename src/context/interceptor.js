import axios from "axios";
 
const axiosApiInstance = axios.create({});
 
axiosApiInstance.interceptors.request.use((config) => {
  let tokensData = JSON.parse(localStorage.getItem("tokens"));
  config.headers.common["Authorization"] = `Bearer ${tokensData.data.accessToken}`;
  return config;
});

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const authData = JSON.parse(localStorage.getItem("tokens"));
      const payload = {
        accessToken: authData.data.accessToken,
        refreshToken: authData.data.refreshToken,
      };
 
      let apiResponse = await axios.post(
        "http://localhost:8081​/api​/auth​/user​/refresh",
        payload
      );
      localStorage.setItem("tokens", JSON.stringify(apiResponse.data));
      error.config.headers[
        "Authorization"
      ] = `Bearer ${apiResponse.data.accessToken}`;
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosApiInstance;