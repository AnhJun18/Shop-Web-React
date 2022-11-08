import {useContext, useState, useEffect, useRef} from "react";
import adminLayout from "../admin/adminLayout";
import axiosApiInstance from "../context/interceptor";
import axios from "../api/axios";
import {render} from "react-dom";
//import {alignPropType} from "react-bootstrap/types";
import {toast} from 'react-toastify';
import { Form, Button, Modal } from "react-bootstrap"

import Pagination from "../components/Pagination";
import {useLocation} from "react-router-dom";

const ProductPage = () => {
    const param = useLocation();

    const [list, setList] = useState([]);
    const [load, setLoad] = useState(false);
    const [totalPage, setTotalPage] = useState(1)
    const [quantity, setQuantity] = useState(1)

    const [product_id, setId] = useState();
    const [product_name, setName] = useState();
    const [product_image, setImage] = useState();
    const [product_category, setCategory] = useState();
    const [product_sold, setSold] = useState();

    function parents(node) {
        let current = node,
            list    = [];
        while(current.parentNode != null && current.parentNode != document.documentElement) {
          list.push(current.parentNode);
          current = current.parentNode;
        }
         return list
     }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        setId(parents(e.target).find(function(c){return c.tagName == "TR"}).children[0].innerText)
        setName(parents(e.target).find(function(c){return c.tagName == "TR"}).children[1].innerText)
        setImage(parents(e.target).find(function(c){return c.tagName == "TR"}).children[2].firstChild.currentSrc)
        setCategory(parents(e.target).find(function(c){return c.tagName == "TR"}).children[3].innerText)
        setSold(parents(e.target).find(function(c){return c.tagName == "TR"}).children[4].innerText)
        setShow(true);
    }
    const handleShowAdd = (e) => {
        setShow(true);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: axiosApiInstance.defaults.baseURL + `/api/product/create`,
            data: {
              id: product_id,
              name: product_name,
              category: product_category,
              sold: product_sold
            }
          });
    }

    async function getProduct(page, size) {
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/product/getpaging${page}&size=${size}`)
        setLoad(true);
        setList(result?.data.content)
        setTotalPage(result?.data.totalPages)
    }

    useEffect(() => {
        getProduct(param.search === '' ? '?page=1' : param.search, 2)
    }, [param]);


    const list_cate = ['cate1','cate2','cate3','cate4'];

    const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

      const [imageFiles, setImageFiles] = useState([]);
      const [images, setImages] = useState([]);
    
      const changeHandler = (e) => {
        const { files } = e.target;
        const validImageFiles = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (file.type.match(imageTypeRegex)) {
            validImageFiles.push(file);
          }
        }
        if (validImageFiles.length) {
          setImageFiles(validImageFiles);
          return;
        }
        alert("Selected images are not of valid type!");
      };
    
      useEffect(() => {
        const images = [], fileReaders = [];
        let isCancel = false;
        if (imageFiles.length) {
          imageFiles.forEach((file) => {
            const fileReader = new FileReader();
            fileReaders.push(fileReader);
            fileReader.onload = (e) => {
              const { result } = e.target;
              if (result) {
                images.push(result)
              }
              if (images.length === imageFiles.length && !isCancel) {
                setImages(images);
              }
            }
            fileReader.readAsDataURL(file);
          })
        };
        return () => {
          isCancel = true;
          fileReaders.forEach(fileReader => {
            if (fileReader.readyState === 1) {
              fileReader.abort()
            }
          })
        }
      }, [imageFiles]);

    return (
        <>{
            load ?
            <div>
                <div className="table-container" style={{width: '100%'}}>
                    <div className="row">
                        <div className="col">
                            <h5 className="pb-2 mb-0">Danh sách sản phẩm</h5>
                        </div>
                        <div className="col text-right">
                            <button className="btn btn-default low-height-btn" onClick={handleShowAdd}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="d-flex text-muted">
                        <table className="table table-image">
                            <thead>
                            <tr>
                                <th scope="col" className="col-1">Mã sản phẩm</th>
                                <th scope="col" className="col-3">Tên sản phẩm</th>
                                <th scope="col" className="col-1">Hình ảnh</th>
                                <th scope="col" className="col-2">Danh mục</th>
                                <th scope="col" className="col-2">Đã bán</th>
                                <th scope="col" className="col-2">Tác vụ</th>
                            </tr>
                            </thead>
                            <tbody>
                            {list.map((item) => (
                                <tr key={item.id}>
                                    <th scope="row">{item.id}</th>
                                    <td className="tdName">{item.name}</td>
                                    <td className="tdImage w-25">
                                        <img
                                            src={item.linkImg}
                                            width="200" height="auto" className="img-fluid img-thumbnail" alt="Sheep"/>
                                    </td>
                                    <td className="tdCategory">{item.category.name}</td>
                                    <td className="tdSold">25</td>
                                    <td>
                                        <button type="button"
                                                className="btn btn-outline-primary btn-light btn-sm mx-sm-1 px-lg-2"
                                                title="Chi tiết"><i className="fa fa-info" aria-hidden="true"></i>
                                        </button>
                                        <button type="button"
                                                className="btn btn-outline-warning btn-light btn-sm mx-sm-1 px-lg-2"
                                                title="Chỉnh sửa" onClick={handleShow}><i className="fa fa-pencil" aria-hidden="true"></i>
                                        </button>
                                        <button type="button"
                                                className="btn btn-outline-danger btn-light btn-sm mx-sm-1 px-lg-2"
                                                title="Xóa"><i className="fa fa-times"
                                                                                     aria-hidden="true"></i>
                                        </button>
                                    </td>
                                </tr>))}

                            </tbody>
                        </table>
                    </div>
                    <Pagination refix='product' size={totalPage}/>
                </div>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-2">
                        <Form.Control type="text" placeholder="Mã sản phẩm" name="id" required value={product_id} onChange={(e)=> setId(e.target.value)}/>
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Control type="text" placeholder="Tên sản phẩm" name="name" required value={product_name} onChange={(e)=> setName(e.target.value)}/>
                      </Form.Group>
                      <Form.Group className="mb-2">
                        { product_image ? (<ul class="list-images"><li><img src={product_image}/></li></ul>) : null}
                        { images.length > 0 ?
                            <ul class="list-images">
                              {
                                images.map((image, index) => {
                                  return <li key={index}> <img src={image} /> </li>
                                })
                              } 
                            </ul> : null
                        } 
                        <Form.Control type="file" id="file" onChange={changeHandler} accept="image/png, image/jpg, image/jpeg" multiple/>
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Control as="select" name="category" required value={product_category} onChange={(e)=> setCategory(e.target.value)} id="select">
                          <option value="">Danh mục</option>
                          {list_cate.map((cate,index) => (
                            <option value={cate} key={index}>{cate}</option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Control type="number" placeholder="Đã bán" name="sold"  value={product_sold} onChange={(e)=> setSold(e.target.value)}/>
                      </Form.Group>
                      <Button variant="success" type="submit">
                        Chỉnh sửa
                      </Button>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Đóng
                    </Button>
                  </Modal.Footer>
                </Modal>
            </div>
                :
                <div>Loading</div>

        }
        </>
    );

};
export default adminLayout(ProductPage);