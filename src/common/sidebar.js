import {useContext, useState, useEffect} from "react";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthProvider';
import axiosApiInstance from '../context/interceptor';

const Sidebar = () => {
    const { user, logout } = useContext(AuthContext);
    const [name, setName] = useState([]);

    const navigate = useNavigate();
    
    /*useEffect(() => {
      if (!user) navigate("/login");
    })*/
    
    useEffect(() => {
      axiosApiInstance
        .get(axios.defaults.baseURL + "/api/user/profile")
        .then(response => setName(response.data.data.user.lastName));
    }, []);

    return (
    <>
        <div className="border-end sidenav" id="sidebar-wrapper">
            <div className="sidebar-heading border-bottom ">
                <Link to="/">
                    <img alt="Alt content" src={require('./../assets/images/logo.png')} />
                </Link>
            </div>
            <PerfectScrollbar className="sidebar-items">
                <ul className="list-unstyled ps-0">
                    <li className="mb-1">
                        <Link tag="a" className="" to="/">
                            <i className="fa fa-dashboard"></i> Dashboard
                        </Link>
                    </li>
                    <li className="mb-1">
                        <Link tag="a" className="" to="/product">
                            <i className="fa fa-bar-chart"></i> Product
                        </Link>
                    </li>
                    <li className="mb-1">
                        <Link tag="a" className="" to="/blank-page">
                            <i className="fa fa-file-o"></i> Blank Page
                        </Link>
                    </li>
                    <li className="mb-1">
                        <Link tag="a" className="" to="/table">
                        <i className="fa fa-text-width" aria-hidden="true"></i> Table
                        </Link>
                    </li>

                    <li className="border-top my-3"></li>
                   
                </ul>
            </PerfectScrollbar>
            <div className="dropdown fixed-bottom-dropdown">
                <a href="#" className="d-flex align-items-center text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://via.placeholder.com/50" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <span>{name}</span>
                </a>
                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                    <li><Link className="dropdown-item" to="/profile"><i className="fa fa-user-circle" aria-hidden="true"></i> Profile</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" onClick={() => {logout();}}><i className="fa fa-sign-out" aria-hidden="true"></i> Sign out</a></li>
                </ul>
            </div>
        </div>
    </>)
}

export default Sidebar;