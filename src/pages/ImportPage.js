import { useEffect, useState } from "react";
import adminLayout from "../admin/adminLayout";
import axiosApiInstance from "../context/interceptor";
import axios from "../api/axios";
import { toast } from 'react-toastify';
import { Button, Form, Modal } from "react-bootstrap"
import { useLocation } from "react-router-dom";
import ReactLoading from "react-loading";


const ImportPage = () => {
    const param = useLocation();

    const [list, setList] = useState([]);
    const [load, setLoad] = useState(false);
    const [listImport, setListImport] = useState([]);
    const [totalPage, setTotalPage] = useState(1)

    const listColor = [
        { "id": 0, "color": 'Trắng' }, { "id": 1, "color": 'Đen' },
        { "id": 2, "color": 'Đỏ' }, { "id": 3, "color": 'Hồng' },
        { "id": 4, "color": 'Xanh' }, { "id": 5, "color": 'Tím' }
    ];
    const listSize = [
        { "id": 0, "size": 'S' }, { "id": 1, "size": 'M' },
        { "id": 2, "size": 'L' }, { "id": 3, "size": 'XL' },
        { "id": 4, "size": 'XLL' }
    ];
    const [listProduct, setListProduct] = useState([]);

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
    }

    const handleShowInfo = (e) => {

        setShow(true);
    }
    const handleShowAdd = (e) => {
        setShow(true);

    }
    const handleSubmitImport = async (e) => {
        e.preventDefault(false);
        let result = null;
        try {
            result = await axios({
                method: 'post',
                url: axiosApiInstance.defaults.baseURL + '/api/warehouse/import',
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("tokens")).data.accessToken}`,
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                data: rows
            });
        } catch (e) {
            toast.error("Vui lòng nhập đầy đủ và chính xác thông tin");
        }

        if (result?.data?.status) {
            toast.success(result?.data?.message);
            newRows([{}]);
            setShow(false);
        } else {
            toast.error(result?.data?.message);

        }
        getListImport()
    }

    const [rows, newRows] = useState([{}])
    const handleAddRow = () => {
        newRows(prev => [...prev, {}])
    }

    async function getAllProduct() {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/product/all`)
        result?.data?.map(a => listProduct.push({ "id": a.id, "name": a.name }));
    }

    async function getProductPaging(page, size) {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/product/get_paging${page}&size=${size}`)
        setLoad(true);
        setList(result?.data.content)
        setTotalPage(result?.data?.totalPages)
    }

    async function getListImport() {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/warehouse/history_import`)
        setLoad(true);
        setListImport(result.data)
    }

    useEffect(() => {
        getAllProduct()
        getListImport()
    }, [])

    useEffect(() => {
        getProductPaging(param.search === '' ? '?page=1' : param.search, 5)

    }, [param]);
    return (
        <>{
            load ?
                <div>
                    <div className="table-container" style={{ width: '100%' }}>
                        <div className="row">
                            <div className="col">
                                <h5 className="pb-2 mb-0">Danh sách đơn nhập hàng</h5>
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
                                        <th scope="col" className="col-3">Mã phiếu nhập</th>
                                        <th scope="col" className="col-4">Ngày nhập</th>
                                        <th scope="col" className="col-3">Tổng số sản phẩm</th>
                                        <th scope="col" className="col-2">Tổng tiền </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listImport.map((item) => (
                                        <tr key={item.id}>
                                            <th scope="row">{item?.id}</th>
                                            <td className="tdName">{item?.createdDate}</td>
                                            <td className="tdName">{item?.totalAmount}</td>
                                            <td className="tdDescribe">{item?.totalMoney.toLocaleString('vi', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}</td>
                                            <td style={{ whiteSpace: 'nowrap' }}>
                                                {/* <button type="button"
                                                    className="btn btn-outline-primary btn-light btn-sm mx-sm-1 px-lg-2 w-32"
                                                    title="Chi tiết" onClick={handleShowInfo}><i className="fa fa-info"
                                                                                                 aria-hidden="true"></i>
                                            </button>
                                            <button type="button"
                                                    className="btn btn-outline-warning btn-light btn-sm mx-sm-1 px-lg-2 w-32"
                                                    title="Chỉnh sửa" onClick={handleShow}><i className="fa fa-pencil"
                                                                                              aria-hidden="true"></i>
                                            </button>*/}
                                            </td>
                                        </tr>))}

                                </tbody>
                            </table>
                        </div>
                        {/*<Pagination refix='product' size={totalPage}/>*/}
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Nhập hàng</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <table className="table ">
                                    <thead>

                                        <tr>
                                            <th scope="col" className="col-3">
                                                Sản phẩm
                                                <i className="fa fa-plus ms-3 add_row" onClick={handleAddRow}></i>
                                            </th>
                                            <th scope="col" className="col-2">Size</th>
                                            <th scope="col" className="col-2">Màu</th>
                                            <th scope="col" className="col-2">Số lượng</th>
                                            <th scope="col" className="col-2">Giá nhập</th>
                                            <th></th>
                                        </tr>

                                    </thead>
                                    <tbody id="table">
                                        {rows.map((row, index) => (
                                            <tr key={index}>
                                                <td><Form.Group className="mb-2">
                                                    <Form.Control as="select" name="product_id" required onChange={e => {
                                                        rows[index].product_id = e.target.value
                                                    }}>
                                                        <option value="">Sản phẩm</option>
                                                        {listProduct.map(i => rows[index].product_id == i.id ?
                                                            <option value={i?.id} selected>{i?.name}</option>
                                                            :
                                                            <option value={i?.id}>{i?.name}</option>
                                                        )}
                                                    </Form.Control>
                                                </Form.Group>
                                                </td>
                                                <td><Form.Group className="mb-2">
                                                    <Form.Control as="select" name="size" required onChange={e => {
                                                        rows[index].size = e.target.value
                                                    }}>
                                                        <option value="">Size</option>
                                                        {listSize.map(item => rows[index].size == item?.size ?
                                                            <option value={item?.size} selected>{item?.size}</option>
                                                            :
                                                            <option value={item?.size}>{item?.size}</option>
                                                        )}
                                                    </Form.Control>
                                                </Form.Group>
                                                </td>
                                                <td><Form.Group className="mb-2">
                                                    <Form.Control as="select" name="color" required onChange={e => {
                                                        rows[index].color = e.target.value
                                                    }}>
                                                        <option value="">Màu</option>
                                                        {listColor.map(item =>
                                                            rows[index].size == item?.color ?
                                                                <option value={item?.color} selected>{item?.color}</option>
                                                                :
                                                                <option value={item?.color}>{item?.color}</option>
                                                        )}
                                                    </Form.Control>
                                                </Form.Group>
                                                </td>
                                                <td><Form.Group className="mb-2">
                                                    <Form.Control type="number" placeholder="Số lượng" name="amount"
                                                        onChange={e => {
                                                            rows[index].numberAdd = e.target.value
                                                        }} value={rows[index].numberAdd} />
                                                </Form.Group>
                                                </td>
                                                <td><Form.Group className="mb-2">
                                                    <Form.Control type="text" placeholder="Giá " name="price"
                                                        onChange={e => {
                                                            rows[index].prices = e.target.value
                                                        }} value={rows[index].prices} />
                                                </Form.Group>
                                                </td>
                                                <td><span onClick={(e) => {
                                                    rows.splice(index, 1);
                                                    parents(e.target).find(function (c) {
                                                        return c.tagName === "TR"
                                                    }).remove()
                                                }}><i className="fa fa-times"></i></span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Button variant="success" type="submit" onClick={handleSubmitImport}>
                                    Tạo đơn nhập
                                </Button>
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
export default adminLayout(ImportPage);