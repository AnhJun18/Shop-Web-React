import React, {useContext, useEffect, useRef} from "react";
import adminLayout from "../../assets/css/login.css";
import userLayout from "../../user/userLayout"
import "./../../assets/css/user-view.css";
import {Link, useNavigate} from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';

const LoginPage = () => {

    const userName = useRef("");
    const password = useRef("");
    const {login}= useContext(AuthContext)
   
    const loginSubmit = async (e) => {
        e.preventDefault()
      let payload = {
        username: userName.current.value,
        password: password.current.value
      }
      await login(payload);
    };

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
                            <form onSubmit={loginSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">Tên đăng nhập</label>
                                    <input type="text" id="username" ref={userName}
                                           required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Mật Khẩu</label>
                                    <input type="password" id="password" ref={password}
                                           required/>
                                </div>
                                <div className="form-group">
                                    <label className="form-remember">
                                        <input type="checkbox"/>Nhớ tài khoản
                                    </label><a className="form-recovery link-item" href="/forgot-pass">Quên mật khẩu?</a>
                                </div>
                                <div className="form-group">
                                    <button variant="primary" type="submit" >Log In</button>
                                </div>
                                <p className="form-group text">
                                    Bạn chưa có tài khoản?
                                    <Link className="form-recovery link-item"  to="/register"> Đăng ký</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default userLayout(LoginPage);