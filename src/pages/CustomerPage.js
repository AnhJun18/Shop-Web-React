import {useContext, useState, useEffect, useRef} from "react";
import adminLayout from "../admin/adminLayout";
import axiosApiInstance from "../context/interceptor";
import "../assets/css/customer.css";
import axios from "../api/axios";
import {render} from "react-dom";
//import {alignPropType} from "react-bootstrap/types";
import {toast} from 'react-toastify';
import {Form, Button, Modal} from "react-bootstrap"

import Pagination from "../components/Pagination";
import {useLocation} from "react-router-dom";

const CustomerPage = () => {
    const param = useLocation();

    const [list, setList] = useState([]);
    const [load, setLoad] = useState(false);
    const [totalPage, setTotalPage] = useState(1)

    const [customer_name, setName] = useState();
    const [customer_gender, setGender] = useState();
    const [customer_phone, setPhone] = useState();
    const [customer_email, setEmail] = useState();
    const [customer_address, setAddress] = useState();
    const [customer_username, setUsername] = useState();

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
    const handleSearch = async (e) => {

    }
    async function getProduct() {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/user/all`)
        console.log(result.data);
        setLoad(true);
        setList(result?.data)
        setTotalPage(result?.data.totalPages)
    }

    useEffect(() => {
        getProduct()
        
        console.log(list)

    }, [param]);


    return (
        <>{
            load ?  
            <div>
                <div className="table-container" style={{width: '100%'}}>
                        <div className="customerH1" >
                                <h3 className="">Danh sách khách hàng</h3>
                        </div>
                        <div className="flex ml30">
                            <h5 className="mt22">Tìm kiếm khách hàng: </h5>
                            <form className="example style" action="/action_page.php" >
                                    <input type="text" placeholder="Search" ></input>
                                    <button type="submit" onclick={handleSearch}><i class="fa fa-search"></i></button>
                            </form>
                        </div>
                        <div className="d-flex text-muted">
                            <table className="table ">
                                <thead>
                                <tr>
                                    <th scope="col" className="col-2">Tên Khách Hàng</th>
                                    <th scope="col" className="col-1">Giới tính </th>
                                    <th scope="col" className="col-2">SDT</th>
                                    <th scope="col" className="col-2">Địa chỉ</th>
                                    <th scope="col" className="col-2">Email</th>
                                    <th scope="col" className="col-2">Tài khoản</th>
                                </tr>
                                </thead>
                                <tbody>
                                {list.map((item) => (
                                    <tr key={item.id}>
                                        <td className="tdName">{item.firstName + " " + item.lastName}</td>
                                        <td className="tdImage">{item.gende}</td>
                                        <td className="tdCategory">{item.phone}</td>
                                        <td className="tdCategory">{item.address}</td>
                                        <td className="tdCategory">{item.account.email}</td>
                                        <td className="tdCategory">{item.account.username}</td>
                                        
                                    </tr>))}

                                </tbody>
                            </table>
                        </div>
                        <Pagination refix='customer' size={totalPage}/>
                    </div>
            </div>
            :
            <div>Loading</div>
        }
        </>
    );

};
export default adminLayout(CustomerPage);