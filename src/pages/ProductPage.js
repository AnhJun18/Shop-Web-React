import {useContext, useState, useEffect} from "react";
import adminLayout from "../admin/adminLayout";
import axiosApiInstance from "../context/interceptor";

import {render} from "react-dom";
import {alignPropType} from "react-bootstrap/types";
import {toast} from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Pagination from "../components/Pagination";
import {useLocation} from "react-router-dom";

const ProductPage = () => {
    const param = useLocation();
    console.log(param)

    const [list, setList] = useState([]);
    const [load, setLoad] = useState(false);
    const [totalPage, setTotalPage] = useState(1)
    const [quantity, setQuantity] = useState(1)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function getProduct(page, size) {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/product/getpaging${page}&size=${size}`)
        setLoad(true);
        setList(result?.data.content)
        setTotalPage(result?.data.totalPages)
    }

    useEffect(() => {
        getProduct(param.search === '' ? '?page=1' : param.search, 1)
    }, [param]);

    return (
        <>{
            load ?
                <div className="table-container" style={{width: '100%'}}>
                    <div className="row">
                        <div className="col">
                            <h5 className="pb-2 mb-0">Danh sách sản phẩm</h5>
                        </div>
                        <div className="col text-right">
                            <button className="btn btn-default low-height-btn" onClick={handleShow}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="d-flex text-muted">
                        <table className="table table-image">
                            <thead>
                            <tr>
                                <th scope="col" className="col-1">Mã sản phẩm</th>
                                <th scope="col" className="col-3">Tên sản phẩm</th>
                                <th scope="col" className="col-1">Hình ảnh</th>
                                <th scope="col" className="col-2">Danh mục</th>
                                <th scope="col" className="col-2">Đã bán</th>
                                <th scope="col" className="col-2">Tác vụ</th>
                            </tr>
                            </thead>
                            <tbody>
                            {list.map((item) => (
                                <tr>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td className="w-25">
                                        <img
                                            src={item.linkImg}
                                            width="200" height="auto" className="img-fluid img-thumbnail" alt="Sheep"/>
                                    </td>
                                    <td>{item.category.name}</td>
                                    <td>25</td>
                                    <td>
                                        <button type="button"
                                                className="btn btn-outline-primary btn-light btn-sm mx-sm-1 px-lg-2"
                                                title="Chi tiết"><i className="fa fa-info" aria-hidden="true"></i>
                                        </button>
                                        <button type="button"
                                                className="btn btn-outline-warning btn-light btn-sm mx-sm-1 px-lg-2"
                                                title="Chỉnh sửa"><i className="fa fa-pencil" aria-hidden="true"></i>
                                        </button>
                                        <button type="button"
                                                className="btn btn-outline-danger btn-light btn-sm mx-sm-1 px-lg-2"
                                                title="Ngừng kinh doanh sản phẩm"><i className="fa fa-lock"
                                                                                     aria-hidden="true"></i>
                                        </button>
                                    </td>
                                </tr>))}

                            </tbody>
                        </table>
                    </div>
                    <Pagination refix='product' size={totalPage}/>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Save Changes
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
export default adminLayout(ProductPage);