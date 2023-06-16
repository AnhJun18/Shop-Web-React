import "bootstrap/dist/css/bootstrap.min.css";
import { Button,Modal, Form } from 'react-bootstrap';
import {useState} from 'react';
import ReactLoading from "react-loading";
import adminLayout from "../admin/adminLayout";
 

const PriventoryPage = ()=>{
    const [modalForm, setModalForm] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const  handleShow = () => {
        setModalForm(true);
        setShow(true);
    };

    // Test Table 
    const Test = [
        { store:'Kho phụ kiện', id:'LK004', name:'Màn hình LG', ip_g:'3', ep_g:'0', invp_g:'3',unit:'chiếc',day_in:'15/5/2023',day_out:'15/6/2023'},
        { store:'Kho cửa hàng', id:'CH001', name:'Laptop', ip_g:'5', ep_g:'2', invp_g:'37',unit:'chiếc',day_in:'10/5/2023',day_out:'13/6/2023'},
        { store:'Kho bảo hành', id:'BH003', name:'Máy photo', ip_g:'3', ep_g:'7', invp_g:'8',unit:'cái',day_in:'15/2/2023',day_out:'13/7/2023'},
        { store:'Kho phụ kiện', id:'LK004', name:'Màn hình LG', ip_g:'3', ep_g:'0', invp_g:'3',unit:'chiếc',day_in:'15/5/2023',day_out:'15/6/2023'},
        { store:'Kho lỗi hỏng', id:'LH001', name:'Máy in', ip_g:'2', ep_g:'5', invp_g:'3',unit:'cái',day_in:'28/2/2023',day_out:'15/6/2023'},
        { store:'Kho bảo hành', id:'BH004', name:'Màn hình LG', ip_g:'6', ep_g:'4', invp_g:'3',unit:'chiếc',day_in:'15/5/2023',day_out:'15/6/2023'},
        { store:'Kho phụ kiện', id:'LK006', name:'Sạc Laptop', ip_g:'7', ep_g:'6', invp_g:'5',unit:'cái',day_in:'14/5/2023',day_out:'17/6/2023'},
    ]
    
    return( 
    <div class="wrapper">
        <h4>Danh sách tồn kho</h4> 
        <div className="col text-right">
             <button className="btn btn-default low-height-btn" onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </button>
        </div>  
        <div class="row">
                <div class="table-responsive " >
                 <table class="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" className="col-1">Kho hàng</th>
                            <th scope="col" className="col-1">Mã sản phẩm</th>
                            <th scope="col" className="col-1">Tên sản phẩm</th>
                            <th scope="col" className="col-1">Tổng nhập</th>
                            <th scope="col" className="col-1">Tổng xuất</th>
                            <th scope="col" className="col-1">Tổng tồn</th>
                            <th scope="col" className="col-1">Đơn vị tính</th>
                            <th scope="col" className="col-1">Ngày nhập</th>
                            <th scope="col" className="col-1">Ngày xuất</th>
                            <th scope="col" className="col-1">Tác vụ</th>
                        </tr>
                    </thead>
                    <tbody>
                         {
                            Test.map((item,index)=>
                               <tr key={index}>
                                 <td>{item.store}</td>
                                 <td>{item.id}</td>
                                 <td>{item.name}</td>
                                 <td>{item.ip_g}</td>
                                 <td>{item.ep_g}</td>
                                 <td>{item.invp_g}</td>
                                 <td>{item.unit}</td>
                                 <td>{item.day_in}</td>
                                 <td>{item.day_out}</td>
                                 <td style={{ whiteSpace: 'nowrap' }}>
                                    <button type="button"
                                       className="btn btn-outline-primary btn-light btn-sm mx-sm-1 px-lg-2 w-32"
                                       title="Chi tiết" onClick={null}>
                                       <i className="fa fa-info" aria-hidden="true"></i>
                                    </button>
                                    <button type="button"
                                       className="btn btn-outline-warning btn-light btn-sm mx-sm-1 px-lg-2 w-32"
                                       title="Chỉnh sửa" onClick={null}>
                                       <i className="fa fa-pencil" aria-hidden="true"></i>
                                    </button>
                                    <button type="button"
                                       className="btn btn-outline-danger btn-light btn-sm mx-sm-1 px-lg-2 w-32"
                                       title="Xóa" onClick={null}>
                                       <i className="fa fa-trash" aria-hidden="true"></i>
                                    </button>
                                 </td>
                               </tr>
                            )
                         }
                    </tbody>
                </table>
            </div>   
        </div> 
        { modalForm ?
            <Modal  show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Quản lý tồn kho</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={null}>
                        <Form.Group className="mb-2">
                            <Form.Control as="select" name="" required value={null} id="select">
                            <option value="">Loại kho</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Control type="text" placeholder="Mã sản phẩm" name="" required value={null} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                        <Form.Control type="text" placeholder="Tên sản phẩm" name="" required value={null} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Control> 
                               <label for="number">Tổng nhập</label>
                               <input type="number" name="" required value={null}/>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Control> 
                               <label for="number">Tổng xuất</label>
                               <input type="number" name="" required value={null}/>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Control> 
                               <label for="number">Tổng tồn</label>
                               <input type="number" name="" required value={null}/>
                            </Form.Control>
                        </Form.Group>    
                        <Form.Group className="mb-2">
                            <Form.Control type="text" placeholder="Đơn vị tính" name="" required value={null} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Control>
                                <label for="ngaynhap">Ngày nhập</label>
                                <input type="date" name="" required value={null}/>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Control>
                                <label for="ngayxuat">Ngày xuất</label>
                                <input type="date" name="" required value={null}/>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="success" type="submit">
                           Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
            :
            <div className={"center loading"}>
                <ReactLoading type={'cylon'} color='#fffff' height={'33px'} width={'9%'} />
            </div>
        }
    </div>     
    )
}
export default adminLayout(PriventoryPage);
  
    