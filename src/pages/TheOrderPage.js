import React, {useEffect, useState} from "react";
import "./../assets/css/order.css";
// import "./../assets/css/user-view.css";
import userLayout from "../user/userLayout"
//import axiosApiInstance from "../context/interceptor";
//import axios from "../api/axios";
import {useLocation, useNavigate} from "react-router-dom";
import axiosApiInstance from "../context/interceptor";
import axios from "../api/axios";

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
    const [load, setLoad] = useState(false)
    const [profile, setProfile] = useState({})
    const [total, setTotal] = useState(10000)
    const [province, setProvince] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [order, setOrder] = useState({
        "pick_province": "Thành Phố Hồ Chí Minh",
        "pick_district": "Quận 9",
        "province": "",
        "district": "",
        "address": "",
        "weight": 500,
        "value": 0,
    })


    async function getProfile() {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/user/profile`);
        setLoad(true)
        setProfile(result?.data?.data?.userInfo)

    }

    async function getProvince() {
        const result = await axios({
            method: 'get',
            url: "/api/?depth=3",
            baseURL: "https://provinces.open-api.vn"
        });
        setProvince(result?.data)
    }

    const getFeeShip = async () => {
        const ty = {
            "pick_province": "Hà Nội",
            "pick_district": "Quận Hai Bà Trưng",
            "province": "Hà nội",
            "district": "Quận Cầu Giấy",
            "address": "P.503 tòa nhà Auu Việt, số 1 Lê Đức Thọ",
            "weight": 1000,
            "value": 3000000,
            "transport": "fly",
            "deliver_option": "xteam",
            "tags": [1,7]
        }
        const result = await axios({
            method: "GET",
            url: "/services/shipment/fee",
            timeout: 1000 * 1000,
            baseURL: 'https://services.giaohangtietkiem.vn',
            params: ty,
            headers: {
                "token": "149Df0Eb3719d95A8Bb0c8884241090b36E556Ab",
                "Content-Type" :"application/json"
            },
            maxContentLength: 100000000,
            maxBodyLength: 1000000000
        });
        console.log(result)

    }
    const changeProvince = (e) => {
        setDistricts(province.find(i => i.name === e.target.value).districts)
        order.province = e.target.value
        setOrder(order)
    }

    const changeDistricts = (e) => {
        setWards(districts.find(i => i.name === e.target.value).wards)
        order.district = e.target.value
        setOrder(order)
        getFeeShip()
    }
    useEffect(() => {
        getProfile();
        getProvince()
    }, [])
    return <>{
        location ?
            <div className="margin-left-right padding-bottom-3x marginTop marginBot row">
                <div className="table-responsive block-left  ms-2">
                    <h5 className="ms-4 mb-1 mt-3">Thông tin khách hàng</h5>
                    <div className="field field_v1 ms-4">
                        <label for="first-name" className="ha-screen-reader">Họ tên</label>
                        <input id="nameReceiver"
                               defaultValue={profile.firstName ? profile.firstName : '' + ' ' + profile.lastName ? profile.lastName : ''}
                               className="field__input" placeholder=" "></input>
                        <span className="field__label-wrap" aria-hidden="true">
                            <span className="field__label">Họ tên</span>
                        </span>
                    </div>
                    <div className="field field_v1 ms-4">
                        <label for="first-name" className="ha-screen-reader">Số điện thoại</label>
                        <input id="phoneReceiver" defaultValue={profile?.phone} className="field__input"
                               placeholder=" "></input>
                        <span className="field__label-wrap" aria-hidden="true">
                            <span className="field__label">Số điện thoại</span>
                        </span>
                    </div>
                    <div className="field field_v1 ms-4 mb-2">
                        <label for="first-name" className="ha-screen-reader">Địa chỉ</label>
                        <input id="address" className="field__input" defaultValue={profile?.address}
                               placeholder=" "></input>
                        <span className="field__label-wrap" aria-hidden="true">
                            <span className="field__label">Địa chỉ</span>
                        </span>
                    </div>
                    <div className="row mb-3">
                        <div className="field field_v1 ms-4 col">
                            <label className="ha-screen-reader">Tỉnh/thành</label>
                            <select className="field__input" placeholder=" " onChange={changeProvince}>
                                <option value="">Chọn Tỉnh/thành</option>
                                {province?.map(i => <option>{i.name}</option>)}
                            </select>
                            <span className="field__label-wrap" aria-hidden="true">
                                <span className="field__label">Tỉnh/thành</span>
                            </span>
                        </div>
                        <div className="field field_v1 ms-3 col">
                            <label className="ha-screen-reader">Quận/huyện</label>
                            <select className="field__input" placeholder=" " onChange={changeDistricts}>
                                <option value="">Chọn Quận/huyện</option>
                                {districts?.map(i => <option>{i.name}</option>)}
                            </select>
                            <span className="field__label-wrap" aria-hidden="true">
                                <span className="field__label">Quận/huyện</span>
                            </span>
                        </div>
                        <div className="field field_v1 ms-3 col">
                            <label className="ha-screen-reader">Phường/xã</label>
                            <select className="field__input" placeholder=" ">
                                <option value="">Chọn Phường/xã</option>
                                {wards?.map(i => <option>{i.name}</option>)}
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
                        <input type="radio" id="gender" value="Nam" name="fav_language" checked="true"
                               className="me-2 mt-3 ms-5 "></input>
                        <label htmlFor="nam" className="mt-3">Thanh toán khi nhận hàng</label>

                    </div>
                    <div className="shopping-cart-footer">
                        <div><a className="btn btn-outline-secondary mb-4" href="/cart"><i
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
                                        <a className="" href="#"><img className="image"
                                                                      src={item?.product?.infoProduct?.linkImg}
                                                                      alt="Product"/></a>
                                        <div className="ms-2">
                                            <p><b className=" fontSize">{item?.product?.infoProduct?.name}</b></p>
                                            <p className=" fontSize ">Size: {item?.product?.size}</p>
                                            <p className=" fontSize ">Color: {item?.product?.color}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center">{item?.amount}</td>
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