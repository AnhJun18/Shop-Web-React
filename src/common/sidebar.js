import {useContext, useState, useEffect, useMemo} from "react";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import axios from '../api/axios';
import {Link} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import AuthContext from '../context/AuthProvider';
import axiosApiInstance from '../context/interceptor';

const Sidebar = ({isActive}) => {
    const {user, logout} = useContext(AuthContext);
    const [name, setName] = useState([]);
    console.log(isActive)

    /*const navigate = useNavigate();
    useEffect(() => {
      if (!user) navigate("/login");
    })*/

    useEffect(() => {
        axiosApiInstance
            .get(axios.defaults.baseURL + "/api/user/profile")
            .then(response => setName(response.data.data.userInfo.lastName));
    }, []);
    const sidebarItems = useMemo(() => {
        return [
            {
                icon: <i className="fa fa-dashboard me-3"></i>,
                link: "/",
                title: "Dashboard",
            },
            {
                icon: <i className="fa fa-product-hunt me-3"></i>,
                link: "/product",
                title: "Product",
            },
            {
                icon: <i className="fa fa-user-circle me-3"></i>,
                link: "/customer",
                title: "Customer",
            },
            {
                icon: <i className="fa fa-bar-chart me-3"></i>,
                link: "/",
                title: "Blank Page",
            }, {
                icon: <i className="fa fa-archive me-3" ></i>,
                link: "/import",
                title: "Import",
            },
            {
                icon: <i className="fa fa-cart-plus me-3"></i>,
                link: "/order",
                title: "Order",
            }
        ]
    }, [])

    return (
        <>
            <div className={isActive ? 'sidenav' : "sidenav2"} id="sidebar-wrapper">
                <div className="sidebar-heading border-bottom ">
                    <div className="ms-4 mt-3">
                        <img alt="" width="120" height="120" src={require('./../assets/images/logo.png')}/>
                    </div>
                    {/* <div href="#" className="ms-3 align-items-center text-decoration-none" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={require('./../assets/images/logo.png')} alt="" width="110" height="110" className="rounded-circle me-2" />
                    <h5></h5>
                </div> */}
                </div>
                <PerfectScrollbar className="sidebar-items mt-3">
                    <ul className="list-unstyled ps-0">

                        {sidebarItems.map(item => <li className="mb-3 ms-3">
                            <Link key={item.title} tag="a" className="" to={item.link}>
                                {item.icon}{isActive && item.title}
                            </Link>
                        </li>)}

                    </ul>
                </PerfectScrollbar>
                <div
                    className={isActive ? "dropdown fixed-bottom-dropdown with200" : "dropdown fixed-bottom-dropdown with50"}>
                    <a href="#" className="d-flex align-items-center text-decoration-none dropdown-toggle"
                       id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://via.placeholder.com/50" alt=""
                             className={isActive ? "rounded-circle me-2 logoprofile" : "rounded-circle me-2 logoprofile2"}/>
                        <span className={isActive ? "" : "fixed-profile"}>{name}</span>
                    </a>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                        <li><Link className="dropdown-item" to="/profile"><i className="fa fa-user-circle"
                                                                             aria-hidden="true"></i> Profile</Link></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><a className="dropdown-item" onClick={() => {
                            logout();
                        }}><i className="fa fa-sign-out" aria-hidden="true"></i> Sign out</a></li>
                    </ul>
                </div>
            </div>
        </>)
}

export default Sidebar;