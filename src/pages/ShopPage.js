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
                                    <div className="col-md-3">
                                        <div className="card mb-3 product-wap rounded-0">
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

                <Modal show={show} onHide={handleClose} dialogClassName={"modal-xl"}>
                        <Modal.Header closeButton>
                            <Modal.Title>Chi tiết sản phẩm</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <div class="container pb-5">
                            <div class="row">
                                <div class="col-lg-5 mt-5">
                                    <div class="card mb-3">
                                        <img class="card-img img-fluid" src={require('./../assets/images/product_single_10.jpg')} alt="Card image cap" id="product-detail"/>
                                    </div>
                                    
                                </div>
                                {/* <!-- col end --> */}
                                <div class="col-lg-7 mt-5">
                                    <div class="card">
                                        <div class="card-body">
                                            <h1 class="h2">Active Wear</h1>
                                            <p class="h3 py-2">$25.00</p>
                                            <p class="py-2">
                                                <i class="fa fa-star text-warning"></i>
                                                <i class="fa fa-star text-warning"></i>
                                                <i class="fa fa-star text-warning"></i>
                                                <i class="fa fa-star text-warning"></i>
                                                <i class="fa fa-star text-secondary"></i>
                                                <span class="list-inline-item text-dark">Rating 4.8 | 36 Comments</span>
                                            </p>
                                            <ul class="list-inline">
                                                <li class="list-inline-item">
                                                    <h6>Brand:</h6>
                                                </li>
                                                <li class="list-inline-item">
                                                    <p class="text-muted"><strong>Easy Wear</strong></p>
                                                </li>
                                            </ul>

                                            <h6>Description:</h6>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse. Donec condimentum elementum convallis. Nunc sed orci a diam ultrices aliquet interdum quis nulla.</p>
                                            <ul class="list-inline">
                                                <li class="list-inline-item">
                                                    <h6>Avaliable Color :</h6>
                                                </li>
                                                <li class="list-inline-item">
                                                    <p class="text-muted"><strong>White / Black</strong></p>
                                                </li>
                                            </ul>

                                            <h6>Specification:</h6>
                                            <ul class="list-unstyled pb-3">
                                                <li>Lorem ipsum dolor sit</li>
                                                <li>Amet, consectetur</li>
                                                <li>Adipiscing elit,set</li>
                                                <li>Duis aute irure</li>
                                                <li>Ut enim ad minim</li>
                                                <li>Dolore magna aliqua</li>
                                                <li>Excepteur sint</li>
                                            </ul>

                                            <form action="" method="GET">
                                                <input type="hidden" name="product-title" value="Activewear"/>
                                                <div class="row">
                                                    <div class="col-auto">
                                                        <ul class="list-inline pb-3">
                                                            <li class="list-inline-item">Size :
                                                                <input type="hidden" name="product-size" id="product-size" value="S"/>
                                                            </li>
                                                            <li class="list-inline-item"><span class="btn btn-success btn-size">S</span></li>
                                                            <li class="list-inline-item"><span class="btn btn-success btn-size">M</span></li>
                                                            <li class="list-inline-item"><span class="btn btn-success btn-size">L</span></li>
                                                            <li class="list-inline-item"><span class="btn btn-success btn-size">XL</span></li>
                                                        </ul>
                                                    </div>
                                                    <div class="col-auto">
                                                        <ul class="list-inline pb-3">
                                                            <li class="list-inline-item text-right">
                                                                Quantity
                                                                <input type="hidden" name="product-quanity" id="product-quanity" value="1"/>
                                                            </li>
                                                            <li class="list-inline-item"><span class="btn btn-success" id="btn-minus">-</span></li>
                                                            <li class="list-inline-item"><span class="badge bg-secondary" id="var-value">1</span></li>
                                                            <li class="list-inline-item"><span class="btn btn-success" id="btn-plus">+</span></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class="row pb-3">
                                                    <div class="col d-grid">
                                                        <button type="submit" class="btn btn-success btn-lg" name="submit" value="buy">Buy</button>
                                                    </div>
                                                    <div class="col d-grid">
                                                        <button type="submit" class="btn btn-success btn-lg" name="submit" value="addtocard">Add To Cart</button>
                                                    </div>
                                                </div>
                                            </form>

                                        </div>
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
            <div className={"center loading"}>
            <ReactLoading type={'bubbles'} color='#fffff'  height={'150px'} width={'10px'} />
            </div>
        }
    </>)

};

export default userLayout(ShopPage);