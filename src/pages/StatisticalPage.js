import {useEffect, useState} from "react";
import adminLayout from "../admin/adminLayout";
import {Button, Form, Modal} from "react-bootstrap"
import "../assets/css/statistical.css";
import {useLocation} from "react-router-dom";
import axiosApiInstance from "../context/interceptor";
import axios from "../api/axios";
import {Document, Page} from "react-pdf";
import {toast} from "react-toastify";

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
        if (status === 1) {
            window.open(axiosApiInstance.defaults.baseURL + `/api/report/monthly_revenue?month=${e.target.elements.month.value}`, '_blank').focus();
        } else if (status === 2) {
            if(checkDate(e.target.elements.prfrom.value, e.target.elements.prto.value))
                window.open(axiosApiInstance.defaults.baseURL + `/api/report/product_revenue?from=${e.target.elements.prfrom.value}&to=${e.target.elements.prto.value}`, '_blank').focus();
            else
                toast.error("Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc")

        } else if (status === 3)
            if(checkDate(e.target.elements.ddfrom.value, e.target.elements.ddto.value))
                    window.open(axiosApiInstance.defaults.baseURL + `/api/report/list-order?from=${e.target.elements.ddfrom.value}&to=${e.target.elements.ddto.value}&status=${e.target.elements.statusChoose.value}`, '_blank').focus();
            else
                toast.error("Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc")
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
                                onClick={clickTheOrder}>Đơn đặt
                        </button>
                        <button className={status == 3 ? "ms-2 buttonHead active" : "ms-2 buttonHead"}
                                onClick={clickImportOrder}>Đơn nhập
                        </button>
                    </div>
                    <Form onSubmit={handlePreviewReport} className="screen py-2 bg-white">
                        {status == 1 ?
                            <div className="screen py-2 bg-white">
                                <h3 className="screenHeader mb-5">Thống Kê Doanh Thu Trong Tháng</h3>
                                <div className="canopy">
                                    <p className="basic">Chọn báo cáo tháng: </p>
                                    <input id="month" type="month" required></input>
                                </div>
                                <button className="buttonSubmit" type="submit">Xem Báo Cáo</button>
                            </div>
                            :
                            status == 2 ?
                                <div className="screen py-2 bg-white">
                                    <h3 className="screenHeader mb-5">Thống Kê Lượng Bán Sản Phẩm</h3>
                                    <div className="canopy">
                                        <p className="basic">Từ ngày: </p>
                                        <input type="date" id="prfrom"></input>

                                    </div>
                                    <div className="canopy mt-4">
                                        <p className="basic">Đến ngày </p>
                                        <input type="date" id="prto"></input>
                                    </div>
                                    <button className="buttonSubmit">Xem Báo Cáo</button>
                                </div> :
                                <div className="screen py-2 bg-white">
                                    <h3 className="screenHeader mb-5">Thống Kê Đơn Nhập Theo Tháng</h3>
                                    <div className="canopy">
                                        <p className="basic">Từ ngày: </p>
                                        <input type="date" id="ddfrom"></input>
                                    </div>
                                    <div className="canopy mt-3">
                                        <p className="basic">Đến ngày: </p>
                                        <input type="date" id="ddto"></input>
                                    </div>
                                    <div className="canopy mt-3">
                                        <p className="basic">Trạng thái đơn hàng: </p>
                                        <select className="form-control" id="statusChoose">
                                            <option value="">Tất cả</option>
                                            {listStatus.map((cate) => (
                                                <option value={cate} key={cate}>{cate}</option>
                                            ))}

                                        </select>
                                    </div>
                                    <button className="buttonSubmit">Xem Báo Cáo</button>
                                </div>
                        }
                    </Form>
                </div>

                :
                <div>Loading</div>
        }
        </>
    );

};
export default adminLayout(StatisticalPage);