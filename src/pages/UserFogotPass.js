import React from "react";
import userLayout from "../user/userLayout"
import "./../assets/css/user-view.css";
import {Link, Navigate} from 'react-router-dom';


const ForgotPwsPage = () => {
        return <>
            <div>
            <div className="bg">
                <div className="form">
                    <div className="form-toggle"></div>
                    <div className="form-panel one">
                        <div className="form-header">
                            <h1>Quên mật khẩu?</h1>
                        </div>
                        <div className="form-content">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" required/>
                                </div>
                                <div className="form-group">
                                    <button variant="primary" type="button">Gửi mã</button>
                                </div>
                                <p className="form-group text">
                                    Bạn muốn đăng nhập?
                                    <Link className="form-recovery" to="/login"> Đăng nhập</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>

}

export default userLayout(ForgotPwsPage);