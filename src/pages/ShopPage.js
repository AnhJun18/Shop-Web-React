import {useEffect, useState} from "react";
import userLayout from "../user/userLayout"
import "./../assets/css/user-view.css";
import ReactLoading from 'react-loading';
import axiosApiInstance from "../context/interceptor";
import {Modal, Button} from "react-bootstrap"




const ShopPage = () => {
    const [list, setList] = useState([]);
    const [load, setLoad] = useState(false);
    const [listCate, setListCate] = useState([]);


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
        setLoad(true);
        setProductDetail(result?.data)
        console.log(result)
    }

    const [productDetail, setProductDetail] = useState([]);
    const [productSelected, setProductSelected] = useState({});



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
        setShow(true);
        const idSelected = Number(parents(e.target).find(function (c) {
            return c.tagName == "TR"
        }).children[0].innerText);

    }

    useEffect(() => {
        getProduct();
        getCatagory();
        console.log(list)
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
                                    <div className="col-md-4">
                                        <div className="card mb-4 product-wap rounded-0">
                                            <div className="card rounded-0">
                                                <img className="img-config card-img rounded-0 img-fluid" src={item.linkImg}/>
                                                <div
                                                    className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                        <button type="button" className="btn btn-success text-white"
                                                            onClick={handleShow}>
                                                            XEM NGAY!
                                                        </button>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="">
                                                    <a href="shop-single.html"
                                                       className="h3 text-decoration-none text-config" title={item.name}>{item.name}</a>
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
                                                <p className="text-center mb-0">{item.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
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

                <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Chi tiết sản phẩm</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div class="container-fliud">
                                <div class="wrapper row">
                                    <div class="preview col-md-6">
                                        
                                        <div class="preview-pic tab-content">
                                        <div class="tab-pane active" id="pic-1"><img src="http://placekitten.com/400/252" /></div>
                                        </div>
                                        
                                    </div>
                                    <div class="details col-md-6">
                                        <h3 class="product-title">men's shoes fashion</h3>
                                        <div class="rating">
                                            <div class="stars">
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star"></span>
                                                <span class="fa fa-star"></span>
                                            </div>
                                            <span class="review-no">41 reviews</span>
                                        </div>
                                        <p class="product-description">Suspendisse quos? Tempus cras iure temporibus? Eu laudantium cubilia sem sem! Repudiandae et! Massa senectus enim minim sociosqu delectus posuere.</p>
                                        <h4 class="price">current price: <span>$180</span></h4>
                                        <p class="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
                                        <h5 class="sizes">sizes:
                                            <span class="size" data-toggle="tooltip" title="small">s</span>
                                            <span class="size" data-toggle="tooltip" title="medium">m</span>
                                            <span class="size" data-toggle="tooltip" title="large">l</span>
                                            <span class="size" data-toggle="tooltip" title="xtra large">xl</span>
                                        </h5>
                                        <h5 class="colors">colors:
                                            <span class="color orange not-available" data-toggle="tooltip" title="Not In store"></span>
                                            <span class="color green"></span>
                                            <span class="color blue"></span>
                                        </h5>
                                        <div class="action">
                                            <button class="add-to-cart btn btn-default" type="button">add to cart</button>
                                            <button class="like btn btn-default" type="button"><span class="fa fa-heart"></span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>

                            


                        </Modal.Footer>
                    </Modal>
            </div>
            :
            <div className={"center"}>
            <ReactLoading type={'bubbles'} color='#fffff'  height={'150px'} width={'10px'} />
            </div>
        }
    </>)

};

export default userLayout(ShopPage);