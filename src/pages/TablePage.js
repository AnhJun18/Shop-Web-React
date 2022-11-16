import React from "react";
import adminLayout from "../admin/adminLayout";

const TablePage = () => {
        return (
            <>
            <div className="table-container" style={{width: '100%'}}>
                <div className="row">
                    <div className="col">
                        <h5 className="pb-2 mb-0">Table</h5>
                    </div>
                    <div className="col text-right">
                        <button className="btn btn-default low-height-btn">
                            <i className="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div className="d-flex text-muted">
                    <table className="table">
                        <thead>
                            <tr>
                                <th><input type="checkbox"/></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone number</th>
                                <th>Created On</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="checkbox"/></td>
                                <td>User 1</td>
                                <td>user1@gmail.com</td>
                                <td>0123456789</td>
                                <td>15/09/2022</td>
                                <td>
                                    <div className="dropdown table-action-dropdown">
                                        <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButtonSM" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonSM">
                                            <li><a className="dropdown-item" href="#"><i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit</a></li>
                                            <div className="dropdown-divider"></div>
                                            <li><a className="dropdown-item text-danger" href="#"><i className="fa fa-trash" aria-hidden="true"></i>&nbsp;Delete</a></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="checkbox"/></td>
                                <td>User 2</td>
                                <td>user2@gmail.com</td>
                                <td>0987654321</td>
                                <td>13/09/2022</td>
                                <td>
                                    <div className="dropdown table-action-dropdown">
                                        <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButtonSM" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonSM">
                                            <li><a className="dropdown-item" href="#"><i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit</a></li>
                                            <div className="dropdown-divider"></div>
                                            <li><a className="dropdown-item text-danger" href="#"><i className="fa fa-trash" aria-hidden="true"></i>&nbsp;Delete</a></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="checkbox"/></td>
                                <td>User 3</td>
                                <td>user3@gmail.com</td>
                                <td>0987654321</td>
                                <td>13/08/2022</td>
                                <td>
                                    <div className="dropdown table-action-dropdown">
                                        <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButtonSM" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonSM">
                                            <li><a className="dropdown-item" href="#"><i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit</a></li>
                                            <div className="dropdown-divider"></div>
                                            <li><a className="dropdown-item text-danger" href="#"><i className="fa fa-trash" aria-hidden="true"></i>&nbsp;Delete</a></li>
                                        </ul>
                                    </div>
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

export default adminLayout(TablePage);