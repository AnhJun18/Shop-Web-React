import {useEffect, useState} from "react";
import adminLayout from "../admin/adminLayout";
import axiosApiInstance from "../context/interceptor";
import "../assets/css/customer.css";

import Pagination from "../components/Pagination";
import {useLocation} from "react-router-dom";

const CustomerPage = () => {
    const param = useLocation();

    const [list, setList] = useState([]);
    const [load, setLoad] = useState(false);
    const [totalPage, setTotalPage] = useState(1)

    const [show, setShow] = useState(false);
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
                        <div className="d-flex text-muted overflow-auto">
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
                                        <td className="tdImage">{item.gender}</td>
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