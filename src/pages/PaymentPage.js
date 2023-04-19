import React, {useContext, useEffect, useRef} from "react";
import userLayout from "../user/userLayout";
import "./../assets/css/user-view.css";
const PaymentPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('order');
    console.log(accessToken)
    return (
        <div>
            <div className="bg">
                <div className="form">
                    <div className="form-toggle"></div>
                    <div className="form-header mt-5">.
                            <h1>Thông báo</h1>
                    </div>
                    <div className="form-content mb-5">
                        <div className="payment">Đơn hàng của bạn được thanh toán thành công </div>
                        <div className="payment mx-5">Thời gian giao hàng linh động từ 3 - 4  ngày tùy khu vực, đôi khi sẽ nhanh hơn hoặc chậm hơn. </div>
                        <div className="payment">Mọi thông tin xin vui lòng liên hệ Hotline: 012 345 6789 </div>
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