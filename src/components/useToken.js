import { useState } from 'react';

function useToken() {
  const getToken = () => {
    const userToken = localStorage.getItem('accessToken');
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
    token: localStorage.getItem('accessToken')
  }
}
