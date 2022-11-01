import {useContext, useState, useEffect} from "react";
import adminLayout from "../admin/adminLayout";
import axiosApiInstance from "../context/interceptor";
import {render} from "react-dom";
import {alignPropType} from "react-bootstrap/types";
import {  toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ProductPage = () => {
    const [product, setProduct] = useState()
    const [list, setList] = useState([])

    async function getProduct() {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + "/api/product/all")
        const products = result.data;
        const listItem = products.map((p,index) => (
            <tr key={index}>
              <th scope="row">{p.id}</th>
              <td>{p.name}</td>
              <td className="w-25">
                <img src={p.linkImg} width="200" height="auto" className="img-fluid img-thumbnail" alt={p.name} />
              </td>
              <td>{p.category.name}</td>
              <td>{p.sold}</td>
              <td>
                <button type="button" className="btn btn-outline-warning btn-light btn-sm mx-sm-1 px-lg-2" title="Chỉnh sửa" onClick={handleShow}><i className="fa fa-pencil" aria-hidden="true"></i></button>
                <button type="button" className="btn btn-outline-danger btn-light btn-sm mx-sm-1 px-lg-2" title="Ngừng kinh doanh sản phẩm"><i className="fa fa-times" aria-hidden="true"></i></button>
              </td>
              
            </tr>
        ));
        return setList(listItem)
    }

    useEffect(() => {
        getProduct() ;
    }, [product]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <>
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
        <div className="table-container" style={{width: '100%'}}>
            <div className="row">
                <div className="col">
                    <h5 className="pb-2 mb-0">Danh sách sản phẩm</h5>
                </div>
                <div className="col text-right">
                    <button className="btn btn-default low-height-btn">
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
            </div>
            <div className="d-flex text-muted">
                <table className="table table-image">
                    <thead>
                        <tr>
                            <th scope="col" className="col-1">Mã</th>
                            <th scope="col" className="col-3">Tên sản phẩm</th>
                            <th scope="col" className="col-1">Hình ảnh</th>
                            <th scope="col" className="col-2">Danh mục</th>
                            <th scope="col" className="col-1">Đã bán</th>
                            <th scope="col" className="col-3">Tác vụ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
            </div>
            <nav className="table-bottom-center-pagination" aria-label="Page navigation example ">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </>

}

export default adminLayout(ProductPage);