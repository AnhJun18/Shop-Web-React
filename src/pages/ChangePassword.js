import React, {useEffect, useState} from "react";
import userLayout from "../user/userLayout"
import "./../assets/css/user-view.css";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "../api/axios";
import axiosApiInstance from "../context/interceptor";
import {toast} from "react-toastify";


const ChangePwsPage = () => {
    let param = useLocation().pathname;
    let code = param.split('=').pop()
    const navigate = useNavigate()
    const [allow, setAllow] = useState(false)
    const [message, setMessage] = useState()
    const [error, setError] = useState(false)
    const checkVerifyCode = async () => {
        const result = await axios.get(axiosApiInstance.defaults.baseURL + `/api/auth/user/verify-code/${code}`)
        setAllow(result.data.status)
        setMessage(result.data.message)
    }
    useEffect(() => {
        checkVerifyCode()
    }, [])

    const resetPass = async (pass) => {
        const payload = {
            "verifyCode": code,
            "password": pass
        }
        const result = await axios.post(axiosApiInstance.defaults.baseURL + `/api/auth/user/reset-password`, payload)
        console.log(result.data.data.status)
        if (result.data.data.status) {
            navigate("/login")
            toast.success("Mật khẩu đã được đổi. Bạn có thể đăng nhập")
        } else
            toast.error(result.data.data.message)

    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const pass = e.target.elements.pass.value
        const pass_repeat = e.target.elements.pass_repeat.value
        if (pass !== pass_repeat) {
            setError(true)
        } else {
            setError(false)
            await resetPass(pass)
        }
    }
    return (
        allow ?
            <>
                <div>
                    <div className="bg">
                        <div className="form">
                            <div className="form-toggle"></div>
                            <div className="form-panel one">
                                <div className="form-header">
                                    <h1>Đổi mật khẩu</h1>
                                </div>
                                <div className="form-content">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label>Mật khẩu mới</label>
                                            <input type="password" id="pass" required/>
                                        </div>
                                        <div className="form-group">
                                            <label>Xác nhận mật khẩu</label>
                                            <input type="password" id="pass_repeat" required/>
                                        </div>
                                        {error ? <div variant='danger'>Xác thực ko đúng</div> : null}
                                        <div className="form-group">
                                            <button variant="primary" type="submit">Đổi mật khẩu</button>
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