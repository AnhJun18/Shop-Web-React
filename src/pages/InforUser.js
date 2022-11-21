import {useContext, useState, useEffect, useRef} from "react";
import {Checkbox} from "@mui/material";
import React from "react";
import {Button, Form, Modal} from "react-bootstrap"
import "./../assets/css/order.css";
import userLayout from "../user/userLayout"
import axiosApiInstance from "../context/interceptor";
import InputSpinner from 'react-bootstrap-input-spinner'
import {toast} from "react-toastify";
import axios from "../api/axios";

const InforUser = () => {
    const [status, setStatus] = useState(1);
    const [tmp, setTmp] = useState(1);
    const [modalForm, setModalForm] = useState(false);
    const [profile, setProfile] = useState({});
    const [order, setOrder] = useState([]);
    const [emty, setEmty] = useState(false);
    const handleClose = () => setModalForm(false);
    const clickChangePass = (e) => {
        setModalForm(true);
    }

    async function getProfile() {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/user/profile`);
        setProfile(result?.data?.data?.userInfo)

    }

    async function getOrder() {
        const  s=["","Chờ Xác Nhận","Đang Chuẩn Bị Hàng","Đang Vận Chuyển"]
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/order/status=${s.at(tmp)}`);
        setOrder(result?.data)
    }


    useEffect(()=>{
        getProfile()
        getOrder()
    },[tmp])
    const clickInfor = (e) => {
        setStatus(1);
    }
    const clickTheOrder = (e) => {
        setStatus(2);
    }
    const clickConfirmation = (e) => {
        setTmp(1);
    }
    const clickPreparing = (e) => {
        setTmp(2);
    }
    const clickDelivery = (e) => {
        setTmp(3);
    }
    const clickDelivered = (e) => {
        setTmp(4);
    }
    const clickCancelled = (e) => {
        setTmp(5);
    }
    return <>
        <div class="margin-left-right padding-bottom-3x marginTop marginBot row">
            <div class="table-responsive block-infor-left  ms-2">
                <button className={status == 1 ? " buttonHead active" : " buttonHead"} onClick={clickInfor}>Hồ sơ của
                    tôi
                </button>
                <button className={status == 2 ? " buttonHead mb-3 active" : " buttonHead mb-3"}
                        onClick={clickTheOrder}>Đơn đặt hàng
                </button>
            </div>
            <div class="table-responsive block-infor-right ">
                {
                    status == 1 ?
                        // thông tin khách hàng
                        <div>
                            <h4 className="ms-4 mb-3 mt-3">Hồ sơ của tôi </h4>
                            <div className="row mb-3 ms-3 me-3 borderr">
                                <div class="field field_v1">
                                    <label for="first-name" class="ha-screen-reader">Họ tên</label>
                                    <input id="first-name" class="field__input" value={profile?.firstName+profile?.lastName} placeholder=" "></input>
                                    <span class="field__label-wrap" aria-hidden="true">
                                    <span class="field__label">Họ tên</span>
                                </span>
                                </div>
                                <div className="row mb-2">
                                    <div class="field field_v1 col">
                                        <label for="first-name" class="ha-screen-reader">Số điện thoại</label>
                                        <input id="first-name" class="field__input" value={profile?.phone} placeholder=" "></input>
                                        <span class="field__label-wrap" aria-hidden="true">
                                        <span class="field__label">Số điện thoại</span>
                                    </span>
                                    </div>
                                    <div class="field field_v1 col ">
                                        <label for="first-name" class="ha-screen-reader">Email</label>
                                        <input id="first-name" class="field__input" value={profile?.account?.email} placeholder=" "></input>
                                        <span class="field__label-wrap" aria-hidden="true">
                                        <span class="field__label">Email</span>
                                    </span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div class="field field_v1 col-6">
                                        <label for="first-name" class="ha-screen-reader">Ngày sinh</label>
                                        <input type="date" class="field__input" placeholder=" "></input>
                                        <span class="field__label-wrap" aria-hidden="true">
                                        <span class="field__label">Ngày sinh</span>
                                    </span>
                                    </div>

                                </div>
                                <div className="display-flex">
                                    <p className="mt-3 ms-2">Giới tính:</p>
                                    <input type="radio" value="Nam" name="fav_language"
                                           checked={profile.gender === "Nam"?"checked":""}
                                           className="me-2 mt-3 ms-5"></input>
                                    <label for="nam" className="mt-3">Nam</label>
                                    <input type="radio" value="Nu" name="fav_language"
                                           checked={profile.gender === "Nữ"?"checked":""}
                                           className="me-2 ms-4 mt-3"></input>
                                    <label for="nu" className="mt-3">Nữ</label>
                                </div>


                                <div class="field field_v1 mb-2">
                                    <label for="first-name" class="ha-screen-reader">Địa chỉ</label>
                                    <input id="first-name" class="field__input" value={profile?.address} placeholder=" "></input>
                                    <span class="field__label-wrap" aria-hidden="true">
                                    <span class="field__label">Địa chỉ</span>
                                </span>
                                </div>
                                <a className="changePass" onClick={clickChangePass}> Đổi mật khẩu</a>

                            </div>
                            {
                                modalForm ?
                                    <Modal show={true} onHide={handleClose}></Modal>
                                    :
                                    <Modal show={false} onHide={handleClose}></Modal>
                            }
                        </div>
                        :
                        // Quảng lý đơn hàng
                        <div>
                            <div className="status-order">
                                <button
                                    className={tmp == 1 ? " buttonStatus active ms-2" : " buttonStatus me-"}
                                    onClick={clickConfirmation}>Chờ xác nhận
                                </button>
                                <button className={tmp == 2 ? " buttonStatus active " : " buttonStatus "}
                                        onClick={clickPreparing}>Chuẩn bị hàng
                                </button>
                                <button className={tmp == 3 ? " buttonStatus active " : " buttonStatus"}
                                        onClick={clickDelivery}>Đang vận chuyển
                                </button>
                                <button className={tmp == 4 ? " buttonStatus active " : " buttonStatus"}
                                        onClick={clickDelivered}>Đã giao
                                </button>
                               {/* <button className={tmp == 5 ? " buttonStatus active" : " buttonStatus "}
                                        onClick={clickCancelled}>Đã hủy
                                </button>*/}
                            </div>
                            {
                                emty ?
                                    <div>
                                        <h6 className="center">Bạn không có đơn đặt hàng trong trạng thái này</h6>
                                        <div class="shopping-cart-footer">
                                            <div class="buttonBackHome">
                                                <a class="btn btn-success" href="#"> Tiếp tục mua sắm </a></div>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        {order.length?
                                        <table class="table status-table">
                                            <tr>
                                                <td class="text-center">Mã đơn hàng: 123</td>
                                                <td class="text-center">Ngày đặt: 27/11/2022</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className=" display-flex">
                                                        <a className="" href="#"><img className="imageInfor"
                                                                                      src={require('./../assets/images/banner_img_02.jpg')}
                                                                                      alt="Product"/></a>
                                                        <div className="ms-1 mt-1">
                                                            <p><a className=" fontSizeInfor"
                                                                  href="#">Áo</a></p>
                                                            <p className=" fontSizeInfor ">Size: L</p>
                                                            <p className=" fontSizeInfor ">Color: Black</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center ">2</td>
                                                <td className="text-center ">19000</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td className="text-center ">Phí ship:</td>
                                                <td className="text-center">18000vnd</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td className="text-center">Tổng tiền:</td>
                                                <td className="text-center">58000vnd</td>
                                            </tr>
                                        </table>
                                            :
                                            <div>Danh sách trống</div>}

                                    </div>

                            }

                        </div>
                }

            </div>
        </div>
    </>

}

export default userLayout(InforUser);