import {useContext, useState, useEffect, useRef} from "react";
import {Checkbox} from "@mui/material";
import React from "react";
import userLayout from "../user/userLayout"
import "./../assets/css/user-view.css";
import axiosApiInstance from "../context/interceptor";
import InputSpinner from 'react-bootstrap-input-spinner'
import {toast} from "react-toastify";
import axios from "../api/axios";

const CartPage = () => {

    const [myCart, setMyCart] = useState([]);
    const [status, setStatus] = useState(true);
    const [tmp, setTmp] = useState(0);


    async function getCart() {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/cart/all`)
        setMyCart(result?.data)
    }

    const handleUpdateCart =  (item, amount) => {
        const body={
            "productID": item?.product?.id,
            "amount": amount
        }
         axios({
                method: 'put',
                url: axiosApiInstance.defaults.baseURL + `/api/cart/update`,
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("tokens")).data.accessToken}`,
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                data: body
            });



    }

    const handleDeleteItem = async (e) => {
        const result = await axiosApiInstance.delete(axiosApiInstance.defaults.baseURL + `/api/cart/${e.target.id}`)
        if(result?.data?.status ===200){
            toast.success("Sản phẩm đc được xóa khỏi giỏ hàng của bạn!")
            setTmp(tmp+1)
        }
        else
            toast.error("Lỗi! Vui lòng thử lại")
    }

    useEffect(() => {
        getCart()
    }, [tmp])
    useEffect(() => {
        getCart()
    }, [])

    return <>
        {status ?
            <div class="container padding-bottom-3x marginTop marginBot">
                <div class="table-responsive shopping-cart">
                    <h3 className="ms-5 mb-3 mt-1">Giỏ hàng</h3>
                    <table class="table">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Sản phẩm</th>
                            <th class="text-center">Đơn giá</th>
                            <th class="text-center">Số Lượng</th>
                            <th class="text-center">Số tiền</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {myCart.map((item) =>
                            <tr>
                                <td><input type="checkbox" value={false}></input></td>
                                <td>
                                    <div className="product-item">
                                        <a className="product-thumb" href="#"><img
                                            src={item.product?.infoProduct?.linkImg} alt="Product"/></a>
                                        <div className="product-info">
                                            <h4 className="product-title"><a
                                                href="#">{item.product?.infoProduct?.name}</a></h4>
                                            <span><em>Size:</em> {item.product?.size}</span>
                                            <span><em>Color:</em> {item.product?.color}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center text-lg text-medium price_txt">{item.product?.infoProduct?.price.toLocaleString('vi', {
                                    style: 'currency',
                                    currency: 'VND'
                                })}</td>
                                <td className="text-center ">
                                    <div className="count-input spinner_input">
                                        <InputSpinner
                                            type={'int'}
                                            precision={0}
                                            max={100}
                                            min={1}
                                            step={1}
                                            value={item?.amount}
                                            onChange={(e) => handleUpdateCart(item, e)}
                                            variant={'info'}
                                            size="sm"
                                        />
                                    </div>
                                </td>
                                <td className="text-center text-lg text-medium">{(item.product?.infoProduct?.price * item?.amount).toLocaleString('vi', {
                                    style: 'currency',
                                    currency: 'VND'
                                })}</td>
                                <td className="text-center">
                                    <button className="remove-from-cart" onClick={handleDeleteItem}
                                            data-toggle="tooltip" title=""
                                            data-original-title="Remove item"><i id={item?.product?.id}
                                        className="fa fa-trash"></i></button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div class="shopping-cart-footer">
                    <div class="column text-lg">Subtotal: <span class="text-medium">$289.68</span></div>
                </div>
                <div class="shopping-cart-footer">
                    <div class="column"><a class="btn btn-outline-secondary" href="/shop"><i
                        class="icon-arrow-left"></i>&nbsp;Back to Shopping</a></div>
                    <div class="column">
                        <a class="btn btn-success" href="#">Đặt hàng</a></div>
                </div>
            </div>
            :
            <div class="container padding-bottom-3x marginTop marginBot">
                <h3 className="ms-5 mb-3 mt-1">Giỏ hàng</h3>
                <p className="ms-3 mt-2">Không có sản phẩm trong giỏ hàng</p>
                <div class="column ms-3"><a class="btn btn-outline-secondary mt-5" href="/shop"><i
                    class="icon-arrow-left"></i>&nbsp;Back to Shopping</a></div>
            </div>
        }

    </>

}

export default userLayout(CartPage);