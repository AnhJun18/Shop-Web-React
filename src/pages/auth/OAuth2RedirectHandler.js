import React, { Component } from 'react';
const OAuth2RedirectHandler = () => {
    console.log("cc")
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    console.log(accessToken)
    const refreshToken = urlParams.get('refreshToken');
    console.log(refreshToken)
    const tmp = {
        "status": 200,
        "error": 0,
        "data": {
            "status": true,
            "message": null,
            "accessToken": accessToken
            , "expiresIn": 1681787070305,
            "refreshToken": refreshToken,
            "userInfo": {
                "createdDate": "2022-12-24T05:43:43.589956100Z", "id": 2, "firstName": "Lê Phương", "lastName": "Anh", "gender": "Nam", "phone": "097765435", "address": "97 Man Thiện, Quận 9, TPHCM", "account": { "createdDate": "2022-12-24T05:43:43.330428100Z", "id": 2, "username": "pa", "password": "$2a$10$sIPjxDhZNPFCvyWoZHhSJevqaOypTcC9w2pj.tSfT3725JWFS4Al.", "email": "fromcn3withlove@gmail.com", "role": { "id": 2, "name": "ROLE_USER" }, "deleteFlag": false }
            }
        }
    }
    localStorage.setItem("tokens", JSON.stringify(tmp));
    window.location.href = "/";
 


};
export default OAuth2RedirectHandler;