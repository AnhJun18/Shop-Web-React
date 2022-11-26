import axios from "../api/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const axiosApiInstance = axios.create({});

axiosApiInstance.interceptors.request.use((config) => {
  let tokensData = JSON.parse(localStorage.getItem("tokens"));
  if(tokensData === null){
    localStorage.clear()
    toast.info("Vui lòng đăng nhập để tiếp tục!",{autoClose:5000})
    window.location.href = "/login";

  }

  config.headers = {
    'Authorization': `Bearer ${tokensData.data.accessToken}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  return config;
});

axiosApiInstance.interceptors.response.use(
  response  => response,
  async (error) => {
    if (error.response.status === 401) {
      toast.error("Access Token đã hết hạn")
      const authData = JSON.parse(localStorage.getItem("tokens"));
     if(authData.data.refreshToken){
       let apiResponse = await axios.get(
           axios.defaults.baseURL + `/api/auth/user/refresh/${authData.data.refreshToken}`
       );
       if(apiResponse.data.data.status && apiResponse){
         // alert("Da Refresh Token")
         localStorage.setItem("tokens", JSON.stringify(apiResponse.data));
         //alert("Da set Token moi")
         error.config.headers = {
           'Authorization': `Bearer ${apiResponse.data.accessToken}`
         }
         window.location.reload()
       }
       else {
         localStorage.clear()
         window.location.href = "/login";
         toast.error("Token đã hết hạn. Vui lòng đăng nhập lại")
       }
     }
      /*error.config.headers[
        "Authorization"
      ] = `Bearer ${apiResponse.data.accessToken}`;*/
      //return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosApiInstance;