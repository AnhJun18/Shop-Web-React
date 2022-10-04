import React from "react";
import adminLayout from "../../assets/css/login.css";
class login  extends React.Component {
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
                                        <div class="row">
                                            <div class="form-group col-half right">
                                                <label for="username">SDT </label>
                                                <input type="text" id="username" name="username" required="required" />
                                            </div>
                                            <div class="form-group col-half">
                                                <label for="username">Email</label>
                                                <input type="text" id="Email" name="username" required="required" />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="form-group col-half right">
                                                <label for="password">Mật Khẩu</label>
                                                <input type="password" id="password" name="password" required="required" />
                                            </div>
                                            <div class="form-group col-half">
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
                                            <a class="form-recovery" href="#"> Đăng nhập</a>
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
export default login