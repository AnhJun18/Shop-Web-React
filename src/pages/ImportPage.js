import {useContext, useState, useEffect, useRef} from "react";
import adminLayout from "../admin/adminLayout";
import axiosApiInstance from "../context/interceptor";
import axios from "../api/axios";
import {render} from "react-dom";
//import {alignPropType} from "react-bootstrap/types";
import {toast} from 'react-toastify';
import {Form, Button, Modal} from "react-bootstrap"

import Pagination from "../components/Pagination";
import {useLocation} from "react-router-dom";

const ImportPage = () => {
    const param = useLocation();

    const [list, setList] = useState([]);
    const [load, setLoad] = useState(false);
    const [totalPage, setTotalPage] = useState(1)
    const [quantity, setQuantity] = useState(1)
    const [listCate, setListCate] = useState([]);
    const [editForm, setEditForm] = useState(false);
    const [modalForm, setModalForm] = useState(false);


    const [product_id, setId] = useState();
    const [product_name, setName] = useState();
    const [product_image, setImage] = useState();
    const [product_category, setCategory] = useState();
    const [product_sold, setSold] = useState();
    const [product_describe, setDescribe] = useState();

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
        setEditForm(true);
    }

    const handleShowInfo = (e) => {
        
        setShow(true);
    }
    const handleShowAdd = (e) => {
        setModalForm(true);
        setShow(true);
        setEditForm(false);
        setId(null);
        setName(null);
        setDescribe(null);
        setCategory(null);
        setSold(null);
        setImage(null);

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let tokensData = JSON.parse(localStorage.getItem("tokens"))
        const params = {
            describe: product_describe,
            name: product_name,
            category: product_category,
            price: product_sold,
        }
    }

    async function getProduct(page, size) {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/product/getpaging${page}&size=${size}`)
        setLoad(true);
        setList(result?.data.content)
        setTotalPage(result?.data.totalPages)
    }

    async function getCatagory() {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/product/category/all`)
        setLoad(true);
        console.log(result)
        setListCate(result?.data)
    }

    useEffect(() => {
        getProduct(param.search === '' ? '?page=1' : param.search, 5)
        getCatagory();
        console.log(listCate)

    }, [param]);

    const importProductDetail = (() => {
        return (
            <tr>
            <td><Form.Group className="mb-2">
                <Form.Control as="select" name="category" required value={product_category}
                              onChange={(e) => setCategory(e.target.value)} id="select">
                    <option value="">Sản phẩm</option>
                    {listCate.map((cate) => (
                        <option value={cate.name} key={cate.id}>{cate.name}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            </td>
            <td><Form.Group className="mb-2">
                <Form.Control as="select" name="category" required value={product_category}
                              onChange={(e) => setCategory(e.target.value)} id="select">
                    <option value="">Size</option>
                    {listCate.map((cate) => (
                        <option value={cate.name} key={cate.id}>{cate.name}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            </td>
            <td><Form.Group className="mb-2">
                <Form.Control as="select" name="category" required value={product_category}
                              onChange={(e) => setCategory(e.target.value)} id="select">
                    <option value="">Màu</option>
                    {listCate.map((cate) => (
                        <option value={cate.name} key={cate.id}>{cate.name}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            </td>
            <td><Form.Group className="mb-2">
                <Form.Control type="number" placeholder="Số lượng" name="amount" value={product_describe}
                              onChange={(e) => setDescribe(e.target.value)}/>
                </Form.Group>
            </td>
            <td><Form.Group className="mb-2">
                <Form.Control type="text" placeholder="Giá " name="price" value={product_sold}
                              onChange={(e) => setSold(e.target.value)}/>
                </Form.Group>
            </td>
            </tr>
        )
    }, [])
    const listImport = [];
    const obj = {}
    return (
        <>{
            load ?
                <div>
                    <div className="table-container" style={{width: '100%'}}>
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
                                    <th scope="col" className="col-3">Tổng đơn</th>
                                    <th scope="col" className="col-2">Tác vụ</th>
                                </tr>
                                </thead>
                                <tbody>
                                {list.map((item) => (
                                    <tr key={item.id}>
                                        <th scope="row">{item.id}</th>
                                        <td className="tdName">{item.name}</td>
                                        <td className="tdName">{item.name}</td>
                                        <td style={{display: 'none'}} className="tdDescribe">{item.describe}</td>
                                        <td style={{whiteSpace: 'nowrap'}}>
                                            <button type="button"
                                                    className="btn btn-outline-primary btn-light btn-sm mx-sm-1 px-lg-2 w-32"
                                                    title="Chi tiết" onClick={handleShowInfo}><i className="fa fa-info"
                                                                                                 aria-hidden="true"></i>
                                            </button>
                                            <button type="button"
                                                    className="btn btn-outline-warning btn-light btn-sm mx-sm-1 px-lg-2 w-32"
                                                    title="Chỉnh sửa" onClick={handleShow}><i className="fa fa-pencil"
                                                                                              aria-hidden="true"></i>
                                            </button>
                                        </td>
                                    </tr>))}

                                </tbody>
                            </table>
                        </div>
                        <Pagination refix='product' size={totalPage}/>
                    </div>


                    {modalForm ?
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Nhập hàng</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handleSubmit}>
                                <table className="table ">
                                <thead>
                                <tr>
                                    <th scope="col" className="col-3">
                                        Sản phẩm
                                        <i className="fa fa-plus ms-3" onClick={importProductDetail}></i>
                                    </th>
                                    <th scope="col" className="col-2">Size</th>
                                    <th scope="col" className="col-2">Màu</th>
                                    <th scope="col" className="col-2">Số lượng</th>
                                    <th scope="col" className="col-2">Giá nhập</th>
                                </tr>
                                </thead>
                                <tbody id = "table">
                                    {/* {importProductDetail.map()} */}
                                    <tr id="1">
                                    <td><Form.Group className="mb-2">
                                        <Form.Control as="select" name="category" required value={product_category}
                                                      onChange={(e) => setCategory(e.target.value)} >
                                            <option value="">Sản phẩm</option>
                                            {listCate.map((cate) => (
                                                <option value={cate.name} key={cate.id} id="sp1">{cate.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    </td>
                                    <td><Form.Group className="mb-2">
                                        <Form.Control as="select" name="category" required value={product_category}
                                                      onChange={(e) => setCategory(e.target.value)} >
                                            <option value="">Size</option>
                                            {listCate.map((cate) => (
                                                <option value={cate.name} key={cate.id} id="size1">{cate.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    </td>
                                    <td><Form.Group className="mb-2">
                                        <Form.Control as="select" name="category" required value={product_category}
                                                      onChange={(e) => setCategory(e.target.value)} id="select">
                                            <option value="">Màu</option>
                                            {listCate.map((cate) => (
                                                <option value={cate.name} key={cate.id} id="mau1">{cate.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    </td>
                                    <td><Form.Group className="mb-2">
                                        <Form.Control type="number" placeholder="Số lượng" name="amount" id="sl1" value={product_describe}
                                                      onChange={(e) => setDescribe(e.target.value)}/>
                                        </Form.Group>
                                    </td>
                                    <td><Form.Group className="mb-2">
                                        <Form.Control type="text" placeholder="Giá " name="price"  id="gia1" value={product_sold}
                                                      onChange={(e) => setSold(e.target.value)}/>
                                        </Form.Group>
                                    </td>
                                    </tr>
                                </tbody>
                            </table>
                                    <Button variant="success" type="submit">
                                        {editForm ? "Chỉnh sửa" : "Tạo đơn nhập"}
                                    </Button> 
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Đóng
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        :
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Chi tiết sản phẩm</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {/* <div>Tên Sản phẩm : <strong>{product_name}</strong></div>
                                <div>Thuộc danh mục : <strong>{product_category}</strong></div>
                                <div>Mô tả: <strong>{product_describe}</strong></div>
                                <div>Giá : <strong>{product_sold}</strong></div>
                                {product_image ? (<ul class="list-images">
                                    <li><img src={product_image}/></li>
                                </ul>) : null} */}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Đóng
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    }
                </div>
                :
                <div>Loading</div>

        }
        </>
    );

};
export default adminLayout(ImportPage);