import React, {useEffect, useState} from "react";
import userLayout from "../user/userLayout"
import "./../assets/css/user-view.css";
import {useLocation} from "react-router-dom";
import axios from "../api/axios";
import axiosApiInstance from "../context/interceptor";


const ChangePwsPage = () => {
    let param = useLocation().pathname;
    const [allow,setAllow]= useState(false)
    const [message,setMessage]= useState()
    const checkVerifyCode=async () => {
        const result = await axios.get(axiosApiInstance.defaults.baseURL + `/api/auth/user/verify-code/${param.split('=').pop()}`)
        setAllow(result.data.status)
        setMessage(result.data.message)
    }
    useEffect(()=>{
        checkVerifyCode()
    },[])
        return(
            allow?
                <>
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
                :

                <>
                    <div>
                        <div className="bg">
                            <div className="form">
                                <div className="form-toggle"></div>
                                <div className="form-panel one">
                                    <div className="form-header">
                                        <h1>{message}</h1>
                                    </div>
                                    <div className="form-content">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>

            )


}

export default userLayout(ChangePwsPage);