import axios from "../api/axios";
 
const axiosApiInstance = axios.create({});

axiosApiInstance.interceptors.request.use((config) => {
  let tokensData = JSON.parse(localStorage.getItem("tokens"));
  if(tokensData === null){
    localStorage.clear()
    window.location.href = "/login";
  }

  config.headers = {
    'Authorization': `Bearer ${tokensData.data.accessToken}`,
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  return config;
});

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error.response)
    if (error.response.status === 401) {
      alert("Access da het han")
      const authData = JSON.parse(localStorage.getItem("tokens"));
      const payload = {
        accessToken: authData.data.accessToken,
        refreshToken: authData.data.refreshToken,
      };
      let apiResponse = await axios.get(
        axios.defaults.baseURL + `/api/auth/user/refresh/${authData.data.refreshToken}`
      );
      console.log(apiResponse.data.data)
      if(apiResponse.data.data.status === false){
        localStorage.clear()
        window.location.href = "/login";
        alert("Refresh da het han")
        return Promise.reject(error);
      }
      alert("Da Refresh Token")
      localStorage.setItem("tokens", JSON.stringify(apiResponse.data));
      alert("Da set Token moi")
      error.config.headers = {
        'Authorization': `Bearer ${apiResponse.data.accessToken}`
      }
      /*error.config.headers[
        "Authorization"
      ] = `Bearer ${apiResponse.data.accessToken}`;*/
      //return axios(error.config);
      window.location.href = '/';

    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosApiInstance;