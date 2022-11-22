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
    const [modalForm, setModalForm] = useState(false);
    const [profile, setProfile] = useState({});
    const [order, setOrder] = useState([]);
    const [load, setLoad] = useState(false);
    const handleClose = () => setModalForm(false);
    const  listST=["Chờ Xác Nhận","Đang Chuẩn Bị Hàng","Đang Vận Chuyển","Đã Thanh Toán","Đã Hủy"]    ;
    const [tmp, setTmp] = useState(listST.at(0));

    let total;
    const clickChangePass = (e) => {
        setModalForm(true);
    }

    async function getProfile() {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/user/profile`);
        setLoad(true)
        setProfile(result?.data?.data?.userInfo)

    }

    async function getOrder() {
        setLoad(false)
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/order/status=${tmp}`);
        setLoad(true)
        setOrder(result?.data)
    }

    const  handleChangProfile =(e)=> {
        console.log(e.currentTarget.value)

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
    const clickStatus = (e) => {
        setTmp(e.target.id)
    }

    return <>
        <div class="margin-left-right padding-bottom-3x marginTop marginBot row">
            <div class="table-responsive block-infor-left  ms-2">
                <button className={status == 1 ? " buttonHead active w-100" : " buttonHead w-100"} onClick={clickInfor}>Hồ sơ của
                    tôi
                </button>
                <button className={status == 2 ? " buttonHead mb-3 active w-100" : " buttonHead mb-3 w-100"}
                        onClick={clickTheOrder}>Đơn đặt hàng
                </button>
            </div>
            <div class="table-responsive block-infor-right ">
                {status == 1 ?
                        load? <div>
                                    <h4 className="ms-4 mb-3 mt-3">Hồ sơ của tôi </h4>
                                    <div className="row mb-3 ms-3 me-3 borderr">
                                        <div className="field field_v1">
                                            <label htmlFor="first-name" className="ha-screen-reader">Họ tên</label>
                                            <input id="first-name" className="field__input" onChange={handleChangProfile}
                                                   value={profile?.firstName + profile?.lastName} placeholder=" "></input>
                                            <span className="field__label-wrap" aria-hidden="true">
                                    <span className="field__label">Họ tên</span>
                                </span>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="field field_v1 col">
                                                <label htmlFor="first-name" className="ha-screen-reader">Số điện
                                                    thoại</label>
                                                <input id="first-name" className="field__input" onChange={handleChangProfile} value={profile?.phone}
                                                       placeholder=" "></input>
                                                <span className="field__label-wrap" aria-hidden="true">
                                        <span className="field__label">Số điện thoại</span>
                                    </span>
                                            </div>
                                            <div className="field field_v1 col ">
                                                <label htmlFor="first-name" className="ha-screen-reader">Email</label>
                                                <input id="first-name" className="field__input" onChange={handleChangProfile}
                                                       value={profile?.account?.email} placeholder=" "></input>
                                                <span className="field__label-wrap" aria-hidden="true">
                                        <span className="field__label">Email</span>
                                    </span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="field field_v1 col-6">
                                                <label htmlFor="first-name" className="ha-screen-reader">Ngày sinh</label>
                                                <input type="date" className="field__input" onChange={handleChangProfile} placeholder=" "></input>
                                                <span className="field__label-wrap" aria-hidden="true">
                                        <span className="field__label">Ngày sinh</span>
                                    </span>
                                            </div>

                                        </div>
                                        <div className="display-flex">
                                            <p className="mt-3 ms-2">Giới tính:</p>
                                            <input type="radio" value="Nam" name="fav_language" onChange={handleChangProfile}
                                                   checked={profile.gender === "Nam" ? "checked" : ""}
                                                   className="me-2 mt-3 ms-5"></input>
                                            <label htmlFor="nam" className="mt-3">Nam</label>
                                            <input type="radio" value="Nu" name="fav_language" onChange={handleChangProfile}
                                                   checked={profile.gender === "Nữ" ? "checked" : ""}
                                                   className="me-2 ms-4 mt-3"></input>
                                            <label htmlFor="nu" className="mt-3">Nữ</label>
                                        </div>


                                        <div className="field field_v1 mb-2">
                                            <label htmlFor="first-name" className="ha-screen-reader">Địa chỉ</label>
                                            <input id="first-name" className="field__input"  onChange={handleChangProfile} value={profile?.address}
                                                   placeholder=" "></input>
                                            <span className="field__label-wrap" aria-hidden="true">
                                    <span className="field__label">Địa chỉ</span>
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
                        <div>Loading</div>
                        // thông tin khách hàng

                        :
                        // Quảng lý đơn hàng
                        <div>
                            <div className="status-order">
                                {
                                    listST.map(i=>
                                        <button id={i}
                                                style={{fontSize: "16px"}}
                                            className={tmp === i ? " buttonStatus active " : " buttonStatus "}
                                            onClick={clickStatus}>{i}
                                        </button>
                                    )
                                }
                            </div>
                            {load ?
                                order.length ?
                                    order.map(item=>
                                    <table className="table status-table">
                                        <tr>
                                            <td className="text-center">Mã đơn hàng:{item?.id}</td>
                                            <td className="text-center">Ngày đặt: {item?.createdDate}</td>
                                        </tr>
                                        {item?.orderDetails?.map(k=>
                                            <tr>
                                                <td>
                                                    <div className=" display-flex">
                                                        <a className="" href="#"><img className="imageInfor"
                                                                                      src={k.productDetail?.infoProduct?.linkImg}
                                                                                      alt="Product"/></a>
                                                        <div className="ms-1 mt-1">
                                                            <p><a className=" fontSizeInfor"
                                                                  href="#">{k.productDetail?.infoProduct?.name}</a></p>
                                                            <p className=" fontSizeInfor ">Size: {k.productDetail?.size}</p>
                                                            <p className=" fontSizeInfor ">Color: {k.productDetail?.color}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center ">x{k.amount}</td>
                                                <td className="text-center ">{k.prices}</td>
                                                <td className="text-center ">{k.prices*k.amount}</td>
                                            </tr>
                                        )
                                        }
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td className="text-center ">Phí ship:</td>
                                            <td className="text-center">{item?.feeShip}</td>
                                        </tr>
                                        <tr>
                                            <td></td>

                                            <td></td>
                                            <td className="text-center">Tổng tiền:</td>
                                            <div style={{display: "none"}}>
                                                {total = 0}
                                                {item?.orderDetails?.map(item => {

                                                    total += item.amount * item.prices;
                                                })
                                                }</div>
                                            <td className="text-center">{(total + item?.feeShip).toLocaleString('vi', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}</td>
                                        </tr>

                                    </table>
                                )
                                :
                                <div>
                                    <h6 className="center">Bạn không có đơn đặt hàng trong trạng thái này</h6>
                                    <div class="shopping-cart-footer">
                                        <div class="buttonBackHome">
                                            <a class="btn btn-success" href="#"> Tiếp tục mua sắm </a></div>
                                    </div>
                                </div>
                                :
                                <div>Loading....</div>
                            }
                        </div>
                }

            </div>
        </div>
    </>

}

export default userLayout(InforUser);