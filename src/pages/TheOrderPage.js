import {useContext, useState, useEffect, useRef} from "react";
import {Checkbox} from "@mui/material";
import React from "react";
import "./../assets/css/order.css";
// import "./../assets/css/user-view.css";
import userLayout from "../user/userLayout"
import axiosApiInstance from "../context/interceptor";
import InputSpinner from 'react-bootstrap-input-spinner'
import {toast} from "react-toastify";
import axios from "../api/axios";

const TheOrderPage = () => {

    

    return <>
            <div class="margin-left-right padding-bottom-3x marginTop marginBot row">
                <div class="table-responsive block-left  ms-2">
                    <h5 className="ms-4 mb-1 mt-3">Thông tin khách hàng</h5>
                    <div class="field field_v1 ms-4">
                        <label for="first-name" class="ha-screen-reader">Họ tên</label>
                        <input id="first-name" class="field__input" placeholder=" "></input>
                        <span class="field__label-wrap" aria-hidden="true">
                            <span class="field__label">Họ tên</span>
                        </span>
                    </div>
                    <div class="field field_v1 ms-4">
                        <label for="first-name" class="ha-screen-reader">Số điện thoại</label>
                        <input id="first-name" class="field__input" placeholder=" "></input>
                        <span class="field__label-wrap" aria-hidden="true">
                            <span class="field__label">Số điện thoại</span>
                        </span>
                    </div>
                    <div class="field field_v1 ms-4 mb-2">
                        <label for="first-name" class="ha-screen-reader">Địa chỉ</label>
                        <input id="first-name" class="field__input" placeholder=" "></input>
                        <span class="field__label-wrap" aria-hidden="true">
                            <span class="field__label">Địa chỉ</span>
                        </span>
                    </div>
                    <div className="row mb-3">
                        <div class="field field_v1 ms-4 col">
                            <label  class="ha-screen-reader">Tỉnh/thành</label>
                            <select class="field__input" placeholder=" ">
                                <option>Hồ Chí Minh</option>
                            </select>
                            <span class="field__label-wrap" aria-hidden="true">
                                <span class="field__label">Tỉnh/thành</span>
                            </span>
                        </div>
                        <div class="field field_v1 ms-3 col">
                            <label  class="ha-screen-reader">Quận/huyện</label>
                            <select class="field__input" placeholder=" ">
                                <option>Hồ Chí Minh</option>
                            </select>
                            <span class="field__label-wrap" aria-hidden="true">
                                <span class="field__label">Quận/huyện</span>
                            </span>
                        </div>
                        <div class="field field_v1 ms-3 col">
                            <label  class="ha-screen-reader">Phường/xã</label>
                            <select class="field__input" placeholder=" ">
                                <option>Hồ Chí Minh</option>
                            </select>
                            <span class="field__label-wrap" aria-hidden="true">
                                <span class="field__label">Phường/xã</span>
                            </span>
                        </div>
                    </div>
                    <h5 className="ms-4 mb-3 mt-1">Phương thức vận chuyển</h5>

                    <h5 className="ms-4 mb-2 mt-1">Phương thức thanh toán</h5>
                    <div class="field field_v1 ms-4 mb-5">
                        <label for="first-name" class="ha-screen-reader">Phương thức thanh toán</label>
                        <input class="field__input" placeholder=" " value="Thanh toán khi nhận hàng" disabled="true"></input>
                    </div>
                    <div class="shopping-cart-footer">
                        <div ><a class="btn btn-outline-secondary mb-4" href="/shop"><i
                            class="icon-arrow-left"></i>&nbsp;Giỏ hàng</a></div>
                    </div>  
                </div> 
                <div class="table-responsive block-right ">
                    <h5 className="ms-4 mb-3 mt-3">Đơn hàng</h5>
                    <table class="table">
                        
                        <tbody>
                        <tr>
                                <td>
                                    <div className=" display-flex">
                                        <a className="" href="#"><img className="image" src={require('./../assets/images/banner_img_02.jpg')} alt="Product"/></a>
                                        <div className="ms-1 mt-1">
                                            <p ><a className=" fontSize"
                                                href="#">Áo</a></p>
                                            <p className=" fontSize ">Size: L</p>
                                            <p className=" fontSize ">Color: Black</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center">2</td>
                                <td className="text-center">19000</td>
                            </tr>
                        </tbody>
                    </table>
                
                    <table class="table">
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
                    <div class="shopping-cart-footer">
                    <div class="column">
                        <a class="btn btn-success" href="#"> Đặt hàng </a></div>
                </div>
                </div>
            </div>
        
    </>

}

export default userLayout(TheOrderPage);