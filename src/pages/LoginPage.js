import React from "react";
import adminLayout from "../assets/css/login.css";
class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        return (
            <>
                <div>
                    <div class="bg">
                        <div class="img"></div>
                        <div class="form">
                            <div class="form-toggle"></div>
                            <div class="form-panel one">
                                <div class="form-header">
                                    <h1>Đăng nhập</h1>
                                </div>
                                <div class="form-content">
                                    <form>
                                        <div class="form-group">
                                            <label for="username">Email</label>
                                            <input type="text" id="Email" name="username" required="required" />
                                        </div>
                                        <div class="form-group">
                                            <label for="password">Mật Khẩu</label>
                                            <input type="password" id="password" name="password" required="required" />
                                        </div>
                                        <div class="form-group">
                                            <label class="form-remember">
                                                <input type="checkbox" />Nhớ tài khoản
                                            </label><a class="form-recovery" href="#">Quên mật khẩu?</a>
                                        </div>
                                        <div class="form-group">
                                            <button type="submit">Log In</button>
                                        </div>
                                        <p class="form-group text">
                                            Bạn chưa có tài khoản?
                                            <a class="form-recovery" href="#"> Đăng ký</a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default LoginPage