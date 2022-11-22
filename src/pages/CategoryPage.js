import {useEffect, useState} from "react";
import adminLayout from "../admin/adminLayout";
import axiosApiInstance from "../context/interceptor";
import {Button, Form, Modal} from "react-bootstrap"
import {useLocation} from "react-router-dom";

const CategoryPage = () => {
    const param = useLocation();

    const [load, setLoad] = useState(false);
    const [list, setList] = useState([]);
    const [show, setShow] = useState(false);
    const [modalForm, setModalForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const handleClose = () => setShow(false);
    const [category_name, setName] = useState();
    async function getCatagory() {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/product/category/all`)
        setLoad(true);
        setList(result?.data)
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
    const handleShow = (e) => {
        setModalForm(false);
        setEditForm(true)
        setShow(true);
    }
    const handleShowAdd = (e) => {
        setModalForm(true);
        setShow(true);
    }
    useEffect(() => {
        getCatagory();

    }, [param]);
    return(
        <>
            {
                load?
                    <div className="d-flex justify-content-center">
                        <div className="table-container" style={{minWidth: '80%'}}>
                            <div className="row">
                                <div className="col">
                                    <h5 className="pb-2 mb-0">Danh sách danh mục</h5>
                                </div>
                                <div className="col text-right">
                                    <button className="btn btn-default low-height-btn" onClick={handleShowAdd}>
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="d-flex text-muted overflow-auto center">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col" className="col-2">Mã danh mục</th>
                                        <th scope="col" className="col-3">Tên danh mục</th>
                                        <th scope="col" className="col-1">Tác vụ</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {list.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td style={{whiteSpace: 'nowrap'}}>
                                                <button type="button"
                                                        className="btn btn-outline-warning btn-light btn-sm mx-sm-1 px-lg-2 w-32"
                                                        title="Chỉnh sửa" ><i className="fa fa-pencil" aria-hidden="true" onClick={handleShow}></i>
                                                </button>
                                            </td>
                                        </tr>))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {
                            modalForm?
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Thêm danh mục</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Group className="mb-2">
                                            <Form.Control type="text" placeholder="Tên danh mục" name="name" required
                                                          value={category_name} onChange={(e) => setName(e.target.value)}/>
                                        </Form.Group>
                                        <Button variant="success" type="submit">
                                            {editForm ? "Chỉnh sửa" : "Tạo sản phẩm"}
                                        </Button>
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
                                        <Modal.Title>Chỉnh sửa danh mục</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        <Button variant="success" type="submit">
                                            {editForm ? "Chỉnh sửa" : "Tạo sản phẩm"}
                                        </Button>
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
export default adminLayout(CategoryPage);