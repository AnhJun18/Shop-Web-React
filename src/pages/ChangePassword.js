import React from "react";
import userLayout from "../user/userLayout"
import "./../assets/css/user-view.css";


const ChangePwsPage = () => {
        return <>
            <div>
            <div className="bg">
                <div className="form">
                    <div className="form-toggle"></div>
                    <div className="form-panel one">
                        <div className="form-header">
                            <h1>Đổi mật khẩu:</h1>
                        </div>
                        <div className="form-content">
                            <form>
                                <div className="form-group">
                                    <label>Mật khẩu cũ:</label>
                                    <input type="password" required/>
                                </div>
                                <div className="form-group">
                                    <label>Mật khẩu mới:</label>
                                    <input type="password" required/>
                                </div>
                                <div className="form-group">
                                    <label>Xác nhận mật khẩu:</label>
                                    <input type="password" required/>
                                </div>
                                <div className="form-group">
                                    <button variant="primary" type="button">Đổi mật khẩu</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>

}

export default userLayout(ChangePwsPage);