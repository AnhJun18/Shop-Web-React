import {useContext, useState, useEffect} from "react";
import "../../assets/css/profile.css"
import userProfileLayout from "../../admin/userProfileLayout";
import axios from '../../api/axios';

const ProfilePage = () => {
    const [userName, setUserName] = useState([]);
    const [email, setEmail] = useState([]);
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [phone, setPhone] = useState([]);
    
    async function getProfileUser() {
        return await fetch(axios.defaults.baseURL + "/api/user/profile", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("tokens")).data.accessToken
            },
        })
            .then(response => response.json().then(res=>{
                setUserName(res.data.user.account.username)
                setFirstName(res.data.user.firstName)
                setLastName(res.data.user.lastName)
                setEmail(res.data.user.account.email)
                setPhone(res.data.user.phone)
            }))
    }

    useEffect(() => {
        getProfileUser() ;
    }, []);

        return <>
                <div className="my-3 p-3 bg-body rounded shadow-sm">
                    <h6 className="border-bottom pb-2 mb-0 mb-3">Personal Info</h6>
                        <form>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Username" value={userName}/>
                                        <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                                    </div>
                                </div>
                                <div className="col">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Email Address" value={email}/>
                                        <span className="input-group-text" id="basic-addon2">@</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="First Name" value={firstName}/>
                                        <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                                    </div>
                                </div>
                                <div className="col">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Last Name" value={lastName}/>
                                        <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Contact Number</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Contact Number" value={phone}/>
                                        <span className="input-group-text" id="basic-addon2"><i className="fa fa-mobile"></i></span>
                                    </div>
                                </div>
                            </div>
                           
                            <button type="submit" className="btn btn-default">Submit</button>
                        </form>
                </div>
            
        </>
    }

export default userProfileLayout(ProfilePage);