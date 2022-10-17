import React from "react";
import adminLayout from "../../assets/css/login.css";
import {Link, Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import {useRef, useState, useEffect, useContext} from 'react';
//import AuthContext from '../../context/AuthProvider';

//import axios from '../../api/axios';
//const LOGIN_URL = '/api/auth/user/login';
async function loginUser(credentials) {
    return  await fetch('http://localhost:8081/api/auth/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

async function getProfileUser() {
    return await fetch('http://localhost:8081/api/user/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        },
    })
        .then(data => data.json())
}


export default function LoginPage({setToken}) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const resultLogin = await loginUser({
            username,
            password
        });
        if (resultLogin.data.status == true) {
            setToken(resultLogin);
            console.log(await getProfileUser());
        } else {
            setToken(null);
            console.log(resultLogin.data.message)
        }


    }

    return (
        <div>
            <div className="bg">
                <div className="form">
                    <div className="form-toggle"></div>
                    <div className="form-panel one">
                        <div className="form-header">
                            <h1>Đăng nhập</h1>
                        </div>
                        <div className="form-content">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">Tên đăng nhập</label>
                                    <input type="text" id="username" onChange={e => setUserName(e.target.value)}
                                           required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Mật Khẩu</label>
                                    <input type="password" id="password" onChange={e => setPassword(e.target.value)}
                                           required/>
                                </div>
                                <div className="form-group">
                                    <label className="form-remember">
                                        <input type="checkbox"/>Nhớ tài khoản
                                    </label><a className="form-recovery" href="#">Quên mật khẩu?</a>
                                </div>
                                <div className="form-group">
                                    <button type="submit">Log In</button>
                                </div>
                                <p className="form-group text">
                                    Bạn chưa có tài khoản?
                                    <Link className="form-recovery" to="/register"> Đăng ký</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired
};