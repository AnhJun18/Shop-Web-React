import { useEffect, useState } from "react";
import adminLayout from "../admin/adminLayout";
import axiosApiInstance from "../context/interceptor";
import { Button, Form, Modal } from "react-bootstrap"
import ReactLoading from "react-loading";
import { toast } from "react-toastify";

const CategoryPage = () => {

    const [load, setLoad] = useState(false);
    const [list, setList] = useState([]);
    const [show, setShow] = useState(false);
    const [form, setForm] = useState();
    const handleClose = () => setShow(false);
    const [category_name, setName] = useState();
    const [id, setID] = useState();
    const [change, setChange] = useState(false);

    async function getCategory() {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/category/all`)
        setLoad(true);
        setList(result?.data)
    }

    const handleInfo = (e) => {
        setForm("edit")
        setName(e.currentTarget.title)
        setID(e.currentTarget.id)
        setShow(true);
    }
    const handleShowAdd = (e) => {
        setName(null)
        setID(null)
        setForm("add")
        setShow(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            name: category_name
        }
        const query = form === "add" ? await axiosApiInstance.post(axiosApiInstance.defaults.baseURL + `/api/category`, payload) :
            await axiosApiInstance.put(axiosApiInstance.defaults.baseURL + `/api/category/update/${id}`, payload)
        if (query?.data.status === 200)
            toast.success(query?.data.message)
        else
            toast.error(query?.data?.message + "! Vui lòng thử lại")
        setChange(!change)
        setShow(false)
    }

    const handleDelete = async (e) => {
        const query = await axiosApiInstance.delete(axiosApiInstance.defaults.baseURL + `/api/category/delete/${e.currentTarget.id}`)
        if (query?.data.status === 200)
            toast.success(query?.data.message)
        else
            toast.error(query?.data.message + "! Vui lòng thử lại")
        setChange(!change)
    }


    useEffect(() => {
        getCategory();

    }, [change]);
    return (
        <>
            {
                load ?
                    <div className="d-flex justify-content-center">
                        <div className="table-container" style={{ minWidth: '80%' }}>
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
                                                <td style={{ whiteSpace: 'nowrap' }}>
                                                    <button type="button"
                                                        className="btn btn-outline-warning btn-light btn-sm mx-sm-1 px-lg-2 w-32"
                                                        title="Chỉnh sửa" id={item.id} title={item.name}
                                                        onClick={handleInfo}>
                                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                                    </button>

                                                    <button type="button" id={item.id} title={item.name}
                                                        onClick={handleDelete}
                                                        className="btn btn-outline-danger btn-light btn-sm mx-sm-1 px-lg-2 w-32"
                                                        title="Xóa"><i
                                                            className="fa fa-times"
                                                            aria-hidden="true"></i>
                                                    </button>
                                                </td>
                                            </tr>))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Danh mục</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-2">
                                            <Form.Control type="text" placeholder="Tên danh mục" name="name" required
                                                value={category_name}
                                                onChange={(e) => setName(e.target.value)} />
                                        </Form.Group>
                                        <Button variant="success" type="submit">
                                            {form === "edit" ? "Cập nhật" : "Thêm"}
                                        </Button>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>

                                </Modal.Footer>
                            </Modal>
                        }
                    </div>
                    :
                    <div className={"center loading"}>
                        <ReactLoading type={'cylon'} color='#fffff' height={'33px'} width={'9%'} />
                    </div>
            }
        </>
    );
}
    ;
export default adminLayout(CategoryPage);