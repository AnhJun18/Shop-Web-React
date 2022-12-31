import React, {useEffect} from "react";
import userLayout from "../../user/userLayout"
import "./../../assets/css/user-view.css";
import {Link, useNavigate} from 'react-router-dom';
import axios from "../../api/axios";
import {toast} from 'react-toastify';
import axiosApiInstance from "../../context/interceptor";


const RegisterPage = () => {
    const navigate = useNavigate();

    const  handleSubmit=async (event) => {
        event.preventDefault()
        if (event.target.elements.password.value !== event.target.elements.passwordRepeat.value) {
            toast.error("Xác nhận lại mật khẩu không khớp")
            return
        }
        console.log('/api/auth/user/register')
        const payload = {
            firstName: event.target.elements.firstName.value,
            lastName: event.target.elements.lastName.value,
            userName: event.target.elements.username.value,
            phone: event.target.elements.phone.value,
            email: event.target.elements.email.value,
            gender: "Nam",
            address: "",
            roleName: "ROLE_USER",
            password: event.target.elements.password.value
        }
        console.log(axiosApiInstance.defaults.baseURL  + '/api/auth/user/register')
        const result = await axios.post(axiosApiInstance.defaults.baseURL  + '/api/auth/user/register',payload)
        if(result.data.data.status){
            toast.success("Tạo tài khoản thành công")
            navigate("/login")
        }
        else
            toast.error(result.data.data.message)
    }




    useEffect(()=>{

    },[])

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
                            <form onSubmit={handleSubmit}>
                                <div className="row form-group">
                                    <div className="col-md-6">
                                        <label htmlFor="">Họ Đệm</label>
                                        <input type="text" id="firstName" name="firstName" required="required"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="lastName">Tên</label>
                                        <input type="lastName" id="lastName" name="" required="required"/>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="username">Tên đăng nhập</label>
                                    <input type="text" id="username" name="username" required="required" />
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-6">
                                        <label for="phone">SDT </label>
                                        <input type="text" id="phone" name="phone" required="required" />
                                    </div>
                                    <div class="col-md-6">
                                        <label for="">Email</label>
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
                                        <input type="password" id="passwordRepeat" name="passwordRepeat" required="required" />
                                    </div>
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