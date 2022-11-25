import React from "react";
import { Link } from "react-router-dom";

class UserHeader extends React.Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }

    render(){
        return <nav class="navbar header nav-light navbar-expand-lg navbar-light shadow fixed-top">
        <div class="container container-navbar d-flex justify-content-between align-items-center">

            <Link class="navbar-brand text-success logo-size h1 align-self-center mt-3" to="/home">
                PTIT
            </Link>

            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="align-self-center mgt-16  mgd-16 collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between" id="templatemo_main_nav">
                <div class="flex-fill">
                    <ul class="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="/home">Home</a>
                        </li>
                        <li class="nav-item nav-parent">
                            <a class="nav-link" href="/shop">
                                Shop
                            </a>
                           
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="about.html">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="contact.html">Contact</a>
                        </li>
                    </ul>
                </div>
                <div class="navbar align-self-center d-flex">
                    <div class="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3 f100">
                        <div class="input-group">
                            <input type="text" class="form-control" id="inputMobileSearch" placeholder="Search ..."/>
                            <div class="input-group-text">
                                <i class="fa fa-fw fa-search"></i>
                            </div>
                        </div>
                    </div>
                    <a class="nav-icon d-none d-lg-inline" href="#" data-bs-toggle="modal" data-bs-target="#templatemo_search">
                        <i class="fa fa-fw fa-search text-dark mr-2"></i>
                    </a>
                    <a class="nav-icon position-relative text-decoration-none padding-cart" href="/cart">
                        <i class="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
                        <span class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-cart-light text-dark">7</span>
                    </a>
                    <span class="nav-icon position-relative text-decoration-none padding-notify" href="#">
                        <span id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-fw fa-user text-dark mr-3"></i><i class="fa fa-angle-down text-dark"></i></span>
                        <ul class="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
                            <li><a class="dropdown-item" href="/inforUser">Thông tin tài khoản</a></li>
                            <li><a class="dropdown-item" href="/change-pass">Đổi mật khẩu</a></li>
                            <li><a class="dropdown-item" href="#">Đăng xuất</a></li>
                        </ul>
                    </span>
                </div>
            </div>

        </div>
    </nav>
    }
}

export default UserHeader;