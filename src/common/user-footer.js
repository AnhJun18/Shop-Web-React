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
                            <h3 className="h3 fw-bolder text-light border-bottom pb-3 border-light">Thông tin liên hệ:</h3>
                            <ul className="list-unstyled text-light footer-link-list">
                                <li>97 Man Thiện, phường Hiệp Phú, TP. Thủ Đức, TP. Hồ Chí Minh.</li>
                                <li>AM:08H30 - 11H45, PM: 13H30 - 17H45</li>
                                <li>KH vui lòng đến đúng khung giờ mở cửa trên để mua hàng.</li>
                                <li> Chân thành cảm ơn!</li>
                                <li>Phone: <a className="text-decoration-none" href="#">0123456789</a></li>
                                <li>Email: <a className="text-decoration-none"
                                              href="#">N19DCCNxxx@student.ptithcm.edu.vn</a></li>
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

                        <div className="col-md-2 pt-5">
                            <iframe
                                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fanhjunit&tabs=timeline&width=340&height=188&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=636594834135031"
                                width="340" height="188" style={{border:"none",overflow:"hidden", visibility: "visible",width: "720px", height: "240px"}}scrolling="no"
                                frameBorder="0" allowFullScreen="true"
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>


                        </div>
                    </div>
                </div>

            </footer>
        </footer>


    }
}

export default UserFooter;