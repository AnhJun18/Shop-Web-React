import React, {useEffect, useState} from "react";
import userLayout from "../user/userLayout"
import "./../assets/css/user-view.css";
import ReactLoading from 'react-loading';
import axiosApiInstance from "../context/interceptor";
import {Modal, Button, Form} from "react-bootstrap"
import InputSpinner from "react-bootstrap-input-spinner";

const ShopPage = () => {
    const [list, setList] = useState([]);
    const [load, setLoad] = useState(false);
    const [status, setStatus] = useState(0);
    const [listCate, setListCate] = useState([]);
    const [productDetail, setProductSelected] = useState([]);
    const [imgSelect, setImgSelect] = useState();
    const [colorAvail, setColorAvail] = useState(new Set());
    const [sizeAvail, setSizeAvail] = useState();
    let size=null;
    let color=null;
    let sl=null;


    async function getProduct() {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/product/all`)
        setLoad(true);
        setList(result?.data)
    }

    async function getCatagory() {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/product/category/all`)
        setLoad(true);
        setListCate(result?.data)
    }

    async function getDetails(id) {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/product/detail/${id}`)
        setStatus(1)
        setLoad(true);
        setProductSelected(result?.data)
        setSizeAvail(result?.data)
        const setColor= new Set()
            result?.data?.forEach(i=>{
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

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setImgSelect(null);
        setStatus(0)
    }

    const handleShow = (e) => {
        setImgSelect(e.target.title)
        setShow(true);
        getDetails(e.target.id)


    }

    const handleChangeColor = (e)=>{
        color=e.target.id
       setSizeAvail(productDetail.filter(i=> i.color===color))
    }
    const handleChangeSize= (e)=>{
        size=e.target.id;
        console.log(e.target.id)
    }
    const handleChangeAmount = (e)=>{
        sl=e;
        console.log(e)
    }

    const handleSubmitAdd = (e)=>{
        e.preventDefault()
        console.log(e)
    }
    useEffect(() => {
        getProduct();
        getCatagory();
    }, []);

    return (<>
        {load ?
            <div>
                <div className="container py-5">
                    <div className="row">

                        <div className="col-lg-3">
                            <h1 className="h2 pb-4">Danh mục</h1>
                            <ul className="list-unstyled templatemo-accordion">
                                {listCate.map((item) => (
                                    <li className="pb-3">
                                        <a className="collapsed d-flex justify-content-between h3 text-decoration-none"
                                           href="#">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="col-lg-9">
                            <div className="row">
                                <div className="col-md-6">
                                    <ul className="list-inline shop-top-menu pb-3 pt-1">
                                        <li className="list-inline-item">
                                            <a className="h3 text-dark text-decoration-none mr-3" href="#">All</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a className="h3 text-dark text-decoration-none mr-3" href="#">Men's</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a className="h3 text-dark text-decoration-none" href="#">Women's</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-6 pb-4">
                                    <div className="d-flex">
                                        <select className="form-control">
                                            <option>Featured</option>
                                            <option>A to Z</option>
                                            <option>Item</option>
                                        </select>
                                    </div>
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
                            </div>
                            <div div="row">
                                <ul className="pagination pagination-lg justify-content-end">
                                    <li className="page-item disabled">
                                        <a className="page-link active rounded-0 mr-3 shadow-sm border-top-0 border-left-0"
                                           href="#"
                                           tabIndex="-1">1</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link rounded-0 mr-3 shadow-sm border-top-0 border-left-0 text-dark"
                                           href="#">2</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link rounded-0 shadow-sm border-top-0 border-left-0 text-dark"
                                           href="#">3</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
                {/* <!-- End Content --> */}

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

                                                {<form action="" method="GET">
                                                    <input type="hidden" name="product-title" value="Activewear"/>
                                                    <div class="row">
                                                        <div className="col-auto">
                                                            Color :
                                                            {<Form onChange={handleChangeColor}>
                                                                {Array.from(colorAvail).map((i)=>
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

                                                        <div class="col-auto">
                                                            Size
                                                            <Form onChange={handleChangeSize}>
                                                            {sizeAvail?.map((i)=>
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

                                                        <div class="col-auto flex align-items-center pb-3">
                                                            <div className="list-inline-item">Color :</div>
                                                            <div className="count-input spinner_input">

                                                                <InputSpinner
                                                                    type={'int'}
                                                                    precision={0}
                                                                    max={100}
                                                                    min={1}
                                                                    step={1}
                                                                    value={0}
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
                                                </form>}

                                                    </div>
                                                    </div>
                                                    </div>}
                                            </div>
                                        </div>
                                    </Modal.Body>
                                        :
                                        <Modal.Body>
                                        <div className="container pb-5">
                                        <img class="card-img img-fluid" src={imgSelect} width="400" alt="Card image cap" id="product-detail"/>
                                        </div>
                                        </Modal.Body>
                                    }
                                    <Modal.Footer>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Modal.Body>
                        <Modal.Footer>

                            


                        </Modal.Footer>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            :
                            <div className={"center"}>
                                <ReactLoading type={'bubbles'} color='#fffff' height={'150px'} width={'10px'}/>
                            </div>
                            }
                        </>)

                    }
;export default userLayout(ShopPage);