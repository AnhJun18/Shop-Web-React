import React from "react";
import UserHeader from './../common/user-header';
import UserFooter from './../common/user-footer';
import { Preloader, Bars } from 'react-preloader-icon';
import ChatBox from "../common/chatbox";

const userLayout = (ChildComponent) => {
    class UserLayout extends React.Component {
        constructor(props){
            super(props);
    
            this.state = {
                pageLoaded: false,
                saveLeadClickEvent: ""
            };
        }

        componentDidMount(){
            setTimeout(() => {
                this.setState(() => ({
                    pageLoaded: true
                }))
            }, 1000);
        }

        renderHtml(){
            if(!this.state.pageLoaded){
                return <div className="loading-page">
                    <div className="center">
                        <Preloader use={Bars} size={60} strokeWidth={10} strokeColor="#f7b085" duration={600} />
                    </div>
              </div>
            }

            return <div className="" id="">
                {/* <!-- Page content wrapper--> */}
                <div id="page-content-wrapper">
                    {/* <!-- Top navigation--> */}
                    <UserHeader />
                    {/* <!-- Page content--> */}
                    <div className="container-fluid content-container shop-user">
                        <ChildComponent {...this.props} />
                    </div>
                    <UserFooter />
                    <ChatBox/>
                </div>
            </div>
        }

        addLeadModalFooterContent(){ 
            return <>
                <div style={{width:"100%"}}>
                    <button onClick={(e) => this.setState(() => ({saveLeadClickEvent: (Math.random() + 1).toString(36).substring(7)}))} className="btn btn-default low-height-btn">Add Lead</button> 
                </div>
            </>;
        }

        handleParentData = (e) => {
            console.log(e);
        }

        render(){
            return <>
                {this.renderHtml()}
            </>
        }
    }

    return UserLayout;
}

export default userLayout;