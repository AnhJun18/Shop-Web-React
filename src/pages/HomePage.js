import React, {useEffect, useState} from "react";
import userLayout from "../user/userLayout"
import "./../assets/css/user-view.css";
import axiosApiInstance from "../context/interceptor";
import {Form, Modal} from "react-bootstrap"
import InputSpinner from "react-bootstrap-input-spinner";
import axios from "../api/axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate()
    const [list, setList] = useState([]);
    const [load, setLoad] = useState(false);
    const [loadSize, setLoadSize] = useState(false);
    const [status, setStatus] = useState(0);
    const [listCate, setListCate] = useState([]);
    const [listBestSeller, setBestSeller] = useState([]);
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

    async function getProduct() {
        const result = await axios.get(axiosApiInstance.defaults.baseURL + `/api/product/all`);
        setLoad(true);
        setList(result?.data)
    }

    async function getBestSeller() {
        const result = await axios.get(axiosApiInstance.defaults.baseURL + `/api/product/best-seller`);
        setLoad(true);
        setBestSeller(result?.data)

    }

    async function getCategory() {
        const result = await axios.get(axiosApiInstance.defaults.baseURL + `/api/category/all`)
        setLoad(true);
        setListCate(result?.data)
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
    }
    const handleChangeAmount = (e) => {
        item.sl = e
        setItem(item)
    }

    const buyNow = (e) => {
        const tmp = {};
        if (item.color && item.size) {
            const newItem = productDetail.find(i => i?.color === item.color && i?.size == item.size)
            if (newItem) {
                if (newItem?.current_number < item?.sl || newItem?.current_number < 1)
                    toast.error("S???n ph???m kh??ng ????? s??? l?????ng b???n c???n! \n Vui l??ng gi???m s??? l?????ng!")
                else {
                    tmp.amount = item.sl ? item.sl : 1
                    tmp.product = productDetail.find(i => i.color === item.color && i.size === item.size)
                    order.push(tmp)
                    setOrder(order)
                    navigate('/theorder', {state: order});
                }
            }
        } else
            toast.error("Vui l??ng ch???n ????? th??ng tin")

        e.preventDefault()
    }

    const handleSubmitAdd = async (e) => {
        e.preventDefault()
        const newItem = productDetail.find(i => i?.color === item.color && i?.size == item.size)
        if (newItem) {
            if (newItem?.current_number < item?.sl || newItem?.current_number < 1)
                toast.error("S???n ph???m kh??ng ????? s??? l?????ng b???n c???n! \n Vui l??ng gi???m s??? l?????ng!")
            else {
                let kq = null;
                try {
                    kq = await handleAddCart(newItem?.id, item.sl ? item?.sl : 1)
                } catch (e) {

                }
                if (kq?.data?.status === 200) {
                    setItem({})
                    setShow(false)
                    toast.success("S???n ph???m ???? ???????c th??m vao gi??? h??ng c???a b???n!", {position: "top-center"})
                } else {
                    toast.error("Th???t b???i! Vui l??ng th??? l???i")
                }
            }

        } else {
            toast.error("Vui l??ng ch???n m??u v?? k??ch th?????c ph?? h???p!")
        }
    }

    useEffect(() => {
        getBestSeller();
        getProduct();
        getCategory();

    }, []);


    return <>
        {/* <!-- Start Banner Hero --> */}
        <div id="template-mo-zay-hero-carousel" class="carousel slide" data-bs-ride="carousel">
            <ol class="carousel-indicators d-none">
                <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="0" class="active"></li>
                <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="1"></li>
            </ol>
            <div class="carousel-inner info-shop">
                <div class="carousel-item active">
                    <div class="container banner">
                        <div class="row">
                            <img
                                src="https://theme.hstatic.net/200000305259/1000963148/14/slide_index_2.jpg?v=74"
                                alt=""/>
                        </div>
                    </div>
                </div>
                <div class="carousel-item ">
                    <div class="container banner">
                        <div class="row">
                            <img
                                src="https://theme.hstatic.net/200000305259/1000963148/14/slide_index_1.jpg?v=74"
                                alt=""/>
                        </div>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev text-decoration-none w-auto ps-3"
               href="#template-mo-zay-hero-carousel"
               role="button" data-bs-slide="prev">
                <i class="fa fa-chevron-left"></i>
            </a>
            <a class="carousel-control-next text-decoration-none w-auto pe-3"
               href="#template-mo-zay-hero-carousel"
               role="button" data-bs-slide="next">
                <i class="fa fa-chevron-right"></i>
            </a>
        </div>
        {/* <!-- End Banner Hero --> */}

        {/*Start Chinh sach*/}
        <section class="container ">
            <div class="row text-center pt-3 ">
                <div class="col-md-3 info">
                    <h2 class="home-icon">
                        <i class="fa fa-truck"></i>
                    </h2>
                    <h3 class="h6 text-decoration-none">
                        GIAO H??NG TO??N QU???C
                    </h3>
                    <p class="content">Th???i gian giao h??ng linh ?????ng t??? 3 - 4 - 5 ng??y t??y khu v???c, ????i khi s???
                        nhanh h??n
                        ho???c ch???m h??n. Mong Qu?? Kh??ch h??ng th??ng c???m.</p>
                </div>

                <div class="col-md-3 info">
                    <h2 class="home-icon">
                        <i class="fa fa-refresh"></i>
                    </h2>
                    <h3 class="h6 text-decoration-none">
                        CH??NH S??CH ?????I TR??? H??NG
                    </h3>
                    <p class="content">S???n ph???m ???????c ph??p ?????i h??ng trong v??ng 36h n???u ph??t sinh l???i t??? nh?? s???n
                        xu???t &#40;Y??u c???u: h??nh ???nh ph???n b??? l???i r?? n??t, chi ti???t v?? ?????y ?????&#41;.</p>
                </div>

                <div class="col-md-3 info">
                    <h2 class="home-icon">
                        <i class="fa fa-truck"></i>
                    </h2>
                    <h3 class="h6 text-decoration-none">
                        GIAO H??NG NH???N TI???N V?? KI???M K?? ????N H??NG
                    </h3>
                    <p class="content">???????c ph??p ki???m h??ng tr?????c khi thanh to??n.</p>
                </div>

                <div class="col-md-3 info">
                    <h2 class="home-icon">
                        <i class="fa fa-phone"></i>
                    </h2>
                    <h3 class="h6 text-decoration-none">
                        ?????T H??NG ONLINE V?? KI???M TRA ????N H??NG VUI L??NG LI??N H???
                    </h3>
                    <p class="content">Hotline: 012 345 6789.</p>
                </div>

            </div>
        </section>
        {/*<!--End Ch??nh s??ch--> */}

        {/**<!--Start favorite category--> */}
        <section>
            <div class="container py-5">
                <div class="row text-center py-3">
                    <div class="col-lg-6 m-auto">
                        <h1 class="h1 py-1">DANH M???C</h1>
                        <p>Danh m???c s???n ph???m c???a c???a h??ng. </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 py-2">
                        <div className="card rounded-0">
                            <a href="shop/??o Thun"><img className="card-img rounded-0 img-fluid"
                                                        src="https://theme.hstatic.net/200000305259/1000967293/14/banner_index_1.jpg?v=12"/></a>
                        </div>
                    </div>

                    <div class="col-md-3 py-2">
                        <div className="card rounded-0">
                            <a href="shop/??o Thun"><img className="card-img rounded-0 img-fluid"
                                                        src="https://theme.hstatic.net/200000305259/1000967293/14/banner_index_2.jpg?v=12"/></a>
                        </div>
                    </div>

                    <div class="col-md-3 py-2">
                        <div className="card rounded-0">
                            <a href="shop/??o Thun"><img className="card-img rounded-0 img-fluid"
                                                        src="https://theme.hstatic.net/200000305259/1000967293/14/banner_index_3.jpg?v=12"/></a>
                        </div>
                    </div>

                    <div class="col-md-3 py-2">
                        <div className="card rounded-0">
                            <a href="shop/??o Thun"><img className="card-img rounded-0 img-fluid"
                                                        src="https://theme.hstatic.net/200000305259/1000967293/14/banner_index_4.jpg?v=12"/></a>
                        </div>
                    </div>

                    <div class="col-md-3 py-2">
                        <div className="card rounded-0">
                            <a href="shop/??o Thun"><img className="card-img rounded-0 img-fluid"
                                                        src="https://theme.hstatic.net/200000305259/1000967293/14/banner_index_5.jpg?v=12"/></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* <!-- Start Best Seller Product --> */}
        <section>
            <div class="container py-5">
                <div class="row text-center py-3">
                    <div class="col-lg-6 m-auto">
                        <h1 class="h1 py-1">B??n ch???y</h1>
                        <p>Top s???n ph???m b??n ch???y nh???t</p>
                    </div>
                </div>
                <div className="row">
                    {listBestSeller.map((item) => (
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
                        </div>
                    ))}
                </div>
            </div>

            <div className="container py-5">
                <div className="row text-center py-3">
                    <div className="col-lg-6 m-auto">
                        <h1 className="h1 py-1">S???n Ph???m</h1>
                        <p>T???t c??? s???n ph???m c???a c???a h??ng</p>
                    </div>
                </div>
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
                        </div>
                    ))}
                    <div className="col-md-12 d-flex justify-content-center">
                        <a href="">
                            <button type="button" className="btn btn-outline-primary">Xem t???t c???</button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        {/* <!-- End Best Seller Product --> */}

        {/*<!--Start modal -->*/}
        <Modal show={show} onHide={handleClose} size={status ? "lg" : "sm"} centered>
            {status ?
                <Modal.Body>
                    <div class="container pb-5">
                        <div class="row">
                            <div class="col-lg-5 mt-5">
                                <div class="card mb-3">
                                    <img class="card-img img-fluid"
                                         src={imgSelect} alt="Card image cap"
                                         id="product-detail"/>
                                </div>

                            </div>
                            {/* <!-- col end --> */}
                            {<div class="col-lg-7 mt-5">
                                <div class="card">
                                    <div class="card-body">
                                        <h1 class="h2">{productDetail.at(0)?.infoProduct?.name}</h1>
                                        <p class="h3 py-2 price_txt">{productDetail.at(0)?.infoProduct?.price.toLocaleString('vi', {
                                            style: 'currency',
                                            currency: 'VND'
                                        })}</p>
                                        <ul class="list-inline">
                                            <li class="list-inline-item">
                                                <h6>Avaliable Color :</h6>
                                            </li>
                                            <li class="list-inline-item">
                                                <p class="text-muted"><strong>White / Black</strong></p>
                                            </li>
                                        </ul>

                                        {<Form>
                                            <input type="hidden" name="product-title" value="Activewear"/>
                                            <div class="row">
                                                <div className="col-full">
                                                    <strong>M??u </strong>
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

                                                <div class="col-full">
                                                    <strong>K??ch th?????c</strong>
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

                                                <div class="col-full flex align-items-center pb-3">
                                                    <strong className="me-3">S??? l?????ng</strong>
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
                                            <div class="row pb-3">
                                                <div class="col d-grid">
                                                    <button class="btn btn-success btn-lg"
                                                            onClick={buyNow} value="buy">Mua ngay
                                                    </button>
                                                </div>
                                                <div class="col d-grid">
                                                    <button type="submit" class="btn btn-success btn-lg"
                                                            name="submit" onClick={handleSubmitAdd}>Gi??? h??ng
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
                        <img class="card-img img-fluid" src={imgSelect} width="400" alt="Card image cap"
                             id="product-detail"/>
                    </div>
                </Modal.Body>
            }
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
        {/*<!--End modal-->*/}

        {/* <!-- Start Brands --> */}
        <section className="bg-light py-5">
            <div className="container my-4">
                <div className="row text-center py-3">
                    <div className="col-lg-6 m-auto">
                    </div>
                    <div className="col-lg-9 m-auto tempaltemo-carousel">
                        <div className="row d-flex flex-row">
                            {/* <!--Controls--> */}
                            <div className="col-1 align-self-center">
                                <a className="h1" href="#multi-item-example" role="button" data-bs-slide="prev">
                                    <i className="text-light fas fa-chevron-left"></i>
                                </a>
                            </div>
                            {/* <!--End Controls--> */}

                            {/* <!--Carousel Wrapper--> */}
                            <div className="col">
                                <div className="carousel slide carousel-multi-item pt-2 pt-md-0"
                                     id="multi-item-example"
                                     data-bs-ride="carousel">
                                    {/* <!--Slides--> */}
                                    <div className="carousel-inner product-links-wap" role="listbox">

                                        {/* <!--First slide--> */}
                                        <div className="carousel-item active">
                                            <div className="row">
                                                <div className="col-3 p-md-5">
                                                    <a href="#"><img className="img-fluid brand-img"
                                                                     src={require('./../assets/images/brand_01.png')}
                                                                     alt="Brand Logo"/></a>
                                                </div>
                                                <div className="col-3 p-md-5">
                                                    <a href="#"><img className="img-fluid brand-img"
                                                                     src={require('./../assets/images/brand_02.png')}
                                                                     alt="Brand Logo"/></a>
                                                </div>
                                                <div className="col-3 p-md-5">
                                                    <a href="#"><img className="img-fluid brand-img"
                                                                     src={require('./../assets/images/brand_03.png')}
                                                                     alt="Brand Logo"/></a>
                                                </div>
                                                <div className="col-3 p-md-5">
                                                    <a href="#"><img className="img-fluid brand-img"
                                                                     src={require('./../assets/images/brand_04.png')}
                                                                     alt="Brand Logo"/></a>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!--End First slide--> */}

                                        {/* <!--Second slide--> */}
                                        <div className="carousel-item">
                                            <div className="row">
                                                <div className="col-3 p-md-5">
                                                    <a href="#"><img className="img-fluid brand-img"
                                                                     src={require('./../assets/images/brand_01.png')}
                                                                     alt="Brand Logo"/></a>
                                                </div>
                                                <div className="col-3 p-md-5">
                                                    <a href="#"><img className="img-fluid brand-img"
                                                                     src={require('./../assets/images/brand_02.png')}
                                                                     alt="Brand Logo"/></a>
                                                </div>
                                                <div className="col-3 p-md-5">
                                                    <a href="#"><img className="img-fluid brand-img"
                                                                     src={require('./../assets/images/brand_03.png')}
                                                                     alt="Brand Logo"/></a>
                                                </div>
                                                <div className="col-3 p-md-5">
                                                    <a href="#"><img className="img-fluid brand-img"
                                                                     src={require('./../assets/images/brand_04.png')}
                                                                     alt="Brand Logo"/></a>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!--End Second slide--> */}

                                        {/* <!--Third slide--> */}
                                        <div className="carousel-item">
                                            <div className="row">
                                                <div className="col-3 p-md-5">
                                                    <a href="#"><img className="img-fluid brand-img"
                                                                     src={require('./../assets/images/brand_01.png')}
                                                                     alt="Brand Logo"/></a>
                                                </div>
                                                <div className="col-3 p-md-5">
                                                    <a href="#"><img className="img-fluid brand-img"
                                                                     src={require('./../assets/images/brand_02.png')}
                                                                     alt="Brand Logo"/></a>
                                                </div>
                                                <div className="col-3 p-md-5">
                                                    <a href="#"><img className="img-fluid brand-img"
                                                                     src={require('./../assets/images/brand_03.png')}
                                                                     alt="Brand Logo"/></a>
                                                </div>
                                                <div className="col-3 p-md-5">
                                                    <a href="#"><img className="img-fluid brand-img"
                                                                     src={require('./../assets/images/brand_04.png')}
                                                                     alt="Brand Logo"/></a>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!--End Third slide--> */}

                                    </div>
                                    {/* <!--End Slides--> */}
                                </div>
                            </div>
                            {/* <!--End Carousel Wrapper--> */}

                            {/* <!--Controls--> */}
                            <div className="col-1 align-self-center">
                                <a className="h1" href="#multi-item-example" role="button" data-bs-slide="next">
                                    <i className="text-light fas fa-chevron-right"></i>
                                </a>
                            </div>
                            {/* <!--End Controls--> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* <!--End Brands--> */}
    </>

}

export default userLayout(HomePage);