import {useEffect, useState} from "react";
import adminLayout from "../admin/adminLayout";
import axiosApiInstance from "../context/interceptor";
import axios from "../api/axios";
import {toast} from 'react-toastify';
import {Button, Form, Modal} from "react-bootstrap"
import Pagination from "../components/Pagination";
import {useLocation} from "react-router-dom";

const ProductPage = () => {
    const param = useLocation();

    const [list, setList] = useState([]);
    const [load, setLoad] = useState(false);
    const [totalPage, setTotalPage] = useState(1)
    const [quantity, setQuantity] = useState(1)
    const [listCate, setListCate] = useState([]);
    const [listTag, setListTag] = useState([]);
    const [editForm, setEditForm] = useState(false);
    const [modalForm, setModalForm] = useState(false);
    const [productDetail, setProductDetail] = useState([]);


    const [product_id, setId] = useState();
    const [product_name, setName] = useState();
    const [product_image, setImage] = useState();
    const [product_category, setCategory] = useState();
    const [product_tag, setTag] = useState();
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
        setModalForm(true);
        setImage(null);
        setId(parents(e.target).find(function (c) {
            return c.tagName === "TR"
        }).children[0].innerText)
        setName(parents(e.target).find(function (c) {
            return c.tagName === "TR"
        }).children[1].innerText)
        setImage(parents(e.target).find(function (c) {
            return c.tagName === "TR"
        }).children[2].firstChild.currentSrc)
        setCategory(parents(e.target).find(function (c) {
            return c.tagName === "TR"
        }).children[3].innerText)
        setSold(parents(e.target).find(function (c) {
            return c.tagName === "TR"
        }).children[4].innerText)
        setDescribe(parents(e.target).find(function (c) {
            return c.tagName === "TR"
        }).children[5].innerText)
        const tag=parents(e.target).find(function (c) {
            return c.tagName === "TR"
        }).children[6].innerText;
        if(tag)
            for (const i of listTag) {
                if (i.id == tag) {
                    setTag(i.name)
                    break
                }
            }
        else  setTag(null)
        setShow(true);
        setEditForm(true);
    }

    const handleShowInfo = (e) => {
        setModalForm(false);

        setImage(null)
        const tmpID = parents(e.target).find(function (c) {
            return c.tagName === "TR"
        }).children[0].innerText;
        setId(tmpID)
        getDetails(parents(e.target).find(function (c) {
            return c.tagName === "TR"
        }).children[0].innerText);
        setName(parents(e.target).find(function (c) {
            return c.tagName === "TR"
        }).children[1].innerText)
        setImage(parents(e.target).find(function (c) {
            return c.tagName === "TR"
        }).children[2].firstChild.currentSrc)
        setCategory(parents(e.target).find(function (c) {
            return c.tagName === "TR"
        }).children[3].innerText)
        setSold(parents(e.target).find(function (c) {
            return c.tagName === "TR"
        }).children[4].innerText)
        setDescribe(parents(e.target).find(function (c) {
            return c.tagName === "TR"
        }).children[5].innerText)

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
        setTag(null);
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
            tag:product_tag
        }
        const methodForm = editForm ? 'put' : 'post';
        const urlForm = editForm ? `/api/product/edit/${product_id}` : `/api/product/create`;
        const kq = await axios({
            method: methodForm,
            url: axiosApiInstance.defaults.baseURL + urlForm,
            params: params,
            headers: {
                'Authorization': `Bearer ${tokensData.data.accessToken}`,
                'Accept': '*/*',
                'Content-Type': 'multipart/form-data'
            },
            data: {
                image: imageFiles[0]
            }
        });
        if (kq.data.status === true) {
            toast.success(kq.data.message);
            getProduct(param.search === '' ? '?page=1' : param.search, 5);
            setShow(false);
        } else
            toast.error(kq.data.message);

    }

    const handleBlock = async (e) => {
        e.preventDefault();
        const tmpID = parents(e.target).find(function (c) {
            return c.tagName === "TR"
        }).children[0].innerText
        console.log(tmpID);
       const kq = await axiosApiInstance.delete(axiosApiInstance.defaults.baseURL + `/api/product/block?productID=${tmpID}`)
        if (kq.data.status === true) {
            toast.success("Sản phẩm đã được khóa");
            setShow(false);
        } else
            toast.error(kq.data.message);
      await getProduct(param.search === '' ? '?page=1' : param.search, 5);
    }
    const handleUnBlock = async (e) => {
        e.preventDefault();
        const tmpID = parents(e.target).find(function (c) {
            return c.tagName === "TR"
        }).children[0].innerText
        console.log(tmpID);
        const kq = await axiosApiInstance.delete(axiosApiInstance.defaults.baseURL + `/api/product/un_block?productID=${tmpID}`)
        if (kq.data.status === true) {
            toast.success("Sản phẩm đã được mở khóa");
            setShow(false);
        } else
            toast.error(kq.data.message);
        await getProduct(param.search === '' ? '?page=1' : param.search, 5);
    }

    async function getProduct(page, size) {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/product/get_paging${page}&size=${size}`)
        setLoad(true);
        setList(result?.data.content)
        setTotalPage(result?.data.totalPages)
    }

    async function getDetails(id) {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/product/detail/${id}`)
        setLoad(true);
        setProductDetail(result?.data)
        console.log(result)
    }

    async function getAllTags() {
        const result = await axios.get(axiosApiInstance.defaults.baseURL + `/api/chatbot/tags/list`)
        setLoad(true);
        setListTag(result?.data)
    }


    async function getCategory() {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/category/all`)
        setLoad(true);
        setListCate(result?.data)
    }

    useEffect(() => {
        getProduct(param.search === '' ? '?page=1' : param.search, 5)
        getCategory();
        getAllTags();
    }, [param]);


    const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

    const [imageFiles, setImageFiles] = useState([]);
    const [images, setImages] = useState([]);

    const changeHandler = (e) => {
        const {files} = e.target;
        const validImageFiles = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.match(imageTypeRegex)) {
                validImageFiles.push(file);
            }
        }
        if (validImageFiles.length) {
            setImageFiles(validImageFiles);
            return;
        }
        alert("Selected images are not of valid type!");
    };

    useEffect(() => {
        const images = [], fileReaders = [];
        let isCancel = false;
        if (imageFiles.length) {
            imageFiles.forEach((file) => {
                const fileReader = new FileReader();
                fileReaders.push(fileReader);
                fileReader.onload = (e) => {
                    const {result} = e.target;
                    if (result) {
                        images.push(result)
                    }
                    if (images.length === imageFiles.length && !isCancel) {
                        setImages(images);
                    }
                }
                fileReader.readAsDataURL(file);
            })
        }
        ;
        return () => {
            isCancel = true;
            fileReaders.forEach(fileReader => {
                if (fileReader.readyState === 1) {
                    fileReader.abort()
                }
            })
        }
    }, [imageFiles]);

    return (
        <>{
            load ?
                <div>
                    <div className="table-container" style={{width: '100%'}}>
                        <div className="row">
                            <div className="col">
                                <h5 className="pb-2 mb-0">Danh sách sản phẩm</h5>
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
                                    <th scope="col" className="col-1">Mã sản phẩm</th>
                                    <th scope="col" className="col-3">Tên sản phẩm</th>
                                    <th scope="col" className="col-1">Hình ảnh</th>
                                    <th scope="col" className="col-2">Danh mục</th>
                                    <th scope="col" className="col-1">Giá bán</th>
                                    <th scope="col" className="col-1">Tồn Kho</th>
                                    <th style={{display: 'none'}} scope="col" className="col-1">Mô tả</th>
                                    <th style={{display: 'none'}} scope="col" className="col-1">Tag</th>
                                    <th scope="col" className="col-2">Tác vụ</th>
                                </tr>
                                </thead>
                                <tbody>
                                {list.map((item) => (
                                    <tr key={item.id}>
                                        <th scope="row">{item.id}</th>
                                        <td className="tdName">{item.name}</td>
                                        <td className="tdImage w-25">
                                            <img
                                                src={item.linkImg}
                                                width="50" height="50" className="img-fluid img-thumbnail"
                                                alt="Sheep"/>
                                        </td>
                                        <td className="tdCategory">{item.category}</td>
                                        <td className="tdPrice">{item.price.toLocaleString('vi', {
                                            style: 'currency',
                                            currency: 'VND'
                                        })}</td>
                                        <td style={{display: 'none'}} className="tdDescribe">{item.describe}</td>
                                        <td style={{display: 'none'}} className="tdDescribe">{item.tag}</td>
                                        <td className="tdPrice">{item?.quantityInStock}</td>
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
                                            {item.status ?
                                                <button type="button"
                                                        className="btn btn-outline-danger btn-light btn-sm mx-sm-1 px-lg-2 w-32"
                                                        title="Mở khóa" onClick={handleUnBlock}><i className="fa fa-unlock"
                                                                                             aria-hidden="true"></i>
                                                </button>:
                                                <button type="button"
                                                        className="btn btn-outline-danger btn-light btn-sm mx-sm-1 px-lg-2 w-32"
                                                        title="Khóa" onClick={handleBlock}><i className="fa fa-lock"
                                                                                             aria-hidden="true"></i>
                                                </button>
                                            }

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
                                <Modal.Title>Quản lý sản phẩm</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handleSubmit}>

                                    <Form.Group className="mb-2">
                                        <Form.Control type="text" placeholder="Tên sản phẩm" name="name" required
                                                      value={product_name} onChange={(e) => setName(e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Control as="select" name="category" required value={product_category}
                                                      onChange={(e) => setCategory(e.target.value)} id="select">
                                            <option value="">Danh mục</option>
                                            {listCate.map((cate) => (
                                                <option value={cate.name} key={cate.id}>{cate.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        {product_image ? (<ul className="list-images">
                                            <li><img src={product_image}/></li>
                                        </ul>) : null}
                                        {images.length > 0 ?
                                            <ul className="list-images">
                                                {
                                                    images.map((image, index) => {
                                                        return <li key={index}><img src={image}/></li>
                                                    })
                                                }
                                            </ul> : null
                                        }
                                        <Form.Control type="file" id="file" onChange={changeHandler}
                                                      accept="image/png, image/jpg, image/jpeg" multiple/>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Control type="text" placeholder="Mô tả" name="id" required
                                                      value={product_describe}
                                                      onChange={(e) => setDescribe(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-2">
                                        <Form.Control type="number" placeholder="Giá " name="price" value={product_sold}
                                                      onChange={(e) => setSold(e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Control as="select" name="Tag" required value={product_tag}
                                                      onChange={(e) => setTag(e.target.value)} id="select">
                                            <option value="">Nhãn gợi ý</option>
                                            {listTag.map((cate) => (
                                                <option value={cate.name} key={cate.id}>{cate.name}-{cate.describer}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Button variant="success" type="submit">
                                        {editForm ? "Chỉnh sửa" : "Tạo sản phẩm"}
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
                                <div>Tên Sản phẩm : <strong>{product_name}</strong></div>
                                <div>Mô tả: <strong>{product_describe}</strong></div>
                                <table className="table mt-3">
                                    <thead>
                                    <tr bgcolor="Silver">
                                        <th scope="col" className="col-2">Size</th>
                                        <th scope="col" className="col-2">Màu</th>
                                        <th scope="col" className="col-2">Số lượng</th>
                                    </tr>
                                    </thead>
                                    {productDetail.map(item =>
                                        <tbody>
                                        <tr>
                                            <td>{item.size}</td>
                                            <td>{item.color}</td>
                                            <td className="px-4">{item.current_number}</td>
                                        </tr>
                                        </tbody>
                                    )}

                                </table>

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
export default adminLayout(ProductPage);