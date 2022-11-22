import {useState, useEffect, useRef} from "react";
import {Checkbox} from "@mui/material";
import React from "react";
import "./../assets/css/order.css";
// import "./../assets/css/user-view.css";
import userLayout from "../user/userLayout"
//import axiosApiInstance from "../context/interceptor";
import InputSpinner from 'react-bootstrap-input-spinner'
import {toast} from "react-toastify";
//import axios from "../api/axios";
import {Navigate, useLocation, useNavigate} from "react-router-dom";

/*var carts = '';
const Cart = (cart) => {
    console.log(cart)
    carts = cart
    return ''
}
export {Cart}*/

const TheOrderPage = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const cart = location.state;
    return <>{
        location ?
            <div className="margin-left-right padding-bottom-3x marginTop marginBot row">
                <div className="table-responsive block-left  ms-2">
                    <h5 className="ms-4 mb-1 mt-3">Thông tin khách hàng</h5>
                    <div className="field field_v1 ms-4">
                        <label for="first-name" className="ha-screen-reader">Họ tên</label>
                        <input id="first-name" className="field__input" placeholder=" "></input>
                        <span className="field__label-wrap" aria-hidden="true">
                            <span className="field__label">Họ tên</span>
                        </span>
                    </div>
                    <div className="field field_v1 ms-4">
                        <label for="first-name" className="ha-screen-reader">Số điện thoại</label>
                        <input id="first-name" className="field__input" placeholder=" "></input>
                        <span className="field__label-wrap" aria-hidden="true">
                            <span className="field__label">Số điện thoại</span>
                        </span>
                    </div>
                    <div className="field field_v1 ms-4 mb-2">
                        <label for="first-name" className="ha-screen-reader">Địa chỉ</label>
                        <input id="first-name" className="field__input" placeholder=" "></input>
                        <span className="field__label-wrap" aria-hidden="true">
                            <span className="field__label">Địa chỉ</span>
                        </span>
                    </div>
                    <div className="row mb-3">
                        <div className="field field_v1 ms-4 col">
                            <label  className="ha-screen-reader">Tỉnh/thành</label>
                            <select className="field__input" placeholder=" ">
                                <option>Hồ Chí Minh</option>
                            </select>
                            <span className="field__label-wrap" aria-hidden="true">
                                <span className="field__label">Tỉnh/thành</span>
                            </span>
                        </div>
                        <div className="field field_v1 ms-3 col">
                            <label  className="ha-screen-reader">Quận/huyện</label>
                            <select className="field__input" placeholder=" ">
                                <option>Hồ Chí Minh</option>
                            </select>
                            <span className="field__label-wrap" aria-hidden="true">
                                <span className="field__label">Quận/huyện</span>
                            </span>
                        </div>
                        <div className="field field_v1 ms-3 col">
                            <label  className="ha-screen-reader">Phường/xã</label>
                            <select className="field__input" placeholder=" ">
                                <option>Hồ Chí Minh</option>
                            </select>
                            <span className="field__label-wrap" aria-hidden="true">
                                <span className="field__label">Phường/xã</span>
                            </span>
                        </div>
                    </div>
                    <h5 className="ms-4 mb-3 mt-1">Phương thức vận chuyển</h5>

                    <h5 className="ms-4 mb-2 mt-1">Phương thức thanh toán</h5>
                    <div className="field field_v1 ms-4 mb-5">
                        <label for="first-name" className="ha-screen-reader">Phương thức thanh toán</label>
                        <input className="field__input" placeholder=" " value="Thanh toán khi nhận hàng" disabled="true"></input>
                    </div>
                    <div className="shopping-cart-footer">
                        <div ><a className="btn btn-outline-secondary mb-4" href="/shop"><i
                            className="icon-arrow-left"></i>&nbsp;Giỏ hàng</a></div>
                    </div>  
                </div> 
                <div className="table-responsive block-right ">
                    <h5 className="ms-4 mb-3 mt-3">Đơn hàng</h5>
                    <table className="table">
                        <tbody>
                        {cart.map((item, index) =>
                            <tr>
                                <td>
                                    <div className=" display-flex">
                                        <a className="" href="#"><img className="image" src={item?.product?.infoProduct?.linkImg} alt="Product"/></a>
                                        <div className="ms-2">
                                        <p><b className=" fontSize">{item?.product?.infoProduct?.name}</b></p>
                                        <p className=" fontSize ">Size: {item?.product?.size}</p>
                                        <p className=" fontSize ">Color: {item?.product?.color}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center">{item?.product?.current_number}</td>
                                <td className="text-right">{item?.product?.infoProduct?.price}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Tạm tính:</td>
                                <td className="textAlign"><span>19000</span></td>
                            </tr>
                            <tr>
                                <td>Phí ship:</td>
                                <td className="textAlign"><span>19000</span></td>
                            </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                                <td>Tổng tiền:</td>
                                <td className="textAlign"><span>38000 VND</span></td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="shopping-cart-footer">
                    <div className="column">
                        <a className="btn btn-success" href="#"> Đặt hàng </a></div>
                </div>
                </div>
            </div>
        :
        navigate("/cart")
}</>

}

export default userLayout(TheOrderPage);