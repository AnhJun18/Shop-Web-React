import React from "react";


class UserFooter extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }


    render() {
        return <footer id="footer" className="userFooter">
            <footer className="bg-dark" id="tempaltemo_footer">
                <div className="container footer-center">
                    <div className="row">

                        <div className="col-md-4 pt-5">
                            <h3 className="h3 fw-bolder text-light border-bottom pb-3 border-light">Thông tin liên hệ</h3>
                            <ul className="list-unstyled text-light footer-link-list">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.511547008313!2d106.78350311328629!3d10.848642760826692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752713216a3adf%3A0xf8b22853eea72777!2zOTcgxJAuIE1hbiBUaGnhu4duLCBIaeG7h3AgUGjDuiwgUXXhuq1uIDksIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmlldG5hbQ!5e0!3m2!1sfr!2s!4v1669859126126!5m2!1sfr!2s"
                                    width="350" height="180" style={{border:0}} allowFullScreen="" loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"></iframe>
                                <li>Mở cửa: 08H30 - 17H45</li>
                                <li>Phone:<a className="text-decoration-none" href="tel:+84912684797"
                                >0912345678</a></li>
                                <li>Email: <a className="text-decoration-none" href="mailto: N19DCCN006@student.ptithcm.edu.vn"
                                >N19DCCNxxx@student.ptithcm.edu.vn</a></li>
                            </ul>
                        </div>

                        <div className="col-md-2 pt-5">
                            <h3 className="h3 fw-bolder text-light border-bottom pb-3 border-light">Chính sách hỗ trợ:</h3>
                            <ul className="list-unstyled text-light footer-link-list">
                                <li><a className="text-decoration-none" href="#">Tìm kiếm</a></li>
                                <li><a className="text-decoration-none" href="#">Giới thiệu</a></li>
                                <li><a className="text-decoration-none" href="#">Chính sách đổi trả</a></li>
                                <li><a className="text-decoration-none" href="#">Chính sách dịch vụ</a></li>
                                <li><a className="text-decoration-none" href="#">Chính sách bảo mật</a></li>
                                <li><a className="text-decoration-none" href="#">Điều khoản dịch vụ</a></li>
                            </ul>
                        </div>

                        <div className="col-md-2 pt-5">
                            <h3 className="h3 fw-bolder text-light border-bottom pb-3 border-light">Thông tin liên kết:</h3>
                            <p className="text-light">Hãy kết nối với chúng tôi:</p>
                            {/* <!-- Facebook --> */}
                            <a className="btn btn-primary btn-floating m-1" href="#!" role="button"><i
                                className="fa fa-facebook"></i></a>
                            {/* <!-- Twitter --> */}
                            <a className="btn btn-primary btn-floating m-1" href="#!" role="button"><i
                                className="fa fa-twitter"></i></a>
                            {/* <!-- Instagram --> */}
                            <a className="btn btn-primary btn-floating m-1" href="#!" role="button"><i
                                className="fa fa-instagram"></i></a>
                        </div>

                        <div className="col-md-4 pt-5">
                            <h3 className="h3 fw-bolder text-light border-bottom pb-3 border-light">Fanpage</h3>
                            <ul className="list-unstyled text-light footer-link-list">
                                <iframe
                                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fanhjunit&tabs=timeline&width=340&height=188&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=636594834135031"
                                    width="380" height="108" style={{border:"none",overflow:"hidden", visibility: "visible",width: "720px", height: "140px"}}scrolling="no"
                                    frameBorder="0" allowFullScreen="true"
                                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                                <li>Quý khách vui lòng đến đúng khung giờ mở cửa trên để mua hàng.</li>
                                <li> Chân thành cảm ơn!</li>
                            </ul>



                        </div>
                    </div>
                </div>

            </footer>
        </footer>


    }
}

export default UserFooter;