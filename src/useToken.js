import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('accessToken');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('accessToken', userToken.data.accessToken);
    localStorage.setItem('refreshToken', userToken.data.refreshToken);
    setToken(userToken.data.accessToken);
  };

  return {
    setToken: saveToken,
    token
  }
}