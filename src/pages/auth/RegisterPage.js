import React from "react";
import userLayout from "../../user/userLayout"
import "./../../assets/css/user-view.css";
import {Link, Navigate} from 'react-router-dom';



const RegisterPage = () => {
    return <>
        <div>
            <div class="bg">
                <div class="img"></div>
                <div class="formdk">
                    <div class="form-toggle"></div>
                    <div class="form-panelDK one">
                        <div class="form-header">
                            <h1>Đăng Ký</h1>
                        </div>
                        <div class="form-content">
                            <form>
                                <div class="form-group">
                                    <label for="username">Họ Tên</label>
                                    <input type="text" id="username" name="username" required="required" />
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-6">
                                        <label for="phone">SDT </label>
                                        <input type="text" id="phone" name="phone" required="required" />
                                    </div>
                                    <div class="col-md-6">
                                        <label for="email">Email</label>
                                        <input type="email" id="email" name="email" required="required" />
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-6">
                                        <label for="password">Mật Khẩu</label>
                                        <input type="password" id="password" name="password" required="required" />
                                    </div>
                                    <div class="col-md-6">
                                        <label for="password">Xác Nhận Mật Khẩu</label>
                                        <input type="password" id="password" name="password" required="required" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-remember">
                                        <input type="checkbox" />Nhớ tài khoản
                                    </label>
                                </div>
                                <div class="form-group">
                                    <button type="submit">Đăng Ký</button>
                                </div>
                                <p class="form-group text">
                                    Bạn đã có tài khoản?
                                    <Link class="form-recovery" to="/login"> Đăng nhập</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>

}

export default userLayout(RegisterPage);