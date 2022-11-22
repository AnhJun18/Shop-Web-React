import React from "react";
import userLayout from "../user/userLayout"
import "./../assets/css/user-view.css";


const ChoosingPage = () => {
        return <>
            {/* <!-- Open Content --> */}
    <section className="bg-light">
        <div className="container pb-5">
            <div className="row">
                <div className="col-lg-5 mt-5">
                    <div className="card mb-3">
                        <img className="card-img img-fluid" src={require('./../assets/images/product_single_10.jpg')} alt="Card image cap" id="product-detail"/>
                    </div>
                    <div className="row">
                        {/* <!--Start Controls--> */}
                        <div className="col-1 align-self-center">
                            <a href="#multi-item-example" role="button" data-bs-slide="prev">
                                <i className="text-dark fas fa-chevron-left"></i>
                                <span className="sr-only">Previous</span>
                            </a>
                        </div>
                        {/* <!--End Controls--> */}
                        {/* <!--Start Carousel Wrapper--> */}
                        <div id="multi-item-example" className="col-10 carousel slide carousel-multi-item" data-bs-ride="carousel">
                            {/* <!--Start Slides--> */}
                            <div className="carousel-inner product-links-wap" role="listbox">

                                {/* <!--First slide--> */}
                                <div className="carousel-item active">
                                    <div className="row">
                                        <div className="col-4">
                                            <a href="#">
                                                <img className="card-img img-fluid" src={require('./../assets/images/product_single_01.jpg')} alt="Product Image 1"/>
                                            </a>
                                        </div>
                                        <div className="col-4">
                                            <a href="#">
                                                <img className="card-img img-fluid" src={require('./../assets/images/product_single_02.jpg')} alt="Product Image 2"/>
                                            </a>
                                        </div>
                                        <div className="col-4">
                                            <a href="#">
                                                <img className="card-img img-fluid" src={require('./../assets/images/product_single_03.jpg')} alt="Product Image 3"/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--/.First slide--> */}

                                {/* <!--Second slide--> */}
                                <div className="carousel-item">
                                    <div className="row">
                                        <div className="col-4">
                                            <a href="#">
                                                <img className="card-img img-fluid" src={require('./../assets/images/product_single_04.jpg')} alt="Product Image 4"/>
                                            </a>
                                        </div>
                                        <div className="col-4">
                                            <a href="#">
                                                <img className="card-img img-fluid" src={require('./../assets/images/product_single_05.jpg')} alt="Product Image 5"/>
                                            </a>
                                        </div>
                                        <div className="col-4">
                                            <a href="#">
                                                <img className="card-img img-fluid" src={require('./../assets/images/product_single_06.jpg')} alt="Product Image 6"/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--/.Second slide--> */}

                                {/* <!--Third slide--> */}
                                <div className="carousel-item">
                                    <div className="row">
                                        <div className="col-4">
                                            <a href="#">
                                                <img className="card-img img-fluid" src={require('./../assets/images/product_single_07.jpg')} alt="Product Image 7"/>
                                            </a>
                                        </div>
                                        <div className="col-4">
                                            <a href="#">
                                                <img className="card-img img-fluid" src={require('./../assets/images/product_single_08.jpg')} alt="Product Image 8"/>
                                            </a>
                                        </div>
                                        <div className="col-4">
                                            <a href="#">
                                                <img className="card-img img-fluid" src={require('./../assets/images/product_single_09.jpg')} alt="Product Image 9"/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--/.Third slide--> */}
                            </div>
                            {/* <!--End Slides--> */}
                        </div>
                        {/* <!--End Carousel Wrapper--> */}
                        {/* <!--Start Controls--> */}
                        <div className="col-1 align-self-center">
                            <a href="#multi-item-example" role="button" data-bs-slide="next">
                                <i className="text-dark fas fa-chevron-right"></i>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                        {/* <!--End Controls--> */}
                    </div>
                </div>
                {/* <!-- col end --> */}
                <div className="col-lg-7 mt-5">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="h2">Active Wear</h1>
                            <p className="h3 py-2">$25.00</p>
                            <p className="py-2">
                                <i className="fa fa-star text-warning"></i>
                                <i className="fa fa-star text-warning"></i>
                                <i className="fa fa-star text-warning"></i>
                                <i className="fa fa-star text-warning"></i>
                                <i className="fa fa-star text-secondary"></i>
                                <span className="list-inline-item text-dark">Rating 4.8 | 36 Comments</span>
                            </p>
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <h6>Brand:</h6>
                                </li>
                                <li className="list-inline-item">
                                    <p className="text-muted"><strong>Easy Wear</strong></p>
                                </li>
                            </ul>

                            <h6>Description:</h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse. Donec condimentum elementum convallis. Nunc sed orci a diam ultrices aliquet interdum quis nulla.</p>
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <h6>Avaliable Color :</h6>
                                </li>
                                <li className="list-inline-item">
                                    <p className="text-muted"><strong>White / Black</strong></p>
                                </li>
                            </ul>

                            <h6>Specification:</h6>
                            <ul className="list-unstyled pb-3">
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
                                <div className="row">
                                    <div className="col-auto">
                                        <ul className="list-inline pb-3">
                                            <li className="list-inline-item">Size :
                                                <input type="hidden" name="product-size" id="product-size" value="S"/>
                                            </li>
                                            <li className="list-inline-item"><span className="btn btn-success btn-size">S</span></li>
                                            <li className="list-inline-item"><span className="btn btn-success btn-size">M</span></li>
                                            <li className="list-inline-item"><span className="btn btn-success btn-size">L</span></li>
                                            <li className="list-inline-item"><span className="btn btn-success btn-size">XL</span></li>
                                        </ul>
                                    </div>
                                    <div className="col-auto">
                                        <ul className="list-inline pb-3">
                                            <li className="list-inline-item text-right">
                                                Quantity
                                                <input type="hidden" name="product-quanity" id="product-quanity" value="1"/>
                                            </li>
                                            <li className="list-inline-item"><span className="btn btn-success" id="btn-minus">-</span></li>
                                            <li className="list-inline-item"><span className="badge bg-secondary" id="var-value">1</span></li>
                                            <li className="list-inline-item"><span className="btn btn-success" id="btn-plus">+</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row pb-3">
                                    <div className="col d-grid">
                                        <button type="submit" className="btn btn-success btn-lg" name="submit" value="buy">Buy</button>
                                    </div>
                                    <div className="col d-grid">
                                        <button type="submit" className="btn btn-success btn-lg" name="submit" value="addtocard">Add To Cart</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!-- Close Content --> */}

    {/* <!-- Start Article --> */}
    <section className="py-5">
        <div className="container">
            <div className="row text-left p-2 pb-3">
                <h4>Related Products</h4>
            </div>

            {/* <!--Start Carousel Wrapper--> */}
            <div id="carousel-related-product">

                <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                        <div className="card rounded-0">
                            <img className="card-img rounded-0 img-fluid" src={require('./../assets/images/shop_08.jpg')}/>
                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul className="list-unstyled">
                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <a href="shop-single.html" className="h3 text-decoration-none">Red Clothing</a>
                            <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                <li>M/L/X/XL</li>
                                <li className="pt-2">
                                    <span className="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                                </li>
                            </ul>
                            <ul className="list-unstyled d-flex justify-content-center mb-1">
                                <li>
                                    <i className="text-warning fa fa-star"></i>
                                    <i className="text-warning fa fa-star"></i>
                                    <i className="text-warning fa fa-star"></i>
                                    <i className="text-warning fa fa-star"></i>
                                    <i className="text-muted fa fa-star"></i>
                                </li>
                            </ul>
                            <p className="text-center mb-0">$20.00</p>
                        </div>
                    </div>
                </div>

                <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                        <div className="card rounded-0">
                            <img className="card-img rounded-0 img-fluid" src={require('./../assets/images/shop_09.jpg')}/>
                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul className="list-unstyled">
                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <a href="shop-single.html" className="h3 text-decoration-none">White Shirt</a>
                            <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                <li>M/L/X/XL</li>
                                <li className="pt-2">
                                    <span className="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
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
                            <p className="text-center mb-0">$25.00</p>
                        </div>
                    </div>
                </div>

                <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                        <div className="card rounded-0">
                            <img className="card-img rounded-0 img-fluid" src={require('./../assets/images/shop_10.jpg')}/>
                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul className="list-unstyled">
                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
                            <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                <li>M/L/X/XL</li>
                                <li className="pt-2">
                                    <span className="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                                </li>
                            </ul>
                            <ul className="list-unstyled d-flex justify-content-center mb-1">
                                <li>
                                    <i className="text-warning fa fa-star"></i>
                                    <i className="text-warning fa fa-star"></i>
                                    <i className="text-warning fa fa-star"></i>
                                    <i className="text-warning fa fa-star"></i>
                                    <i className="text-warning fa fa-star"></i>
                                </li>
                            </ul>
                            <p className="text-center mb-0">$45.00</p>
                        </div>
                    </div>
                </div>

                <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                        <div className="card rounded-0">
                            <img className="card-img rounded-0 img-fluid" src={require('./../assets/images/shop_11.jpg')}/>
                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul className="list-unstyled">
                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <a href="shop-single.html" className="h3 text-decoration-none">Black Fashion</a>
                            <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                <li>M/L/X/XL</li>
                                <li className="pt-2">
                                    <span className="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
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
                            <p className="text-center mb-0">$60.00</p>
                        </div>
                    </div>
                </div>

                <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                        <div className="card rounded-0">
                            <img className="card-img rounded-0 img-fluid" src={require('./../assets/images/shop_08.jpg')}/>
                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul className="list-unstyled">
                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
                            <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                <li className="">M/L/X/XL</li>
                                <li className="pt-2">
                                    <span className="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
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
                            <p className="text-center mb-0">$80.00</p>
                        </div>
                    </div>
                </div>

                <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                        <div className="card rounded-0">
                            <img className="card-img rounded-0 img-fluid" src={require('./../assets/images/shop_09.jpg')}/>
                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul className="list-unstyled">
                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
                            <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                <li>M/L/X/XL</li>
                                <li className="pt-2">
                                    <span className="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
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
                            <p className="text-center mb-0">$110.00</p>
                        </div>
                    </div>
                </div>

                <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                        <div className="card rounded-0">
                            <img className="card-img rounded-0 img-fluid" src={require('./../assets/images/shop_10.jpg')}/>
                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul className="list-unstyled">
                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
                            <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                <li>M/L/X/XL</li>
                                <li className="pt-2">
                                    <span className="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
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
                            <p className="text-center mb-0">$125.00</p>
                        </div>
                    </div>
                </div>

                <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                        <div className="card rounded-0">
                            <img className="card-img rounded-0 img-fluid" src={require('./../assets/images/shop_11.jpg')}/>
                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul className="list-unstyled">
                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
                            <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                <li>M/L/X/XL</li>
                                <li className="pt-2">
                                    <span className="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
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
                            <p className="text-center mb-0">$160.00</p>
                        </div>
                    </div>
                </div>

                <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                        <div className="card rounded-0">
                            <img className="card-img rounded-0 img-fluid" src={require('./../assets/images/shop_08.jpg')}/>
                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul className="list-unstyled">
                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
                            <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                <li>M/L/X/XL</li>
                                <li className="pt-2">
                                    <span className="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
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
                            <p className="text-center mb-0">$180.00</p>
                        </div>
                    </div>
                </div>

                <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                        <div className="card rounded-0">
                            <img className="card-img rounded-0 img-fluid" src={require('./../assets/images/shop_09.jpg')}/>
                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul className="list-unstyled">
                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
                            <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                <li>M/L/X/XL</li>
                                <li className="pt-2">
                                    <span className="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
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
                            <p className="text-center mb-0">$220.00</p>
                        </div>
                    </div>
                </div>

                <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                        <div className="card rounded-0">
                            <img className="card-img rounded-0 img-fluid" src={require('./../assets/images/shop_10.jpg')}/>
                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul className="list-unstyled">
                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
                            <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                <li>M/L/X/XL</li>
                                <li className="pt-2">
                                    <span className="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
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
                            <p className="text-center mb-0">$250.00</p>
                        </div>
                    </div>
                </div>

                <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                        <div className="card rounded-0">
                            <img className="card-img rounded-0 img-fluid" src={require('./../assets/images/shop_11.jpg')}/>
                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul className="list-unstyled">
                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
                            <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                <li>M/L/X/XL</li>
                                <li className="pt-2">
                                    <span className="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                    <span className="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
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
                            <p className="text-center mb-0">$300.00</p>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    </section>
    {/* <!-- End Article --> */}
        </>
}

export default userLayout(ChoosingPage);