import {useEffect, useState} from "react";
import adminLayout from "../admin/adminLayout";
import "../assets/css/statistical.css";
//import {alignPropType} from "react-bootstrap/types";
import {useLocation} from "react-router-dom";

const StatisticalPage = () => {
    const param = useLocation();
    const [load, setLoad] = useState(false);
    const [status, setStatus] = useState(1);
    const clickTurnover = (e) => {
        setStatus(1);
    }
    const clickTheOrder = (e) => {
        setStatus(2);

    }

    const handlePreviewReport=()=>{
        window.open("http://localhost:8081/api/report/demo-report", '_blank').focus();
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
                    <button className={status==1? "ms-2 buttonHead active": "ms-2 buttonHead"} onClick={clickTurnover}>Doanh thu</button>
                    <button className={status==2? "ms-2 buttonHead active": "ms-2 buttonHead"} onClick={clickTheOrder}>Đơn đặt</button>
                    <button className={status==3? "ms-2 buttonHead active": "ms-2 buttonHead"} onClick={clickImportOrder}>Đơn nhập</button>
                </div>

                {status ==1 ?
                <div className="screen py-2 bg-white">
                    <h3 className="screenHeader mb-5">Thống Kê Doanh Thu Theo Tháng</h3>
                    <div className="canopy">
                        <p className="basic">Chọn báo cáo tháng: </p>
                        <input type="month"></input>
                        <button className="buttonSubmit" onClick={handlePreviewReport}>Xem Báo Cáo</button>
                    </div>
                    
                </div>:
                status == 2 ?
                <div className="screen py-2 bg-white">
                    <h3 className="screenHeader mb-5">Thống Kê Đơn Đặt Theo Tháng</h3>
                    <div className="canopy">
                        <p className="basic">Chọn báo cáo tháng: </p>
                        <input type="month"></input>
                        <button className="buttonSubmit">Xem Báo Cáo</button>
                    </div>
                </div>:
                <div className="screen py-2 bg-white">
                    <h3 className="screenHeader mb-5">Thống Kê Đơn Nhập Theo Tháng</h3>
                    <div className="canopy">
                        <p className="basic">Chọn báo cáo tháng: </p>
                        <input type="month"></input>
                        <button className="buttonSubmit">Xem Báo Cáo</button>
                    </div>
                </div>
                }
            </div>
                
                :
                <div>Loading</div>
        }
        </>
    );

};
export default adminLayout(StatisticalPage);