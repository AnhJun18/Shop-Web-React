import { useEffect, useState } from "react";
import adminLayout from "../admin/adminLayout";
import axiosApiInstance from "../context/interceptor";
import axios from "../api/axios";
import { toast } from 'react-toastify';
import { Button, Form, Modal } from "react-bootstrap"
import { useLocation } from "react-router-dom";
import ReactLoading from "react-loading";


const PromotionPage = () => {
    const [load, setLoad] = useState(false);
    const [show, setShow] = useState(false);
    const [promotion_id, setId] = useState();
    const [promotion_value, setValue] = useState();
    const [promotion_name, setName] = useState();
    const [promotion_description, setDescription] = useState();
    const [promotion_startDate, setstartDate] = useState();
    const [promotion_endDate, setendDate] = useState();
    const [listProductApply, setListProductApply] = useState([]);
    const [listAllProduct, setAllProduct] = useState([]);
    const [listPromotion, setListPromotion] = useState([]);
    const [showDetail, setShowDetail] = useState(false);


    const handleClose = () => {
        setShow(false);
        setShowDetail(false)
    };
    const handleShowAdd = (e) => {
        setShow(true);
    }

    async function getProduct() {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/product/all`)
        let listTMP = []
        result?.data.forEach(element => {
            const { id, name, linkImg } = element
            listTMP.push({ id, name, linkImg, status: false })
        });
        setAllProduct(listTMP)
        setLoad(true);

    }

    const ClickShowProduct = async (e) => {
        setShowDetail(true);
        const tmpID = parents(e.target).find(function (c) {
            return c.tagName === "TR"
        }).children[0].innerText;
        setId(tmpID)
        const re = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/admin/promotion/list-product/${tmpID}`)
        setListProductApply(re.data)

        var listNew = []
        listAllProduct.forEach((item) => {
            var st = false;
            re.data.forEach((i) => {
                if (i[0] === item.id)
                    st = true
            })
            if (st)
                item.status = true
            else
                item.status = false
            listNew.push(item)
        })
        setListProductApply(listNew)
    }
    const ClickDeletePromotion = async (e) => {

        const tmpID = parents(e.target).find(function (c) {
            return c.tagName === "TR"
        }).children[0].innerText;
        const urlForm = `/api/admin/promotion/${tmpID}`;
        const re = await axiosApiInstance.delete(axiosApiInstance.defaults.baseURL + urlForm)
        if (re.data.status === 200) {
            toast.success("Khuyến mãi đã được xóa");
            await getPromotion()
            setShow(false);
        } else
            toast.error("Khuyến mãi đã được sử dụng. Không thể xóa");
    }
    async function getPromotion() {

        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/admin/promotion/all`);
        setLoad(true)
        setListPromotion(result.data);
        console.log(result.data)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let startDate = promotion_startDate + "T00:00:00.740Z"
        let endDate = promotion_endDate + "T23:59:00.740Z"
        //"2023-05-29T09:54:17.740Z"
        const params = {
            value: promotion_value,
            name: promotion_name,
            description: promotion_description,

            startDate: startDate,
            endDate: endDate,
        }

        const urlForm = `/api/admin/promotion`;
        const re = await axiosApiInstance.post(axiosApiInstance.defaults.baseURL + urlForm, params)
        if (re.status === 200) {
            toast.success("Thêm khuyến mãi thành công");
            await getPromotion()
            setShow(false);
        } else
            toast.error("Thêm khuyến mãi không thành công! Thử lại ");
    }
    function parents(node) {
        let current = node,
            list = [];
        while (current.parentNode != null && current.parentNode != document.documentElement) {
            list.push(current.parentNode);
            current = current.parentNode;
        }
        return list
    }
    const handleCheck = (e) => {
        console.log(e.target.title)
        console.log(promotion_id)
        var body={
            "promotionID": promotion_id,
            "listProductID": [
                e.target.title
            ]
          }
        const re = axiosApiInstance.post('/api/admin/promotion/addProduct',body)
        console.log(re.data)
        var listNew = []
        listAllProduct.forEach((item) => {
            if (e.target.title == item.id){
                item.status = !item.status
            }
            listNew.push(item)
        })
        setListProductApply(listNew)
    }
    useEffect(() => {
        getPromotion()
        getProduct()
    }, {})
    return (
        <>{
            load ?
                <div>
                    <div className="table-container" style={{ width: '100%' }}>
                        <div className="row">
                            <div className="col">
                                <h5 className="pb-2 mb-0">Danh sách Khuyến mãi</h5>
                            </div>
                            <div className="col text-right">
                                <button className="btn btn-default low-height-btn" onClick={handleShowAdd}>
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div className="d-flex text-muted overflow-auto">
                            <table className="table table-image">
                                <thead>
                                    <tr>
                                        <th scope="col" className="col-1">Mã KM</th>
                                        <th scope="col" className="col-2">Tên</th>
                                        <th scope="col" className="col-2">%KM</th>
                                        <th scope="col" className="col-2">Mô tả</th>
                                        <th scope="col" className="col-2">Ngày bắt đầu</th>
                                        <th scope="col" className="col-2">Ngày kết thúc</th>
                                        <th scope="col" className="col-1"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listPromotion.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item?.name}</td>
                                            <td>{item?.value}</td>
                                            <td>{item?.description}</td>
                                            <td>{(item?.startDate)?.slice(0, 19).replace("T", " ")}</td>
                                            <td>{(item?.endDate)?.slice(0, 19).replace("T", " ")}</td>
                                            <td style={{ whiteSpace: 'nowrap' }}>
                                                <button type="button"
                                                    className="btn btn-outline-primary btn-light btn-sm mx-sm-1 px-lg-2 w-32"
                                                    title="Chi tiết" onClick={ClickShowProduct}><i className="fa fa-info"
                                                        aria-hidden="true"></i>
                                                </button>
                                                <button type="button"
                                                    className="btn btn-outline-warning btn-light btn-sm mx-sm-1 px-lg-2 w-32"
                                                    title="Chỉnh sửa"><i className="fa fa-pencil"
                                                        aria-hidden="true"></i>
                                                </button>
                                                <button type="button"
                                                    className="btn btn-outline-danger btn-light btn-sm mx-sm-1 px-lg-2 w-32"
                                                    title="Delete" onClick={ClickDeletePromotion}><i className="fa fa-lock"
                                                        aria-hidden="true"></i>
                                                </button>
                                            </td>
                                        </tr>))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Khuyến mãi</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-2">
                                    <Form.Control type="text" placeholder="Tên Khuyến Mãi" name="name"
                                        value={promotion_name} onChange={(e) => setName(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Control type="text" placeholder="% Khuyến Mãi" name="value"
                                        value={promotion_value} onChange={(e) => setValue(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Control type="text" placeholder="Mô tả" name="description"
                                        value={promotion_description} onChange={(e) => setDescription(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Control type="date" name="startDate"
                                        value={promotion_startDate} onChange={(e) => setstartDate(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Control type="date" name="endDate"
                                        value={promotion_endDate} onChange={(e) => setendDate(e.target.value)} />
                                </Form.Group>
                                <Button variant="success" type="submit" >
                                    Tạo Khuyến Mãi
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={showDetail} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Sản phẩm</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                {listProductApply.length ?
                                    <table className="table ">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="col-2">id</th>
                                                <th scope="col" className="col-2">Tên Sản Phẩm</th>
                                                <th scope="col" className="col-2">Hình ảnh</th>
                                                <th scope="col" className="col-2">Giá</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>{
                                            listAllProduct.map((item) =>
                                                <tr>
                                                    <th >{item.id}</th>
                                                    <th >{item.name}</th>
                                                    <td className="tdImage w-25">
                                                        <img
                                                            src={item.linkImg}
                                                            width="50" height="50" className="img-fluid img-thumbnail"
                                                            alt="Sheep" />
                                                    </td>

                                                    <th ><input type="checkbox"
                                                        title={item.id}
                                                        onChange={handleCheck}
                                                        checked={item.status}></input></th>
                                                </tr>
                                            )}

                                        </tbody>
                                    </table>
                                    : "Không có sản phẩm nào áp dụng"
                                }
                                {/* <Button variant="success" type="submit" >
                                    Tạo Khuyến Mãi
                                </Button> */}
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                :
                <div className={"center loading"}>
                    <ReactLoading type={'cylon'} color='#fffff' height={'33px'} width={'9%'} />
                </div>
        }
        </>
    );

};
export default adminLayout(PromotionPage);