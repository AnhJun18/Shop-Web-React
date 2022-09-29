import React from "react";
import adminLayout from "../admin/adminLayout";
import ModalComponent from "../components/ModalComponent";
class ProductPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {};
    }

    modalFooterContent(){ 
        return <>
            <div style={{width:"100%"}}>
                <button className="btn btn-default">Save</button> 
            </div>
        </>;
    }

    modalContent(){
        return <>
            What is Lorem Ipsum?
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type 
            specimen book. It has survived not only five centuries, but also the leap into 
            electronic typesetting, remaining essentially unchanged. It was popularised in 
            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
            and more recently with desktop publishing software like Aldus PageMaker including 
            versions of Lorem Ipsum.
        </>;
    }

    render(){
        return (
            <>
            <div className="table-container" style={{width: '100%'}}>
                <div className="row">
                    <div className="col">
                        <h5 className="pb-2 mb-0">Danh sách sản phẩm</h5>
                    </div>
                    <div className="col text-right">
                        <button className="btn btn-default low-height-btn">
                            <i className="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div className="d-flex text-muted">
                <table class="table table-image">
		  <thead>
		    <tr>
		      <th scope="col" class="col-1">Mã sản phẩm</th>
		      <th scope="col" class="col-3">Tên sản phẩm</th>
		      <th scope="col" class="col-1">Hình ảnh minh họa</th>
		      <th scope="col" class="col-2">Danh mục</th>
		      <th scope="col" class="col-2">Số lượng đã bán</th>
              <th scope="col" class="col-2">Tác vụ</th>
		    </tr>
		  </thead>
		  <tbody>
		    <tr>
		      <th scope="row">SP000001</th>
		      <td>Giày Tây Lười Nguyên Bản A4 2022</td>
              <td class="w-25">
			      <img src='https://cdn2.yame.vn/pimg/giay-tay-luoi-nguyen-ban-a6-2022-0021024/3666669d-7ce5-d601-74f7-0019523be58d.jpg' width="200" height="auto" class="img-fluid img-thumbnail" alt="Sheep"/>
		      </td>
		      <td>Giày</td>
		      <td>25</td>
              <td>
                <button type="button" class="btn btn-outline-primary btn-light btn-sm mx-sm-1 px-lg-2" title="Chi tiết"><i class="fa fa-info" aria-hidden="true"></i></button>
                <button type="button" class="btn btn-outline-warning btn-light btn-sm mx-sm-1 px-lg-2" title="Chỉnh sửa"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                <button type="button" class="btn btn-outline-danger btn-light btn-sm mx-sm-1 px-lg-2" title="Ngừng kinh doanh sản phẩm"><i class="fa fa-lock" aria-hidden="true"></i></button>
              </td>
		    </tr>
		    <tr>
		      <th scope="row">SP000002</th>
		      <td>Áo Sơ Mi Tay Ngắn Đơn Giản Y Nguyên Bản Ver29</td>
              <td class="w-25">
			      <img src='https://cdn2.yame.vn/pimg/so-mi-tay-ngan-on-gian-y-nguyen-ban-ver29-0020945/d5118976-2292-6000-ed6c-001957b05a1c.jpg' width="200" height="auto" class="img-fluid img-thumbnail" alt="Sheep"/>
		      </td>
		      <td>Áo sơ mi nam</td>
		      <td>60</td>
              <td>
                <button type="button" class="btn btn-outline-primary btn-light btn-sm mx-sm-1 px-lg-2" title="Chi tiết"><i class="fa fa-info" aria-hidden="true"></i></button>
                <button type="button" class="btn btn-outline-warning btn-light btn-sm mx-sm-1 px-lg-2" title="Chỉnh sửa"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                <button type="button" class="btn btn-outline-danger btn-light btn-sm mx-sm-1 px-lg-2" title="Ngừng kinh doanh"><i class="fa fa-lock" aria-hidden="true"></i></button>
              </td>
		    </tr>
		  </tbody>
		</table>   
                </div>
                <nav className="table-bottom-center-pagination" aria-label="Page navigation example ">
                    <ul className="pagination">
                        <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </a>
                        </li>
                    </ul>
                </nav>
            </div>
            </>
          );
    }
}

export default adminLayout(ProductPage);