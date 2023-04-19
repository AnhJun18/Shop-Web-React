import React, {useContext, useEffect, useRef} from "react";
import adminLayout from "../../assets/css/login.css";
import userLayout from "../../user/userLayout"
import "./../../assets/css/user-view.css";
import {Link, useNavigate} from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import { LOGIN_URL_GOOGLE } from "../../common/url";

const LoginPage = () => {

    const userName = useRef("");
    const password = useRef("");
    const {login}= useContext(AuthContext)
   
    const handleRedirectGoogle = () => {
        window.open(LOGIN_URL_GOOGLE, "_self", '').close();
    }
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
                                <p className="form-group text">
                                    <Link className="form-recovery link-item"  to="/payment"> test</Link>
                                </p>
                            </form>

                            <div className="auth-form__social">
                                <Link to="#"  onClick={handleRedirectGoogle} className="auth-form__social-google btn btn--size-s btn--width-icon">
                                    <i className="auth-form__social-icon fa fa-google-plus"></i>
                                    <span className="auth-form__social-text">Kết nối với Google</span>
                                </Link>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default userLayout(LoginPage);