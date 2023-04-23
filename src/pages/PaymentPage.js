import React, { useContext, useEffect, useRef, useState } from "react";
import userLayout from "../user/userLayout";
import "./../assets/css/user-view.css";
const PaymentPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const order_id = urlParams.get('order_id');
    const status = urlParams.get('status');
    const message = urlParams.get('message');
    const vnp_TransactionNo = urlParams.get('vnp_TransactionNo');


    return (
        <div>
            <div className="bg">
                <div className="form">
                    <div className="form-toggle"></div>
                    <div className="form-header mt-5">
                        <h1>{status == "true" ? "Thành công" : "Thất bại"}</h1>
                    </div>
                    <div className="form-content mb-5">
                        {
                            status == "true" ?
                                <div>
                                    <div className="payment">Giao dịch VnPay: Mã {vnp_TransactionNo} cho đơn hàng {order_id} đã thanh toán thành công </div>
                                    <div className="payment mx-5">Thời gian giao hàng linh động từ 3 - 4  ngày tùy khu vực, đôi khi sẽ nhanh hơn hoặc chậm hơn. </div>
                                    <div className="payment">Mọi thông tin xin vui lòng liên hệ Hotline: 012 345 6789 </div>
                                </div>
                                :
                                <div>
                                    <div className="payment">Thanh toán không thành công</div>
                                    <div className="payment">Mọi thông tin xin vui lòng liên hệ Hotline: 012 345 6789 </div>
                                </div>

                        }

                        <div className="mt-4 row payment">
                            <div className="Payment col">
                                <button variant="primary" type="submit" >Đi đến trang chủ</button>
                            </div>
                            <div className="Payment col">
                                <button variant="primary" type="submit" >Xem đơn đặt hàng</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
export default userLayout(PaymentPage);