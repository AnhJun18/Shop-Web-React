import { useEffect, useState } from "react";
import adminLayout from "../admin/adminLayout";
import { Button, Form, Modal } from "react-bootstrap"
import "../assets/css/statistical.css";
import { useLocation } from "react-router-dom";
import axiosApiInstance from "../context/interceptor";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

const StatisticalPage = () => {
    const param = useLocation();
    const [load, setLoad] = useState(false);
    const [status, setStatus] = useState(1);
    const [myFile, setMyFile] = useState(null);
    const listStatus = [
        'Chờ Xác Nhận',
        'Đang Chuẩn Bị Hàng',
        'Đang Vận Chuyển', ,
        'Đã Thanh Toán',
        'Đã Hủy']
    const clickTurnover = (e) => {
        setStatus(1);
    }
    const clickTheOrder = (e) => {
        setStatus(2);

    }

    function checkDate(from, to) {
        const sfrom = new Date(from);
        const sto = new Date(to);
        return sfrom <= sto;
    }

    const handlePreviewReport = (e) => {
        e.preventDefault();
        let url_report = null;
        if (status === 1) {
            url_report = axiosApiInstance.defaults.baseURL + `/api/report/monthly_revenue?month=${e.target.elements.month.value}`;
        } else if (status === 2) {
            if (checkDate(e.target.elements.prfrom.value, e.target.elements.prto.value))
                url_report = axiosApiInstance.defaults.baseURL + `/api/report/product_revenue?from=${e.target.elements.prfrom.value}&to=${e.target.elements.prto.value}`;
            else
                toast.error("Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc")

        } else if (status === 3)
            if (checkDate(e.target.elements.ddfrom.value, e.target.elements.ddto.value))
                url_report = axiosApiInstance.defaults.baseURL + `/api/report/list-order?from=${e.target.elements.ddfrom.value}&to=${e.target.elements.ddto.value}&status=${e.target.elements.statusChoose.value}`;
            else
                toast.error("Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc")

        if (url_report !== null) {
            const token = JSON.parse(localStorage.getItem("tokens")).data.accessToken;
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url_report, true);
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            xhr.responseType = 'arraybuffer';

            xhr.onload = function () {
                if (xhr.status === 200) {
                    const blob = new Blob([xhr.response], { type: 'application/pdf' });
                    const url = URL.createObjectURL(blob);
                    const newWindow = window.open(url, '_blank');
                    newWindow.focus();
                } else {
                    console.error(xhr.statusText);
                }
            };

            xhr.onerror = function () {
                console.error('Request failed.');
            };

            xhr.send();
        }
    }

    const clickImportOrder = (e) => {
        setStatus(3);

    }
    useEffect(() => {
        setLoad(true);

    }, [param]);
    return (
        <>{
            load ?
                <div className="container padding-bottom-3x">
                    <div className="marginTop">
                        <button className={status == 1 ? "ms-2 buttonHead active" : "ms-2 buttonHead"}
                            onClick={clickTurnover}>Doanh thu
                        </button>
                        <button className={status == 2 ? "ms-2 buttonHead active" : "ms-2 buttonHead"}
                            onClick={clickTheOrder}>Sản Phẩm
                        </button>
                        <button className={status == 3 ? "ms-2 buttonHead active" : "ms-2 buttonHead"}
                            onClick={clickImportOrder}>Đơn hàng
                        </button>
                    </div>
                    <Form onSubmit={handlePreviewReport} className="screen py-2 bg-white">
                        {status == 1 ?
                            <>
                                <h3 className="screenHeader">Thống Kê Doanh Thu Trong Tháng</h3>
                                <div className="screen py-2 bg-white">
                                    <div className="canopy mt-5">
                                        <p className="basic">Chọn tháng: </p>
                                        <input id="month" type="month" required></input>
                                    </div>
                                    <div className="text-center mt-3">
                                        <button className="buttonSubmit btn btn-success" type="submit">Xem Báo Cáo</button>
                                    </div>
                                </div>
                            </>

                            :
                            status == 2 ?
                                <>
                                    <h3 className="screenHeader">Thống Kê Lượng Bán Sản Phẩm</h3>
                                    <div className="screen py-2 bg-white">
                                        <div className="canopy mt-5">
                                            <p className="basic">Từ ngày: </p>
                                            <input type="date" id="prfrom"></input>

                                        </div>
                                        <div className="canopy mt-3">
                                            <p className="basic">Đến ngày: </p>
                                            <input type="date" id="prto"></input>
                                        </div>
                                        <div className="text-center mt-3">
                                            <button className="buttonSubmit btn btn-success">Xem Báo Cáo</button>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <h3 className="screenHeader">Thống Kê Đơn Nhập Theo Tháng</h3>
                                    <div className="screen py-2 bg-white">
                                        <div className="canopy mt-5">
                                            <p className="basic">Từ ngày: </p>
                                            <input type="date" id="ddfrom"></input>
                                        </div>
                                        <div className="canopy mt-3">
                                            <p className="basic">Đến ngày: </p>
                                            <input type="date" id="ddto"></input>
                                        </div>
                                        <div className="canopy mt-3 px-5">
                                            <p className="basic">Trạng thái đơn hàng: </p>
                                            <select className="" id="statusChoose">
                                                <option value="">Tất cả</option>
                                                {listStatus.map((cate) => (
                                                    <option value={cate} key={cate}>{cate}</option>
                                                ))}

                                            </select>
                                        </div>
                                        <div className="text-center mt-3">
                                            <button className="buttonSubmit btn btn-success">Xem Báo Cáo</button>
                                        </div>
                                    </div>
                                </>

                        }
                    </Form>
                </div>

                :
                <div className={"center loading"}>
                    <ReactLoading type={'cylon'} color='#fffff' height={'33px'} width={'9%'} />
                </div>
        }
        </>
    );

};
export default adminLayout(StatisticalPage);