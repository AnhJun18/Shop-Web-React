import React, {useEffect, useState} from "react";
import userLayout from "../user/userLayout"
import "./../assets/css/user-view.css";
import ReactLoading from 'react-loading';
import axiosApiInstance from "../context/interceptor";
import {Modal, Button, Form} from "react-bootstrap"
import InputSpinner from "react-bootstrap-input-spinner";
import {toast} from "react-toastify";
import axios from "../api/axios";
import {useLocation} from "react-router-dom";


const ChoosingPage = () => {
    const productDetail = [
        {
            "id": 17,
            "infoProduct": {
                "id": 7,
                "name": "Áo Khoác Lá Cổ 12VAHDT",
                "linkImg": "https://firebasestorage.googleapis.com/v0/b/fir-myshop-lpa.appspot.com/o/e9e26a04-2ab2-4aed-b5b4-a34590b97470jpg?alt=media",
                "category": {
                    "id": 1,
                    "name": "Áo khoác"
                },
                "describe": "Chất liệu: Poly.  Áo khoác Form Rộng",
                "price": 169000,
                "sold": 4
            },
            "size": "XL",
            "color": "Black-White",
            "current_number": 3
        },
        {
            "id": 18,
            "infoProduct": {
                "id": 7,
                "name": "Áo Khoác Lá Cổ 12VAHDT",
                "linkImg": "https://firebasestorage.googleapis.com/v0/b/fir-myshop-lpa.appspot.com/o/e9e26a04-2ab2-4aed-b5b4-a34590b97470jpg?alt=media",
                "category": {
                    "id": 1,
                    "name": "Áo khoác"
                },
                "describe": "Chất liệu: Poly.  Áo khoác Form Rộng",
                "price": 169000,
                "sold": 4
            },
            "size": "L",
            "color": "Black-White",
            "current_number": 6
        },
        {
            "id": 19,
            "infoProduct": {
                "id": 7,
                "name": "Áo Khoác Lá Cổ 12VAHDT",
                "linkImg": "https://firebasestorage.googleapis.com/v0/b/fir-myshop-lpa.appspot.com/o/e9e26a04-2ab2-4aed-b5b4-a34590b97470jpg?alt=media",
                "category": {
                    "id": 1,
                    "name": "Áo khoác"
                },
                "describe": "Chất liệu: Poly.  Áo khoác Form Rộng",
                "price": 169000,
                "sold": 4
            },
            "size": "M",
            "color": "Black-White",
            "current_number": 5
        },
        {
            "id": 20,
            "infoProduct": {
                "id": 7,
                "name": "Áo Khoác Lá Cổ 12VAHDT",
                "linkImg": "https://firebasestorage.googleapis.com/v0/b/fir-myshop-lpa.appspot.com/o/e9e26a04-2ab2-4aed-b5b4-a34590b97470jpg?alt=media",
                "category": {
                    "id": 1,
                    "name": "Áo khoác"
                },
                "describe": "Chất liệu: Poly.  Áo khoác Form Rộng",
                "price": 169000,
                "sold": 4
            },
            "size": "S",
            "color": "Black-White",
            "current_number": 1
        },
        {
            "id": 58,
            "infoProduct": {
                "id": 7,
                "name": "Áo Khoác Lá Cổ 12VAHDT",
                "linkImg": "https://firebasestorage.googleapis.com/v0/b/fir-myshop-lpa.appspot.com/o/e9e26a04-2ab2-4aed-b5b4-a34590b97470jpg?alt=media",
                "category": {
                    "id": 1,
                    "name": "Áo khoác"
                },
                "describe": "Chất liệu: Poly.  Áo khoác Form Rộng",
                "price": 169000,
                "sold": 4
            },
            "size": "S",
            "color": "Ð?",
            "current_number": 13
        },
        {
            "id": 62,
            "infoProduct": {
                "id": 7,
                "name": "Áo Khoác Lá Cổ 12VAHDT",
                "linkImg": "https://firebasestorage.googleapis.com/v0/b/fir-myshop-lpa.appspot.com/o/e9e26a04-2ab2-4aed-b5b4-a34590b97470jpg?alt=media",
                "category": {
                    "id": 1,
                    "name": "Áo khoác"
                },
                "describe": "Chất liệu: Poly.  Áo khoác Form Rộng",
                "price": 169000,
                "sold": 4
            },
            "size": "L",
            "color": "Ðen",
            "current_number": 12
        }
    ]
    
    const [imgSelect, setImgSelect] = useState();
    const [colorAvail, setColorAvail] = useState(new Set());
    const [sizeAvail, setSizeAvail] = useState();
    const [item, setItem] = useState({})

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

useEffect(() => {
}, []);
    return <>
            {/* <!-- Open Content --> */}
    <section class="bg-light">
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
                                        <strong>Color </strong>
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
                                        <strong>Size</strong>
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
                                <div class="row pb-3">
                                    <div class="col d-grid">
                                        <button type="submit" class="btn btn-success btn-lg"
                                                name="submit" value="buy">Buy
                                        </button>
                                    </div>
                                    <div class="col d-grid">
                                        <button type="submit" class="btn btn-success btn-lg"
                                                name="submit" >Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </Form>}

                        </div>
                    </div>
                </div>}
            </div>
        </div>
    </section>
    {/* <!-- Close Content --> */}
        </>
}

export default userLayout(ChoosingPage);