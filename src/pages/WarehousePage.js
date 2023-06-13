import { useEffect, useState } from "react";
import adminLayout from "../admin/adminLayout";
import axiosApiInstance from "../context/interceptor";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { Button, Form, Modal } from "react-bootstrap";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";
import ReactLoading from "react-loading";

const WarehousePage = () => {
  const param = useLocation();

  const [list, setList] = useState([]);
  const [load, setLoad] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [listCate, setListCate] = useState([]);
  const [listTag, setListTag] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const [modalForm, setModalForm] = useState(false);
  const [productDetail, setProductDetail] = useState([]);

  const [product_id, setId] = useState();
  const [product_name, setName] = useState();
  const [product_image, setImage] = useState();
  const [product_category, setCategory] = useState();
  const [product_sold, setSold] = useState();
  const [product_describe, setDescribe] = useState();

  function parents(node) {
    let current = node,
      list = [];
    while (
      current.parentNode != null &&
      current.parentNode != document.documentElement
    ) {
      list.push(current.parentNode);
      current = current.parentNode;
    }
    return list;
  }
  const listWareHouse = [
    {
      MaKho: "MaKho1",
      TenKho: "TenKho1",
      LoaiKho: "LoaiKho1",
      SDT: "SDT1",
      DiaChi: "DiaChi1",
      status: "1",
    },
  ];
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setModalForm(true);
    setImage(null);
    setId(
      parents(e.target).find(function (c) {
        return c.tagName === "TR";
      }).children[0].innerText
    );
    setName(
      parents(e.target).find(function (c) {
        return c.tagName === "TR";
      }).children[1].innerText
    );
    setImage(
      parents(e.target).find(function (c) {
        return c.tagName === "TR";
      }).children[2].firstChild.currentSrc
    );
    setCategory(
      parents(e.target).find(function (c) {
        return c.tagName === "TR";
      }).children[3].innerText
    );
    setSold(
      parents(e.target).find(function (c) {
        return c.tagName === "TR";
      }).children[4].innerText
    );
    setDescribe(
      parents(e.target).find(function (c) {
        return c.tagName === "TR";
      }).children[5].innerText
    );
    const tag = parents(e.target).find(function (c) {
      return c.tagName === "TR";
    }).children[6].innerText;

    setShow(true);
    setEditForm(true);
  };

  const handleShowInfo = (e) => {
    setModalForm(false);

    setImage(null);
    const tmpID = parents(e.target).find(function (c) {
      return c.tagName === "TR";
    }).children[0].innerText;
    setId(tmpID);
    getDetails(
      parents(e.target).find(function (c) {
        return c.tagName === "TR";
      }).children[0].innerText
    );
    setName(
      parents(e.target).find(function (c) {
        return c.tagName === "TR";
      }).children[1].innerText
    );
    setImage(
      parents(e.target).find(function (c) {
        return c.tagName === "TR";
      }).children[2].firstChild.currentSrc
    );
    setCategory(
      parents(e.target).find(function (c) {
        return c.tagName === "TR";
      }).children[3].innerText
    );
    setSold(
      parents(e.target).find(function (c) {
        return c.tagName === "TR";
      }).children[4].innerText
    );
    setDescribe(
      parents(e.target).find(function (c) {
        return c.tagName === "TR";
      }).children[5].innerText
    );

    setShow(true);
  };
  const handleShowAdd = (e) => {
    setModalForm(true);
    setShow(true);
    setEditForm(false);
    setId(null);
    setName(null);
    setDescribe(null);
    setCategory(null);
    setSold(null);
    setImage(null);
  };
  const sendNotifyForApp = async (pro) => {
    const paramSend = {
      data: {
        productId: pro?.id,
      },
      notification: {
        body: "kho mới đã có tại của hàng",
        title: "Thông báo",
        image: pro?.linkImg,
        badge: "1",
      },
      to: "/topics/new-product",
    };
    const headers = {
      Authorization:
        "key=AAAAIE6_JeY:APA91bFpnQfZqn-vCdYPdvPDLIAG-KrqQR6U9v1xtzJ3yCrAsnySS6WNvETNBV1eymDQm0m7ouwySiIfIMftHpOMW1mbeAEnpv83FPLvjcXyk_YrdJRONTUsg-y-BKyCN0wImmYsKkG1",
    };
    try {
      const response = await axios.post(
        "https://fcm.googleapis.com/fcm/send",
        paramSend,
        { headers }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let tokensData = JSON.parse(localStorage.getItem("tokens"));
    const params = {
      describe: product_describe,
      name: product_name,
      category: product_category,
      price: product_sold,
    };
    const methodForm = editForm ? "put" : "post";
    const urlForm = editForm
      ? `/api/product/edit/${product_id}`
      : `/api/product/create`;
    const kq = await axios({
      method: methodForm,
      url: axiosApiInstance.defaults.baseURL + urlForm,
      params: params,
      headers: {
        Authorization: `Bearer ${tokensData.data.accessToken}`,
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
      },
      data: {},
    });
    if (kq.data.status === true) {
      toast.success(kq.data.message);
      getProduct(param.search === "" ? "?page=1" : param.search, 5);
      setShow(false);
      if (!editForm) {
        await sendNotifyForApp(kq.data?.product);
      }
    } else toast.error(kq.data.message);
  };

  const handleBlock = async (e) => {
    e.preventDefault();
    const tmpID = parents(e.target).find(function (c) {
      return c.tagName === "TR";
    }).children[0].innerText;
    console.log(tmpID);
    const kq = await axiosApiInstance.delete(
      axiosApiInstance.defaults.baseURL +
        `/api/product/block?productID=${tmpID}`
    );
    if (kq.data.status === true) {
      toast.success("kho đã được khóa");
      setShow(false);
    } else toast.error(kq.data.message);
    await getProduct(param.search === "" ? "?page=1" : param.search, 5);
  };
  const handleUnBlock = async (e) => {
    e.preventDefault();
    const tmpID = parents(e.target).find(function (c) {
      return c.tagName === "TR";
    }).children[0].innerText;
    console.log(tmpID);
    const kq = await axiosApiInstance.delete(
      axiosApiInstance.defaults.baseURL +
        `/api/product/un_block?productID=${tmpID}`
    );
    if (kq.data.status === true) {
      toast.success("kho đã được mở khóa");
      setShow(false);
    } else toast.error(kq.data.message);
    await getProduct(param.search === "" ? "?page=1" : param.search, 5);
  };

  async function getProduct(page, size) {
    const result = await axiosApiInstance.get(
      axiosApiInstance.defaults.baseURL +
        `/api/product/get_paging${page}&size=${size}`
    );
    setLoad(true);
    setList(result?.data.content);
    setTotalPage(result?.data.totalPages);
  }

  async function getDetails(id) {
    const result = await axiosApiInstance.get(
      axiosApiInstance.defaults.baseURL + `/api/product/detail/${id}`
    );
    setLoad(true);
    setProductDetail(result?.data);
    console.log(result);
  }

  async function getAllTags() {
    const result = await axios.get(
      axiosApiInstance.defaults.baseURL + `/api/chatbot/tags/list`
    );
    setLoad(true);
    setListTag(result?.data);
  }

  async function getCategory() {
    const result = await axiosApiInstance.get(
      axiosApiInstance.defaults.baseURL + `/api/category/all`
    );
    setLoad(true);
    setListCate(result?.data);
  }

  useEffect(() => {
    getProduct(param.search === "" ? "?page=1" : param.search, 5);
    getCategory();
    getAllTags();
  }, [param]);

  return (
    <>
      {load ? (
        <div>
          <div className="table-container" style={{ width: "100%" }}>
            <div className="row">
              <div className="col">
                <h5 className="pb-2 mb-0">Danh sách kho</h5>
              </div>
              <div className="col text-right">
                <button
                  className="btn btn-default low-height-btn"
                  onClick={handleShowAdd}
                >
                  <i className="fa fa-plus"></i>
                </button>
              </div>
            </div>
            <div className="d-flex text-muted overflow-auto">
              <table className="table table-image">
                <thead>
                  <tr>
                    <th scope="col" className="col-1">
                      Mã kho
                    </th>
                    <th scope="col" className="col-3">
                      Tên kho
                    </th>
                    <th scope="col" className="col-1">
                      Loại kho
                    </th>
                    <th scope="col" className="col-2">
                      Số điện thoại
                    </th>
                    <th scope="col" className="col-1">
                      Địa chỉ
                    </th>
                    <th scope="col" className="col-2">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listWareHouse.map((item) => (
                    <tr key={item.id}>
                      <th scope="row">{item.MaKho}</th>
                      <td className="tdCategory">{item.TenKho}</td>
                      <td className="tdCategory">{item.LoaiKho}</td>
                      <td className="tdCategory">{item.SDT}</td>
                      <td className="tdCategory">{item.DiaChi}</td>
                      <td style={{ whiteSpace: "nowrap" }}>
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-light btn-sm mx-sm-1 px-lg-2 w-32"
                          title="Chi tiết"
                          onClick={handleShowInfo}
                        >
                          <i className="fa fa-info" aria-hidden="true"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-warning btn-light btn-sm mx-sm-1 px-lg-2 w-32"
                          title="Chỉnh sửa"
                          onClick={handleShow}
                        >
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        {item.status ? (
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-light btn-sm mx-sm-1 px-lg-2 w-32"
                            title="Mở khóa"
                            onClick={handleUnBlock}
                          >
                            <i className="fa fa-unlock" aria-hidden="true"></i>
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-light btn-sm mx-sm-1 px-lg-2 w-32"
                            title="Khóa"
                            onClick={handleBlock}
                          >
                            <i className="fa fa-lock" aria-hidden="true"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination refix="product" size={totalPage} />
          </div>

          {modalForm ? (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Quản lý kho</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Tên kho"
                      name="name"
                      required
                      value={product_name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Control
                      as="select"
                      name="category"
                      required
                      value={product_category}
                      onChange={(e) => setCategory(e.target.value)}
                      id="select"
                    >
                      <option value="">Loại kho</option>
                      {listCate.map((cate) => (
                        <option value={cate.name} key={cate.id}>
                          {cate.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="SDT"
                      name="name"
                      required
                      value={product_name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Địa chỉ"
                      name="name"
                      required
                      value={product_name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="success" type="submit">
                    {editForm ? "Chỉnh sửa" : "Tạo kho"}
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Đóng
                </Button>
              </Modal.Footer>
            </Modal>
          ) : (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Chi tiết kho</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  Tên kho : <strong>{product_name}</strong>
                </div>
                <div>
                  Loại kho : <strong>{product_name}</strong>
                </div>
                <div>
                  SDT : <strong>{product_name}</strong>
                </div>
                <div>
                  Địa chỉ : <strong>{product_name}</strong>
                </div>

                <table className="table mt-3">
                  <thead>
                    <tr bgcolor="Silver">
                      <th scope="col" className="col-2">
                        Size
                      </th>
                      <th scope="col" className="col-2">
                        Màu
                      </th>
                      <th scope="col" className="col-2">
                        Số lượng
                      </th>
                    </tr>
                  </thead>
                  {productDetail.map((item) => (
                    <tbody>
                      <tr>
                        <td>{item.size}</td>
                        <td>{item.color}</td>
                        <td className="px-4">{item.current_number}</td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Đóng
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      ) : (
        <div className={"center loading"}>
          <ReactLoading
            type={"cylon"}
            color="#fffff"
            height={"33px"}
            width={"9%"}
          />
        </div>
      )}
    </>
  );
};
export default adminLayout(WarehousePage);
