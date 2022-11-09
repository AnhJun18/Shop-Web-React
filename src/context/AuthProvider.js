import axios from "../api/axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const AuthContext = createContext();
 
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (localStorage.getItem("tokens")) {
      let tokens = JSON.parse(localStorage.getItem("tokens"));
      return tokens.data.userInfo.account.username;
    }
    return null;
  });
 
  const navigate = useNavigate();
 
  const login = async (payload) => {
    const apiResponse = await axios.post(
      axios.defaults.baseURL + "/api/auth/user/login",
      payload
    );

    if(apiResponse.data.data.status === true){
      localStorage.setItem("tokens", JSON.stringify(apiResponse.data));
      navigate("/");
    }
    else
      toast.error((apiResponse.data.data.message));

  };
  const logout = async () => {
    localStorage.removeItem("tokens");
    setUser(null);
    navigate("/login");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
 
export default AuthContext;