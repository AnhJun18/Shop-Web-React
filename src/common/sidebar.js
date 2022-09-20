import React from "react";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
    constructor(props){
        super(props)

        this.state = {}
    }

    render(){
        return <div className="border-end sidenav" id="sidebar-wrapper">
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
                    <span>Admin</span>
                </a>
                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                    <li><Link className="dropdown-item" to="/profile"><i className="fa fa-user-circle" aria-hidden="true"></i> Profile</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" to="#"><i className="fa fa-sign-out" aria-hidden="true"></i> Sign out</Link></li>
                </ul>
            </div>
        </div>
    }
}

export default Sidebar;