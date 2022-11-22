import React, {useEffect, useState} from "react";
import userLayout from "../user/userLayout"
import "./../assets/css/user-view.css";
import ReactLoading from 'react-loading';
import axiosApiInstance from "../context/interceptor";
import {Modal, Button, Form} from "react-bootstrap"
import InputSpinner from "react-bootstrap-input-spinner";
import axios from "../api/axios";
import {toast} from "react-toastify";

const HomePage = () => {
    const [list, setList] = useState([]);
    const [load, setLoad] = useState(false);
    const [status, setStatus] = useState(0);
    const [listCate, setListCate] = useState([]);
    const [productDetail, setProductSelected] = useState([]);
    const [imgSelect, setImgSelect] = useState();
    const [colorAvail, setColorAvail] = useState(new Set());
    const [sizeAvail, setSizeAvail] = useState();
    const [item, setItem] = useState({});
    const [show, setShow] = useState(false);


    const handleAddCart = async (id, amount) => {
        const body = {
            "productID": id,
            "amount": amount
        }
        const result = await axios({
            method: 'post',
            url: axiosApiInstance.defaults.baseURL + `/api/cart/AddToCart`,
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("tokens")).data.accessToken}`,
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            data: body
        });
        return result
    }

    async function getProduct() {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/product/all`)
        setLoad(true);
        setList(result?.data)
    }

    async function getCategory() {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/category/all`)
        setLoad(true);
        setListCate(result?.data)
    }

    async function getDetails(id) {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/product/detail/${id}`)
        setStatus(1)
        setLoad(true);
        setProductSelected(result?.data)
        setSizeAvail(result?.data)
        const setColor = new Set()
        result?.data?.forEach(i => {
            setColor.add(i?.color)
        })

        setColorAvail(setColor)
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

    useEffect(() => {
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
            <div class="carousel-inner ">
                <div class="carousel-item active">
                    <div class="container banner">
                        <div class="row pt-4">
                            <img src="https://theme.hstatic.net/200000305259/1000963148/14/slide_index_2.jpg?v=74"
                                 alt=""/>
                        </div>
                    </div>
                </div>
                <div class="carousel-item ">
                    <div class="container banner">
                        <div class="row pt-4">
                            <img src="https://theme.hstatic.net/200000305259/1000963148/14/slide_index_1.jpg?v=74"
                                 alt=""/>
                        </div>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev text-decoration-none w-auto ps-3" href="#template-mo-zay-hero-carousel"
               role="button" data-bs-slide="prev">
                <i class="fa fa-chevron-left"></i>
            </a>
            <a class="carousel-control-next text-decoration-none w-auto pe-3" href="#template-mo-zay-hero-carousel"
               role="button" data-bs-slide="next">
                <i class="fa fa-chevron-right"></i>
            </a>
        </div>
        {/* <!-- End Banner Hero --> */}

        {/*Start Chinh sach*/}
        <section class="container py-5">
            <div class="row text-center pt-3">
                <div class="col-md-3">
                    <h2 class="home-icon">
                        <i class="fa fa-truck"></i>
                    </h2>
                    <h3 class="h3 text-decoration-none">
                        GIAO HÀNG TOÀN QUỐC
                    </h3>
                    <p class="content">Thời gian giao hàng linh động từ 3 - 4 - 5 ngày tùy khu vực, đôi khi sẽ nhanh hơn
                        hoặc chậm hơn. Mong Quý Khách hàng thông cảm và cố gắng đợi hàng giúp shop.</p>
                </div>

                <div class="col-md-3">
                    <h2 class="home-icon">
                        <i class="fa fa-refresh"></i>
                    </h2>
                    <h3 class="h3 text-decoration-none">
                        CHÍNH SÁCH ĐỔI TRẢ HÀNG
                    </h3>
                    <p class="content">Sản phẩm được phép đổi hàng trong vòng 36h nếu phát sinh lỗi từ nhà sản
                        xuất &#40;Yêu cầu: hình ảnh phần bị lỗi rõ nét, chi tiết và đầy đủ&#41;.</p>
                </div>

                <div class="col-md-3">
                    <h2 class="home-icon">
                        <i class="fa fa-truck"></i>
                    </h2>
                    <h3 class="h3 text-decoration-none">
                        GIAO HÀNG NHẬN TIỀN VÀ KIỂM KÊ ĐƠN HÀNG
                    </h3>
                    <p class="content">Được phép kiểm hàng trước khi thanh toán. Lưu ý: Trường hợp Quý Khách hàng đã
                        nhận hàng về nhà, vui lòng quay video unbox đơn hàng trong tình trạng nguyên vẹn để có căn cứ
                        xác thực đơn hàng gặp phải vấn đề, trường hợp không có video shop không thể hỗ trợ.</p>
                </div>

                <div class="col-md-3">
                    <h2 class="home-icon">
                        <i class="fa fa-phone"></i>
                    </h2>
                    <h3 class="h3 text-decoration-none">
                        ĐẶT HÀNG ONLINE VÀ KIỂM TRA ĐƠN HÀNG VUI LÒNG LIÊN HỆ
                    </h3>
                    <p class="content">Hotline: 012 345 6789.</p>
                </div>

            </div>
        </section>
        {/*<!--End Chính sách--> */}

        {/**<!--Start favorite category--> */}
        <section>
            <div class="container py-5">
                <div class="row text-center py-3">
                    <div class="col-lg-6 m-auto">
                        <h1 class="h1 py-1">DANH MỤC</h1>
                        <p>Danh mục sản phẩm của cửa hàng. </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 py-2">
                        <div className="card rounded-0">
                            <a href="shop/Áo Thun"><img className="card-img rounded-0 img-fluid"
                                            src="https://theme.hstatic.net/200000305259/1000967293/14/banner_index_1.jpg?v=12"/></a>
                        </div>
                    </div>

                    <div class="col-md-3 py-2">
                        <div className="card rounded-0">
                            <a href="shop/Áo Thun"><img className="card-img rounded-0 img-fluid"
                                            src="https://theme.hstatic.net/200000305259/1000967293/14/banner_index_2.jpg?v=12"/></a>
                        </div>
                    </div>

                    <div class="col-md-3 py-2">
                        <div className="card rounded-0">
                            <a href="shop/Áo Thun"><img className="card-img rounded-0 img-fluid"
                                            src="https://theme.hstatic.net/200000305259/1000967293/14/banner_index_3.jpg?v=12"/></a>
                        </div>
                    </div>

                    <div class="col-md-3 py-2">
                        <div className="card rounded-0">
                            <a href="shop/Áo Thun"><img className="card-img rounded-0 img-fluid"
                                            src="https://theme.hstatic.net/200000305259/1000967293/14/banner_index_4.jpg?v=12"/></a>
                        </div>
                    </div>

                    <div class="col-md-3 py-2">
                        <div className="card rounded-0">
                            <a href="shop/Áo Thun"><img className="card-img rounded-0 img-fluid"
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
                        <h1 class="h1 py-1">BEST SELLER</h1>
                        <p>Sản phẩm được bán chạy nhất.</p>
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
                                        <a href="shop-single.html"
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
                    <div class="col-md-12 d-flex justify-content-center">
                        <a href="">
                            <button type="button" class="btn btn-outline-primary">Xem tất cả</button>
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
                                         src={productDetail.at(0)?.infoProduct?.linkImg} alt="Card image cap"
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
                                                    <strong>Màu </strong>
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
                                                    <strong>Kích thước</strong>
                                                    <Form onChange={handleChangeSize}>
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
                                                    </Form>
                                                </div>

                                                <div class="col-full flex align-items-center pb-3">
                                                <strong className="me-3">Số lượng</strong>
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
                                                    <button type="submit" class="btn btn-success btn-lg"
                                                            name="submit" value="buy">Buy
                                                    </button>
                                                </div>
                                                <div class="col d-grid">
                                                    <button type="submit" class="btn btn-success btn-lg"
                                                            name="submit" onClick={handleSubmitAdd}>Add To Cart
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
                        <h1 className="h1">Our Brands</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                            Lorem ipsum dolor sit amet.
                        </p>
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