import React from "react";
import adminLayout from "../../assets/css/login.css";
import { Link } from 'react-router-dom';
class login  extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        return (
            <>
                <div>
                    <div className="bg">
                        <div className="img"></div>
                        <div className="formdk">
                            <div className="form-toggle"></div>
                            <div className="form-panelDK one">
                                <div className="form-header">
                                    <h1>Đăng Ký</h1>
                                </div>
                                <div className="form-content">
                                    <form>
                                        <div className="form-group">
                                            <label for="username">Họ Tên</label>
                                            <input type="text" id="username" name="username" required="required" />
                                        </div>
                                        <div className="row form-group">
                                            <div className="col-md-6">
                                                <label for="phone">SDT </label>
                                                <input type="text" id="phone" name="phone" required="required" />
                                            </div>
                                            <div className="col-md-6">
                                                <label for="email">Email</label>
                                                <input type="email" id="email" name="email" required="required" />
                                            </div>
                                        </div>
                                        <div className="row form-group">
                                            <div className="col-md-6">
                                                <label for="password">Mật Khẩu</label>
                                                <input type="password" id="password" name="password" required="required" />
                                            </div>
                                            <div className="col-md-6">
                                                <label for="password">Xác Nhận Mật Khẩu</label>
                                                <input type="password" id="password" name="password" required="required" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-remember">
                                                <input type="checkbox" />Nhớ tài khoản
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit">Đăng Ký</button>
                                        </div>
                                        <p className="form-group text">
                                            Bạn đã có tài khoản?
                                            <Link className="form-recovery" to="/login"> Đăng nhập</Link>
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