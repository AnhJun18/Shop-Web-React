import {useContext, useState, useEffect, useRef} from "react";
import { Checkbox } from "@mui/material";
import React from "react";
import userLayout from "../user/userLayout"
import "./../assets/css/user-view.css";

const CartPage = () => {
    
    const [status, setStatus] = useState(false);
        return <>
            {status?
            <div class="container padding-bottom-3x marginTop marginBot">
                <div class="table-responsive shopping-cart">
                    <h3 className="ms-5 mb-3 mt-1">Giỏ hàng</h3>
                    <table class="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th >Sản phẩm</th>
                                <th class="text-center">Đơn giá</th>
                                <th class="text-center">Số Lượng</th>
                                <th class="text-center">Số tiền</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="checkbox" value={false}></input></td>
                                <td>
                                    <div class="product-item">
                                        <a class="product-thumb" href="#"><img src="https://via.placeholder.com/220x180/FF0000/000000" alt="Product"/></a>
                                        <div class="product-info">
                                            <h4 class="product-title"><a href="#">Unionbay Park</a></h4>
                                            <span><em>Size:</em> 10.5</span>
                                            <span><em>Color:</em> Dark Blue</span>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-center text-lg text-medium">$43.90</td>
                                <td class="text-center">
                                    <div class="count-input">
                                        <input type="number" className="form-control" min="1" max="50" ></input>
                                    </div>
                                </td>
                                <td class="text-center text-lg text-medium">$43.90</td>
                                <td class="text-center"><a class="remove-from-cart" href="#" data-toggle="tooltip" title="" data-original-title="Remove item"><i class="fa fa-trash"></i></a></td>
                            </tr>
                           
                        </tbody>
                    </table>
                </div>
                <div class="shopping-cart-footer">
                    <div class="column text-lg">Subtotal: <span class="text-medium">$289.68</span></div>
                </div>
                <div class="shopping-cart-footer">
                    <div class="column"><a class="btn btn-outline-secondary" href="/shop"><i class="icon-arrow-left"></i>&nbsp;Back to Shopping</a></div>
                    <div class="column">
                        <a class="btn btn-success" href="#">Tiến hành đặt hàng</a></div>
                </div>
            </div>
            :
            <div class="container padding-bottom-3x marginTop marginBot">
                <h3 className="ms-5 mb-3 mt-1">Giỏ hàng</h3>
                <p className="ms-3 mt-2">Không có sản phẩm trong giỏ hàng</p>
                <div class="column ms-3"><a class="btn btn-outline-secondary mt-5" href="/shop"><i class="icon-arrow-left"></i>&nbsp;Back to Shopping</a></div>
                </div>
            }
            
        </>

}

export default userLayout(CartPage);