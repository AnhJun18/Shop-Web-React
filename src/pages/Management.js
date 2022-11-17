import {useContext, useState, useEffect, useRef} from "react";
import adminLayout from "../admin/adminLayout";
import axiosApiInstance from "../context/interceptor";
import axios from "../api/axios";
import {toast} from 'react-toastify';
import {Form, Button, Modal} from "react-bootstrap"
import Pagination from "../components/Pagination";
import {dividerClasses} from "@mui/material";

const Management = () => {

    const [listOrder, setListOrder] = useState([]);
    const [param, setParam] = useState('Chờ Xác Nhận');
    const [orderSelected, setOrderSelected] = useState({});


    function parents(node) {
        let current = node,
            list = [];
        while (current.parentNode != null && current.parentNode != document.documentElement) {
            list.push(current.parentNode);
            current = current.parentNode;
        }
        return list
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        setShow(true);
        const idSelected = Number(parents(e.target).find(function (c) {
            return c.tagName == "TR"
        }).children[0].innerText);
        setOrderSelected(listOrder.find(({id}) => id === idSelected))

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(orderSelected)
    }


    async function getOrder() {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/admin/order/status=${param}`);
        setListOrder(result?.data);
        console.log(result)
    }

    useEffect(() => {
        getOrder();

    }, [param])

    return (
        <>{

            <div>
                <div className="row">
                    <div className="col">
                        <h5 className="pb-2 mb-0">Quản lý đơn hàng</h5>
                    </div>
                </div>
                <table className="table align-items-center mb-0">
                    <thead>
                    <tr>
                        <th>Ngày tạo</th>
                        <th>Mã đơn hàng</th>
                        <th>Thông tin đặt hàng</th>
                        <th>Sđt</th>
                        <th>Trạng thái</th>
                        <th className="text-right">Thành tiền</th>
                        <th>Xác nhận</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {listOrder.map(item =>
                        <tr>
                            <td>
                                {item.id}
                            </td>
                            <td>
                                {(item.createdDate).slice(0, 19).replace("T", " ")}
                            </td>
                            <td>
                                {item?.userInfo?.firstName + ' ' + item?.userInfo?.lastName}
                            </td>
                            <td>
                                {item?.userInfo?.phone}
                            </td>
                            <td>
                                <span className="badge alert-primary">{item?.status?.name}</span>
                            </td>
                            <td className="text-right">
                                100.000đ
                            </td>
                            <td className="align-middle">
                                <button type="button" className="btn btn-outline-primary btn-sm me-2">
                                    <i className="fa fa-info"/>
                                </button>
                                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleShow}>
                                    <i className="fa fa-pencil"/>
                                </button>
                            </td>
                        </tr>
                    )}

                    </tbody>
                </table>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div class="ctm">
                            {/*<div className="shop_id">Id: {orderSelected?.id}</div>*/}
                            <div className="ctm_name">Họ tên: <div class="pull-right">{orderSelected?.userInfo?.firstName + " " + orderSelected?.userInfo?.firstName}</div></div>
                            <div className="ctm_phone">Điện thoại: <div class="pull-right">{orderSelected?.userInfo?.phone}</div></div>
                            <div className="ctm_address">Địa chỉ: <div class="pull-right">{orderSelected?.userInfo?.address}</div></div>
                        </div>
                        {orderSelected?.orderDetails?.map((item) =>
                            <div className="item_product">
                                {/*<div className="item_id">{item.id}</div>*/}
                                <div className="item_product_left">
                                    {item?.productDetail?.infoProduct?.linkImg ? (<div className="item_img"><img src={item?.productDetail?.infoProduct?.linkImg}/></div>) : null}
                                </div>
                                <div className="item_product_right">
                                    <div className="item_name">{item?.productDetail?.infoProduct?.name}</div>
                                    <div className="item_qty">x{item.amount}</div>
                                    <div className="item_price">{item.prices}</div>
                                </div>
                            </div>)}

                            <div className="shipping_price">Phí vận chuyển <div className="pull-right">{orderSelected?.feeShip}</div></div>
                            <div className="total_price">Tổng Tiền <div className="pull-right">10000 vnđ</div></div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Duyệt đơn
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>


        }
        </>
    );

}
export default adminLayout(Management);