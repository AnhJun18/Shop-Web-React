import {useEffect, useState} from "react";
import adminLayout from "../admin/adminLayout";
import axiosApiInstance from "../context/interceptor";
import {Modal, Button} from "react-bootstrap"
import ReactLoading from "react-loading";
import {toast} from "react-toastify";

const Management = () => {

        const [listOrder, setListOrder] = useState([]);
        const [param, setParam] = useState(
            {});
        const [orderSelected, setOrderSelected] = useState({});
        const [load, setLoad] = useState(false);
        const [loadData, setLoadData] = useState(false);
        const [rand, setRand] = useState(0);

        const status = [
            'Chờ Xác Nhận',
            'Đang Chuẩn Bị Hàng',
            'Đang Vận Chuyển', ,
            'Đã Thanh Toán',
            'Đã Hủy']
        let total = 0;


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
            total = 0;
            setShow(true);
            const idSelected = Number(parents(e.target).find(function (c) {
                return c.tagName == "TR"
            }).children[0].innerText);
            setOrderSelected(listOrder.find(({id}) => id === idSelected))

        }

        const handleSearch = (e) => {
            setLoadData(false)
            const tmp = {}
            Object.assign(tmp, param);
            if (e.target.id === "searchContent")
                tmp.info = e.target.value ? e.target.value : '';
            if (e.target.id === "statusChoose")
                tmp.status = e.target.value ? e.target.value : '';
            if (e.target.id === "fromDate")
                tmp.from = e.target.value ? e.target.value : '';
            if (e.target.id === "toDate")
                tmp.to = e.target.value ? e.target.value : '';
            setParam(tmp);
        }
        const handleSubmit = (e) => {
            e.preventDefault();
        }


        async function getOrder() {
            const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/admin/order/search`, {params: param});
            setListOrder(result?.data?.content);
            setLoad(true);
            setLoadData(true)
        }

        const handleConfirm = async (e) => {
            let query = null;
            if (e.target.id === "bt1")
                query = `/api/admin/order/confirm/id=${orderSelected.id}`
            if (e.target.id === "bt2")
                query = `/api/admin/order/delivery/id=${orderSelected.id}`
            if (e.target.id === "bt3")
                query = `/api/admin/order/paid_order/id=${orderSelected.id}`
            const result = await axiosApiInstance.put(axiosApiInstance.defaults.baseURL + query);
            if (result.data.status) {
                toast.success(result.data.message)
                setRand(rand + 1)
                setShow(false)
            } else {
                toast.error(result.data.message)
            }
        };
        const handleCancelOrder = async () => {
            const confirm = window.confirm("Hủy đơn sẽ ảnh hưởng rất lớn đến khách hàng \n" +
                "Vui lòng hỏi ý kiến của khách hàng trước khi hủy \n " +
                "Xác nhận hủy đơn ? ");
            if (confirm) {
                const result = await axiosApiInstance.delete(axiosApiInstance.defaults.baseURL + `/api/admin/order/cancel_order/id=${orderSelected.id}`);
                if (result.data.status) {
                    toast.success(result.data.message)
                    setRand(rand + 1)
                    setShow(false)
                } else {
                    toast.error(result.data.message)
                }
            }

        };

        useEffect(() => {
            getOrder();

        }, [param, rand])

        return (
            <>{load ?
                <div>
                    <div className="row">
                        <div className="col">
                            <h5 className="pb-2 mb-2">Quản lý đơn hàng</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-5">
                            <div className="input-group">
                                <div className="form-outline">
                                    <input type="search" className="form-control" id="searchContent"
                                           placeholder="Tìm kiếm..." onChange={handleSearch}/>
                                </div>
                                <button type="button" className="btn btn-primary"><i className="fa fa-search"></i></button>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3">
                            <select className="form-control" id="statusChoose" onChange={handleSearch}>
                                <option value="">Tất cả</option>
                                {status.map((cate) => (
                                    <option value={cate} key={cate}>{cate}</option>
                                ))}

                            </select>
                        </div>
                        <div className="col-lg-4 col-md-4 ms-auto">
                            <div className="d-flex">
                                <label className="p-2">Từ</label> <input className="form-control" id="fromDate" type="date"
                                                                     onChange={handleSearch}/>
                                <label className="p-2">Tới</label> <input className="form-control" id="toDate" type="date"
                                                                      onChange={handleSearch}/>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-auto">
                        <table className="table align-items-center mb-0 mt-2">
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
                            {loadData ?
                                listOrder.map(item =>
                                    <tr>
                                        <td>
                                            {item.id}
                                        </td>
                                        <td>
                                            {(item.createdDate).slice(0, 19).replace("T", " ")}
                                        </td>
                                        <td>
                                            {item?.nameReceiver}
                                        </td>
                                        <td>
                                            {item?.phoneReceiver}
                                        </td>
                                        <td>
                                            <span
                                                className={item?.status?.name === status.at(0) ? "badge  alert-warning" :
                                                    item?.status?.name === status.at(1) ? "badge  alert-success" :
                                                        item?.status?.name === status.at(2) ? "badge  alert-secondary" :
                                                            item?.status?.name === status.at(3) ? "badge  alert-info" :
                                                                item?.status?.name === status.at(4) ? "badge  alert-primary" :
                                                                    "badge alert-danger"}>{item?.status?.name}</span>
                                        </td>
                                        <div style={{display: "none"}}>
                                            {total = 0}
                                            {item?.orderDetails?.map(item => {
                                                total += item.amount * item.prices;
                                            })
                                            }</div>


                                        <td className="text-right">
                                            {(total + item?.feeShip).toLocaleString('vi', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}
                                        </td>
                                        <div style={{display: "none"}}>  {total = 0}</div>
                                        <td className="align-middle">
                                            {item?.status?.name === status.at(3) || item?.status?.name === status.at(4) ?
                                                <button type="button" className="btn btn-outline-secondary btn-sm w-32"
                                                        onClick={handleShow}>
                                                    <i className="fa fa-info"/>
                                                </button> :
                                                <button type="button" onClick={handleShow} className="btn btn-outline-primary btn-sm me-2 w-32">
                                                    <i className="fa fa-pencil" />
                                                </button>
                                            }
                                        </td>
                                    </tr>
                                ) : <div className="ml30 color-dot-light">
                                    Loading..............
                                </div>
                            }

                            </tbody>
                        </table>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="ctm">
                                {/*<div className="shop_id">Id: {orderSelected?.id}</div>*/}
                                <div className="ctm_name">Họ tên: <div
                                    className="pull-right">{orderSelected?.nameReceiver}</div>
                                </div>
                                <div className="ctm_phone">Điện thoại: <div
                                    className="pull-right">{orderSelected?.phoneReceiver}</div></div>
                                <div className="ctm_address">Địa chỉ: <div
                                    className="pull-right">{orderSelected?.address}</div></div>
                            </div>
                            <div className="detail_order overflow-auto">
                                {orderSelected?.orderDetails?.map((item) =>
                                    <div className="item_product">
                                        {/*<div className="item_id">{item.id}</div>*/}
                                        <div className="item_product_left">
                                            {item?.productDetail?.infoProduct?.linkImg ? (
                                                <div className="item_img"><img
                                                    src={item?.productDetail?.infoProduct?.linkImg}/>
                                                </div>) : null}
                                        </div>
                                        <div className="item_product_right">
                                            <div className="item_name">{item?.productDetail?.infoProduct?.name}</div>
                                            <div className="item_qty me-2">x{item.amount}</div>
                                            <div className="item_price me-2">{item.prices.toLocaleString('vi', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}</div>
                                            <div style={{display: "none"}}>  {total += item.amount * item.prices}</div>

                                        </div>
                                    </div>)}
                            </div>

                            <div className="shipping_price">Phí vận chuyển <div
                                className="pull-right">{orderSelected?.feeShip?.toLocaleString('vi', {
                                style: 'currency',
                                currency: 'VND'
                            })}</div></div>
                            <div className="total_price">Tổng Tiền <div
                                className="pull-right">{(orderSelected?.feeShip + total)?.toLocaleString('vi', {
                                style: 'currency',
                                currency: 'VND'
                            })}</div></div>
                        </Modal.Body>
                        <Modal.Footer>

                            {orderSelected?.status?.name === status.at(0) ?
                                <div>
                                    <Button className="me-4" variant="danger" id="btnHuy" onClick={handleCancelOrder}>
                                        Hủy Đơn
                                    </Button>
                                    <Button variant="success" id="bt1" onClick={handleConfirm}>
                                        Duyệt đơn
                                    </Button>
                                </div>
                                : orderSelected?.status?.name === status.at(1) ?
                                    <Button variant="info" id="bt2" onClick={handleConfirm}>
                                        Giao hàng
                                    </Button>
                                    : orderSelected?.status?.name === status.at(2) ?
                                        <Button variant="primary" id="bt3" onClick={handleConfirm}>
                                            Xác nhận thanh toán
                                        </Button> :
                                        null
                            }


                        </Modal.Footer>
                    </Modal>
                </div>
                :
                <div className={"center flex flex-space-around"}>
                    <ReactLoading type={'balls'} color='#ccc' height={'100px'} width={'60px'}/>
                </div>


            }
            </>
        );

    }
;
export default adminLayout(Management);