import React from "react";
import './../assets/css/chatbox.css'



class ChatBox extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }


    render() {
        return <>
            <div className="chat-button ml-3 mb-4">
                <button type="button" className="btn-xl btn-info btn-circle"><i class="fa fa-comment text-white"></i></button>
            </div>
            <div class="container chat-container d-flex justify-content-center">
                <div class="card chat-card mt-5">
                    <div class="chat-header d-flex flex-row justify-content-between p-3 adiv text-white">
                        <i class="fa fa-chevron-left"></i>
                        <span class="pb-3">Live chat</span>
                        <i class="fa fa-times"></i>
                    </div>
                    <div class="chat-element">
                        <div class="d-flex flex-row p-3">
                            <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png/" width="30" height="30"/>
                            <div class="chat ml-2 p-3">Hello and thankyou for visiting birdlymind. Please click the video above</div>
                        </div>

                        <div class="d-flex flex-row p-3">
                            <div class="bg-white mr-2 p-3"><span class="text-muted">Hello and thankyou for visiting birdlynind.</span></div>
                            <img src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png/" width="30" height="30"/>
                        </div>
                        
                        <div class="d-flex flex-row p-3">
                            <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png" width="30" height="30"/>
                            <div class="chat ml-2 p-3"><span class="text-muted dot">. . .</span></div>
                        </div>
                    </div>
                    
                    <div class="form-group px-3">
                        <textarea class="form-control chat-form-control" rows="2" placeholder="Type your message"></textarea>
                    </div>
                </div>
            </div>

        </>
    }
}

export default ChatBox;