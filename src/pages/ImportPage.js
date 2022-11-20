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
    const handleSubmit = async (e) => {
        console.log(rows)
    }

    const [rows, newRows] = useState([{}])
    const handleAddRow = () => {
        newRows(prev =>  [...prev, {}])
    }
    

    async function getProduct(page, size) {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/product/getpaging${page}&size=${size}`)
        setLoad(true);
        setList(result?.data.content)
        setTotalPage(result?.data.totalPages)
    }

    useEffect(() => {
        getProduct(param.search === '' ? '?page=1' : param.search, 5)

    }, [param]);
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
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Nhập hàng</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handleSubmit}>
                                <table className="table ">
                                <thead>
                                
                                    <tr >
                                    <th scope="col" className="col-3">
                                        Sản phẩm
                                        <i className="fa fa-plus ms-3 add_row" onClick={handleAddRow} ></i>
                                    </th>
                                    <th scope="col" className="col-2">Size</th>
                                    <th scope="col" className="col-2">Màu</th>
                                    <th scope="col" className="col-2">Số lượng</th>
                                    <th scope="col" className="col-2">Giá nhập</th>
                                    <th></th>
                                </tr>
                                
                                </thead>
                                <tbody id = "table">
                                {rows.map((row, index) => (
                                    <tr key={index}>
                                        <td><Form.Group className="mb-2">
                                        <Form.Control as="select" name="product_id" required onChange={e => {rows[index].product = e.target.value}}>
                                            <option value="">Sản phẩm</option>
                                            <option value="Sản phẩm 2">Sản phẩm 2</option>
                                            <option value="Sản phẩm 3">Sản phẩm 3</option>
                                            <option value="Sản phẩm 4">Sản phẩm 4</option>
                                        </Form.Control>
                                    </Form.Group>
                                    </td>
                                    <td><Form.Group className="mb-2">
                                        <Form.Control as="select" name="size" required  onChange={e => {rows[index].size = e.target.value}}>
                                            <option value="">Size</option>
                                            <option value="X">X</option>
                                            <option value="M">M</option>
                                            <option value="L">L</option>
                                        </Form.Control>
                                    </Form.Group>
                                    </td>
                                    <td><Form.Group className="mb-2">
                                        <Form.Control as="select" name="color" required  onChange={e => {rows[index].color = e.target.value}}>
                                            <option value="">Màu</option>
                                            <option value="Đỏ">Đỏ</option>
                                            <option value="Cam">Cam</option>
                                        </Form.Control>
                                    </Form.Group>
                                    </td>
                                    <td><Form.Group className="mb-2">
                                        <Form.Control type="number" placeholder="Số lượng" name="amount" onChange={e => {rows[index].numberAdd = e.target.value}}/>
                                        </Form.Group>
                                    </td>
                                    <td><Form.Group className="mb-2">
                                        <Form.Control type="text" placeholder="Giá " name="price" onChange={e => {rows[index].prices = e.target.value}}/>
                                        </Form.Group>
                                    </td>
                                    <td><span onClick={(e) => {newRows(prev => {rows.splice(index);return [...rows]})}}><i className="fa fa-times"></i></span></td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                                    <Button variant="success" type="submit" onClick={handleSubmit}>
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
                <div>Loading</div>
        }
        </>
    );

};
export default adminLayout(ImportPage);