import React, {useEffect, useState} from "react";
import userLayout from "../user/userLayout"
import "./../assets/css/user-view.css";
import ReactLoading from 'react-loading';
import axiosApiInstance from "../context/interceptor";
import {Form, Modal} from "react-bootstrap"
import InputSpinner from "react-bootstrap-input-spinner";
import {toast} from "react-toastify";
import axios from "../api/axios";
import {useLocation, useNavigate} from "react-router-dom"


const RecommendPage = () => {
        const navigate= useNavigate()
        const location = useLocation();
        const param = new URLSearchParams(location.search).get("l");
        const [list, setList] = useState([]);
        const [load, setLoad] = useState(false);
        const [loadSize, setLoadSize] = useState(false);
        const [status, setStatus] = useState(0);
        const [productDetail, setProductSelected] = useState([]);
        const [imgSelect, setImgSelect] = useState();
        const [colorAvail, setColorAvail] = useState(new Set());
        const [sizeAvail, setSizeAvail] = useState();
        const [item, setItem] = useState({});
        const [show, setShow] = useState(false);
        const [order, setOrder] = useState([])

        const handleAddCart = async (id, amount) => {
            const body = {
                "productID": id,
                "amount": amount
            }
            const result = await axiosApiInstance.post(axiosApiInstance.defaults.baseURL + `/api/cart/AddToCart`, body);
            return result
        }

        const handleSearch = async (e) => {

        }
        async function getProduct() {
            const myList= await axios.get(axiosApiInstance.defaults.baseURL + `/api/product/tags?nameTag=${param}`)

            console.log(myList)
            setLoad(true);
            setList(myList?.data)
        }


        async function getDetails(id) {
            const result = await axios.get(axiosApiInstance.defaults.baseURL + `/api/product/detail/${id}`)
            setStatus(1)
            setLoad(true);
            setLoadSize(false)
            setProductSelected(result?.data)
            setSizeAvail(result?.data)
            const setColor = new Set()
            result?.data?.forEach(i => {
                setColor.add(i?.color)
            })

            setColorAvail(setColor)
        }

        const handleClose = () => {
            setShow(false);
            setImgSelect(null);
            setStatus(0)
            setItem({})
        }

        const handleShow = (e) => {
            setImgSelect(e.target.title)
            setShow(true);
            getDetails(e.target.id)
        }


        const handleChangeColor = (e) => {
            item.color = e.target.id
            setItem(item)
            setSizeAvail(productDetail.filter(i => i.color === e.target.id))
            setLoadSize(true)
        }
        const handleChangeSize = (e) => {
            item.size = e.target.id
            setItem(item)
            console.log(e.target.id)
        }
        const handleChangeAmount = (e) => {
            item.sl = e
            setItem(item)
            console.log(e)
        }

        const handleSubmitAdd = async (e) => {
            e.preventDefault()
            const newItem = productDetail.find(i => i?.color === item.color && i?.size == item.size)
            if (newItem) {
                if (newItem?.current_number < item?.sl)
                    toast.error("Sản phẩm không đủ số lượng bạn cần! \n Vui lòng giảm số lượng!")
                else {
                    let kq = null;
                    try {
                        kq = await handleAddCart(newItem?.id, item.sl ? item?.sl : 1)
                    } catch (e) {

                    }
                    if (kq?.data?.status === 200) {
                        setItem({})
                        setShow(false)
                        toast.success("Sản phẩm đã được thêm vao giỏ hàng của bạn!", {position: "top-center"})
                    } else {
                        toast.error("Thất bại! Vui lòng thử lại")
                    }
                }

            } else {
                toast.error("Vui lòng chọn màu và kích thước phù hợp!")
            }
        }

        const buyNow = (e) => {
            const tmp = {};
            if (item.color && item.size) {
                tmp.amount = item.sl ? item.sl : 1
                tmp.product = productDetail.find(i => i.color === item.color && i.size === item.size)
                order.push(tmp)
                setOrder(order)
                navigate('/theorder', {state: order});
            } else {
                toast.error("Vui lòng chọn đủ thông tin")
            }
            e.preventDefault()
        }

        useEffect(() => {
            getProduct()
        }, []);

        return (<>
            {load ?
                <div>
                    <div className="container py-5">
                        <div className="row text-center py-3">
                            <div className="col-lg-12 m-auto">
                                <h1 className="h1 py-2">Gợi ý</h1>
                                {list.length!==0?  <p>Sản phẩm được gợi ý cho bạn</p> :
                                    <div className="col-lg-6 py-2 m-auto text-center">
                                        <p style={{color:"red"}}>Chúng tôi chưa có sản phẩm phù hợp để gợi ý cho bạn!</p>
                                    </div>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                {list.map((item) => (
                                        <div className="col-md-3">
                                            <div className="card mb-3 product-wap rounded-0">
                                                <div className="card rounded-0">
                                                    <img className="img-config card-img rounded-0 img-fluid"
                                                         src={item.linkImg}/>
                                                    <div
                                                        className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                        <button type="button" className="btn btn-success text-white"
                                                                title={item.linkImg} id={item?.id}
                                                                onClick={handleShow}>
                                                            XEM NGAY!
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="">
                                                        <a href={`/product/${item?.id}`}
                                                           className="h3 text-decoration-none text-config"
                                                           title={item.name}>{item.name}</a>
                                                    </div>

                                                    <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                        <li>M/L/X/XL</li>
                                                        <li className="pt-2">
                                            <span
                                                className="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                                            <span
                                                                className="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                                            <span
                                                                className="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                                            <span
                                                                className="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                                            <span
                                                                className="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                                                        </li>
                                                    </ul>
                                                    <ul className="list-unstyled d-flex justify-content-center mb-1">
                                                        <li>
                                                            <i className="text-warning fa fa-star"></i>
                                                            <i className="text-warning fa fa-star"></i>
                                                            <i className="text-warning fa fa-star"></i>
                                                            <i className="text-muted fa fa-star"></i>
                                                            <i className="text-muted fa fa-star"></i>
                                                        </li>
                                                    </ul>
                                                    <p className="text-center mb-0 price_txt">{item.price.toLocaleString('vi', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    })}</p>
                                                </div>
                                            </div>
                                        </div>))
                                   }
                                </div>

                            </div>

                        </div>
                    </div>
                    {/* <!-- End Content --> */}
                    <Modal show={show} onHide={handleClose} size={status ? "lg" : "sm"} centered>
                        {status ?
                            <Modal.Body>
                                <div className="container pb-5">
                                    <div className="row">
                                        <div className="col-lg-5 mt-5">
                                            <div className="card mb-3">
                                                <img className="card-img img-fluid"
                                                     src={productDetail.at(0)?.infoProduct?.linkImg}
                                                     alt="Card image cap"
                                                     id="product-detail"/>
                                            </div>

                                        </div>
                                        {/* <!-- col end --> */}
                                        {<div className="col-lg-7 mt-5">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h1 className="h2">{productDetail.at(0)?.infoProduct?.name}</h1>
                                                    <p className="h3 py-2 price_txt">{productDetail.at(0)?.infoProduct?.price.toLocaleString('vi', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    })}</p>
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item">
                                                            <h6>Avaliable Color :</h6>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <p className="text-muted"><strong>White / Black</strong></p>
                                                        </li>
                                                    </ul>

                                                    {<Form>
                                                        <input type="hidden" name="product-title" value="Activewear"/>
                                                        <div className="row">
                                                            <div className="col-full">
                                                                <strong>Màu sắc </strong>
                                                                {<Form onChange={handleChangeColor}>
                                                                    {Array.from(colorAvail).map((i) =>
                                                                        <Form.Check
                                                                            inline
                                                                            reverse
                                                                            label={i}
                                                                            name="group1"
                                                                            type="radio"
                                                                            id={i}
                                                                        />
                                                                    )}
                                                                </Form>}
                                                            </div>

                                                            <div className="col-full">
                                                                <strong>Kích cỡ</strong>
                                                                {loadSize ? <Form onChange={handleChangeSize}>
                                                                    {sizeAvail?.map((i) =>
                                                                        <Form.Check
                                                                            inline
                                                                            reverse
                                                                            label={i?.size}
                                                                            name="group_size"
                                                                            type="radio"
                                                                            id={i?.size}
                                                                        />
                                                                    )}
                                                                </Form> : null}
                                                            </div>

                                                            <div className="col-full flex align-items-center pb-3">
                                                                <div className="list-inline-item">Số lượng</div>
                                                                <div className="count-input spinner_input">

                                                                    <InputSpinner
                                                                        type={'int'}
                                                                        precision={0}
                                                                        max={100}
                                                                        min={1}
                                                                        step={1}
                                                                        value={1}
                                                                        onChange={handleChangeAmount}
                                                                        variant={'info'}
                                                                        size="sm"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row pb-3">
                                                            <div className="col d-grid">
                                                                <button className="btn btn-success btn-lg"
                                                                        onClick={buyNow} value="buy">Mua ngay
                                                                </button>
                                                            </div>
                                                            <div className="col d-grid">
                                                                <button type="submit" className="btn btn-success btn-lg"
                                                                        name="submit" onClick={handleSubmitAdd}>
                                                                    Giỏ hàng
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Form>}

                                                </div>
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                            </Modal.Body>
                            :
                            <Modal.Body>
                                <div className="container pb-5">
                                    <img className="card-img img-fluid" src={imgSelect} width="400" alt="Card image cap"
                                         id="product-detail"/>
                                </div>
                            </Modal.Body>
                        }
                        <Modal.Footer>

                        </Modal.Footer>
                    </Modal>
                </div>
                :
                <div className={"center loading"}>
                    <ReactLoading type={'bubbles'} color='#fffff' height={'33px'} width={'9%'}/>
                </div>
            }
        </>)

    }
;
export default userLayout(RecommendPage);