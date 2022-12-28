import React, {useEffect, useState} from "react";
import userLayout from "../user/userLayout"
import "./../assets/css/user-view.css";
import {Link, useNavigate} from 'react-router-dom';
import axios from "../api/axios";
import axiosApiInstance from "../context/interceptor";
import {toast} from "react-toastify";
import ReactLoading from 'react-loading';


const ForgotPwsPage = () => {
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault()
        const payload = {
            email: (event.target.elements.email.value)
        }
        setLoad(true)
        const result = await axios.post(axiosApiInstance.defaults.baseURL + '/api/auth/user/forgot-password', payload)
        setLoad(false)
        if (result.data.data.status) {
            toast.success(result.data.data.message)
            navigate("/login")
        } else {
            toast.error(result.data.data.message)
        }

    }
    return <>
        {load ?
            <div className={"center loading"}>
                <ReactLoading type={'bubbles'} color='#fffff' height={'33px'} width={'9%'}/>
            </div>
            :
            <div>
                <div className="bg">
                    <div className="form">
                        <div className="form-toggle"></div>
                        <div className="form-panel one">
                            <div className="form-header">
                                <h1>Quên mật khẩu?</h1>
                            </div>
                            <div className="form-content">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" id="email" required/>
                                    </div>
                                    <div className="form-group">
                                        <button variant="primary" type="submit">Gửi mã</button>
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
            </div>}
    </>

}

export default userLayout(ForgotPwsPage);