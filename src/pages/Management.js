import {useContext, useState, useEffect, useRef} from "react";
import adminLayout from "../admin/adminLayout";
import axiosApiInstance from "../context/interceptor";
import axios from "../api/axios";
import {toast} from 'react-toastify';
import { Form, Button, Modal } from "react-bootstrap"
import Pagination from "../components/Pagination";

const Management = () => {
    const [product_id, setId] = useState();
    const [product_name, setName] = useState();
    const [product_source, setSource] = useState();
    function parents(node) {
        let current = node,
            list    = [];
        while(current.parentNode != null && current.parentNode != document.documentElement) {
          list.push(current.parentNode);
          current = current.parentNode;
        }
         return list
     }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        setId(parents(e.target).find(function(c){return c.tagName == "TR"}).children[0].innerText)
        setName(parents(e.target).find(function(c){return c.tagName == "TR"}).children[1].innerText)
        setSource(parents(e.target).find(function(c){return c.tagName == "TR"}).children[2].innerText)
        setShow(true);
    }
    const handleShowAdd = (e) => {
        setShow(true);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>{

            <div>
                <div className="row">
                    <div className="col">
                            <h5 className="pb-2 mb-0">Quản lý đơn hàng</h5>
                    </div>
                    <div className="col text-right">
                        <button className="btn btn-default low-height-btn" onClick={handleShowAdd}><i className="fa fa-plus"></i></button>
                    </div>
                </div>
                <table class="table align-items-center mb-0">   
                  <thead>
                    <tr>
                      <th>Ngày tạo</th>
                      <th>Mã đơn hàng</th>
                      <th>Nguồn</th>
                      <th>Thông tin đặt hàng</th>
                      <th>Gắn thẻ</th>
                      <th class="text-right">Thành tiền</th>
                      <th>Trạng thái</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        01/01/2022
                      </td>
                      <td>
                        MADON1
                      </td>
                      <td>
                        Facebook
                      </td>
                      <td>
                        Nguyễn Văn A/TP HCM/0123456789
                      </td>
                      <td>
                        <span class="badge alert-primary">Label</span>
                      </td>
                      <td class="text-right">
                        100.000đ
                      </td>
                      <td class="align-middle">
                        <button type="button" class="btn btn-outline-primary btn-sm me-2"><i class="fa fa-info"/></button>
                        <button type="button" class="btn btn-outline-secondary btn-sm" onClick={handleShow}><i class="fa fa-pencil"/></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{product_name}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-2">
                        <Form.Control type="text" placeholder="Ngày tạo" name="id" required value={product_id} onChange={(e)=> setId(e.target.value)}/>
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Control type="text" placeholder="Mã đơn hàng" name="name" required value={product_name} onChange={(e)=> setName(e.target.value)}/>
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Control type="text" placeholder="Nguồn" name="source"  value={product_source} onChange={(e)=> setSource(e.target.value)}/>
                      </Form.Group>
                      <Button variant="success" type="submit">
                        Chỉnh sửa
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


        }
        </>
    );

};
export default adminLayout(Management);