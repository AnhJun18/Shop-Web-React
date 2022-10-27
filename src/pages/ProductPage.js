import {useContext, useState, useEffect} from "react";
import adminLayout from "../admin/adminLayout";
import ModalComponent from "../components/ModalComponent";
import axiosApiInstance from "../context/interceptor";
import {render} from "react-dom";
import {alignPropType} from "react-bootstrap/types";
import {  toast } from 'react-toastify';

const ProductPage = () => {
    const [product, setProduct] = useState([])
    const [list, setList] = useState([])

    async function getProduct() {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + "/api/product/all")

        console.log(JSON.stringify(result))
        console.log(product)
        const listItem = result.map((d) => <li key={d.name}>{d.name}</li>);
        setList(listItem)
        console.log(listItem)
        return result;
    }

    useEffect(() => {
        const re = getProduct()


    }, []);
    return <>
        <div className="table-container" style={{width: '100%'}}>
            {list}
        </div>
    </>

}

export default adminLayout(ProductPage);