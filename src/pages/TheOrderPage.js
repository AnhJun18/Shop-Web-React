import React, { useEffect, useState } from "react";
import "./../assets/css/order.css";
// import "./../assets/css/user-view.css";
import userLayout from "../user/userLayout"
//import axiosApiInstance from "../context/interceptor";
//import axios from "../api/axios";
import { useLocation, useNavigate } from "react-router-dom";
import axiosApiInstance from "../context/interceptor";
import axios from "../api/axios";
import { toast } from "react-toastify";


const TheOrderPage = () => {

    const location = useLocation();
    const navigate = useNavigate()
    const cart = location.state;
    const [load, setLoad] = useState(true)
    const [profile, setProfile] = useState({})
    const [province, setProvince] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [feeShip, setFeeShip] = useState(0)
    const [tmpMoney, setMoney] = useState(0)
    const [nameReceiver, setName] = useState()
    const [phoneReceiver, setPhone] = useState()
    const [address, setAddressShow] = useState()

    useEffect(() => {
        let t = 0
        cart.forEach((i) => {
            t += i?.amount * i.product.infoProduct.price
        })
        setMoney(t)
    }, [])

    const [order, setOrder] = useState({})

    async function getProfile() {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/user/profile`);
        setLoad(true)
        const data = result?.data?.userInfo
        setProfile(data)

        setName((data?.firstName ? data.firstName : '') + ' ' + (data?.lastName ? data.lastName : ''))
        setPhone(data?.phone)

        order.district = data.district
        order.province = data.province
        order.ward = data.ward
        order.address = data.address
        setOrder(order)
        setAddressShow(data?.address + ', ' + data?.ward + ', ' + data?.district + ', '+ data?.province)
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
        console.log("PPASPo")
        if(!order.province || !order.district)
           return;
        const param = {
            "province": order?.province,
            "district": order.district,
            "weight": 500,
            "value": tmpMoney,
        }
        console.log(param)
        const result = await axiosApiInstance.get(axios.defaults.baseURL + '/api/ship/ghtk/fee', { params: param });
        setFeeShip(result?.data?.total_ship_fee)

    }
    const handleInfor = (e) => {
        setAddressShow(order?.address)
        setLoad(false)
    }
    const changeName = (e) => {
        setName(e.target.value)
    }

    const changePhone = (e) => {
        setPhone(e.target.value)
    }

    const changeAddress = (e) => {
        setAddressShow(e.target.value)
    }

    const changeProvince = (e) => {
        order.province = e.target.value
        order.district = null
        order.ward = null
        setOrder(order)
        setDistricts(province.find(i => i.name === e.target.value).districts)
        
    }

    const changeDistricts = (e) => {
        setWards(districts.find(i => i.name === e.target.value).wards)
        order.district = e.target.value
        order.ward = null
        setOrder(order)
        getFeeShip()
    }
    const changeWard = (e) => {
        order.ward = e.target.value
        setOrder(order)
    }

    const handleConfirmOrder = async () => {
        const productOrder = []
        cart.forEach((i) => {
            productOrder.push({ "product_id": i?.product?.id, "amount": i.amount })
        })
        const payload = {
            "nameReceiver": nameReceiver,
            "address": `${address}, ${order.address}, ${order.district}, ${order.province}`,
            "phoneReceiver": phoneReceiver,
            "feeShip": feeShip,
            "note": "none",
            "listProduct": productOrder
        }
       

        if (payload.address && payload.phoneReceiver && payload.nameReceiver) {
            const result = await axiosApiInstance.post(axiosApiInstance.defaults.baseURL + `/api/order/create`, payload)
            if (result?.data.status) {
                toast.success("Đơn hàng đã được tạo")
                navigate('/home');
            }
            else {
                toast.success("Vui lòng kiểm tra thông tin! " + result?.data.message)
            }
        } else {
            toast.error("Vui lòng nhập đầy đủ thông tin!")
        }


    }
    useEffect(async () => {
        await getProfile();
        getFeeShip();
        getProvince();

    }, [])

   
    return <>{
        location ?
            <div className="margin-left-right padding-bottom-3x marginTop marginBot row">
                <div className="table-responsive block-left  ms-2 ">
                    <h5 className="ms-4 mb-3 mt-3">Thông tin khách hàng</h5>
                    {load ?
                        <div>
                            <div className="form-wrapper">
                                <div className="borderForm">
                                    <div className="field field_v1 ms-4">
                                        <label for="first-name" className="ha-screen-reader">Họ tên</label>
                                        <input id="nameReceiver"
                                            defaultValue={nameReceiver}
                                            onChange={changeName} className="field__input" placeholder=" " disabled></input>
                                        <span className="field__label-wrap" aria-hidden="true">
                                            <span className="field__label">Họ tên</span>
                                        </span>
                                    </div>
                                    <div className="field field_v1 ms-4">
                                        <label for="first-name" className="ha-screen-reader">Số điện thoại</label>
                                        <input id="phoneReceiver" defaultValue={phoneReceiver} disabled className="field__input" onChange={changePhone}
                                            placeholder=" "></input>
                                        <span className="field__label-wrap" aria-hidden="true">
                                            <span className="field__label">Số điện thoại</span>
                                        </span>
                                    </div>
                                    <div className="field field_v1 ms-4 mb-2">
                                        <label htmlFor="first-name" className="ha-screen-reader">Địa chỉ</label>
                                        <input id="address" className="field__input" disabled defaultValue={address} onChange={changeAddress}
                                            placeholder=" "></input>
                                        <span className="field__label-wrap" aria-hidden="true">
                                            <span className="field__label">Địa chỉ</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <a className="changePass ms-5 mt-5" onClick={handleInfor}> Đổi thông tin</a>
                        </div>
                        :
                        <form onSubmit={handleConfirmOrder}>
                            <div className="field field_v1 ms-4">
                                <label for="first-name" className="ha-screen-reader">Họ tên</label>
                                <input id="nameReceiver"
                                    defaultValue={nameReceiver}
                                    onChange={changeName} required className="field__input" placeholder=" " ></input>
                                <span className="field__label-wrap" aria-hidden="true">
                                    <span className="field__label">Họ tên</span>
                                </span>
                            </div>
                            <div className="field field_v1 ms-4">
                                <label for="first-name" className="ha-screen-reader">Số điện thoại</label>
                                <input id="phoneReceiver" required defaultValue={phoneReceiver} className="field__input" onChange={changePhone}
                                    placeholder=" "></input>
                                <span className="field__label-wrap" aria-hidden="true">
                                    <span className="field__label">Số điện thoại</span>
                                </span>
                            </div>

                            <div className="row mb-3">
                                <div className="field field_v1 ms-4 col">
                                    <label className="ha-screen-reader">Tỉnh/thành</label>
                                    <select className="field__input" placeholder=" " required onChange={changeProvince}>
                                        <option value={order?.province}>{order?.province}</option>
                                        {province?.map(i => <option>{i.name}</option>)}
                                    </select>
                                    <span className="field__label-wrap" aria-hidden="true">
                                        <span className="field__label">Tỉnh/thành</span>
                                    </span>
                                </div>
                                <div className="field field_v1 ms-3 col">
                                    <label className="ha-screen-reader">Quận/huyện</label>
                                    <select className="field__input" required placeholder=" " onChange={changeDistricts}>
                                        {
                                            order.district ?
                                                <option value={order?.district}>{order?.district}</option>
                                                : <option value="">Quận/huyện</option>
                                        }
                                        {districts?.map(i => <option>{i.name}</option>)}
                                    </select>
                                    <span className="field__label-wrap" aria-hidden="true">
                                        <span className="field__label">Quận/huyện</span>
                                    </span>
                                </div>
                                <div className="field field_v1 ms-3 col">
                                    <label className="ha-screen-reader">Phường/xã</label>
                                    <select className="field__input" required placeholder=" " onChange={changeWard}>
                                        {
                                            order.ward ?
                                                <option value={order?.ward}>{order?.ward}</option>
                                                : <option value="">Chọn Phường/xã</option>
                                        }
                                        {wards?.map(i => <option>{i.name}</option>)}
                                    </select>
                                    <span className="field__label-wrap" aria-hidden="true">
                                        <span className="field__label">Phường/xã</span>
                                    </span>
                                </div>
                            </div>
                            <div className="field field_v1 ms-4 mb-2">
                                <label htmlFor="first-name" required className="ha-screen-reader">Địa chỉ</label>
                                <input id="address" className="field__input" defaultValue={address} onChange={changeAddress}
                                    placeholder=" "></input>
                                <span className="field__label-wrap" aria-hidden="true">
                                    <span className="field__label">Địa chỉ</span>
                                </span>
                            </div>
                        </form>

                    }

                    <h5 className="ms-4 mb-3 mt-1">Phương thức vận chuyển</h5>
                    <div className="radio-wrapper">
                        <label className="radio-lable borderForm">
                            <div className="radio-input">
                                <input type="radio" checked="true" className="me-2 mt-3 ms-5 "></input>
                            </div>
                            <span className="radio-input font">Giao hàng tận nơi (thời gian giao hàng dự kiến từ 3 ~ 4 ngày,
                                có thể lâu hơn vì các vấn đề bất khả kháng, mong Quý KH đợi đơn hàng giúp shop.
                                Chân thành cảm ơn)</span>
                            <span className="font"></span>
                        </label>
                    </div>
                    <h5 className="ms-4 mb-2 mt-1">Phương thức thanh toán</h5>

                    <div className="field field_v1 ms-4 mb-5">
                        <label for="first-name" className="ha-screen-reader">Phương thức thanh toán</label>
                        <input type="radio" id="gender" value="Nam" name="fav_language" checked="true"
                            className="me-2 mt-3 ms-5 "></input>
                        <label htmlFor="nam" className="mt-3">Thanh toán khi nhận hàng</label>

                    </div>
                    <div className="shopping-cart-footer">
                        <div><a className="btn btn-outline-secondary mt-2 w-25 mb-2" href="/cart"><i
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
                                                alt="Product" /></a>
                                            <div className="ms-2">
                                                <p><b className=" fontSize">{item?.product?.infoProduct?.name}</b></p>
                                                <p className=" fontSize ">Size: {item?.product?.size}</p>
                                                <p className=" fontSize ">Color: {item?.product?.color}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center">x{item?.amount}</td>
                                    <td className="text-right">{item?.product?.infoProduct?.price.toLocaleString('vi', {
                                        style: 'currency',
                                        currency: 'VND'
                                    })}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Tạm tính </td>
                                <td className="textAlign"><span>{tmpMoney.toLocaleString('vi', {
                                    style: 'currency',
                                    currency: 'VND'
                                })}</span></td>
                            </tr>
                            <tr>
                                <td>Phí ship </td>
                                <td className="textAlign"><span>{feeShip.toLocaleString('vi', {
                                    style: 'currency',
                                    currency: 'VND'
                                })}</span></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>Tổng tiền </td>
                                <td className="textAlign"><span>{(tmpMoney + feeShip).toLocaleString('vi', {
                                    style: 'currency',
                                    currency: 'VND'
                                })}</span></td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="shopping-cart-footer">
                        <div className="col-10 mt-3 mb-3 m-auto">
                            <button className="btn btn-success w-100" type="submit" onClick={handleConfirmOrder}> Đặt hàng </button>
                        </div>
                    </div>
                </div>
            </div>
            :
            navigate("/cart")
    }</>

}

export default userLayout(TheOrderPage);