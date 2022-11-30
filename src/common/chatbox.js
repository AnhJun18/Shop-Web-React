import React, {useState} from "react";
import './../assets/css/chatbox.css'



const ChatBox = ()=> {
   const [show, setShow]= useState(false)

    const handleShow = ()=>{
       setShow(!show);
    }
    return <>
            <div className="chat-button ml-3 mb-4">
                <button type="button" onClick={handleShow} className="btn-xl btn-info btn-circle"><i class="fa fa-comment text-white"></i></button>
            </div>
          {show ?
              <div class="container chat-container d-flex justify-content-center">
                <div class="card chat-card ">
                    <div class="chat-header d-flex flex-row justify-content-between p-3 adiv text-white">
                        <span class="pb-3">Chat box</span>
                        <i onClick={handleShow} class="close fa fa-times"></i>
                    </div>
                    <div class="chat-element">
                        <div class="d-flex p-3">
                            <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png/" width="30" height="30"/>
                            <div class="chat ml-2 p-3">Chào bạn, chúc bạn một ngày tốt lành ❤ <br/>
                                Tôi là trợ lý ảo của Shop PTIT. Hãy hỏi để tôi có thể giúp bạn</div>
                        </div>

                      {/*  <div class="d-flex flex-row p-3">
                            <div class="bg-white mr-2 p-3"><span class="text-muted">Hello and thankyou for visiting birdlynind.</span></div>
                            <img src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png/" width="30" height="30"/>
                        </div>
                        
                        <div class="d-flex flex-row p-3">
                            <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png" width="30" height="30"/>
                            <div class="chat ml-2 p-3"><span class="text-muted dot">. . .</span></div>
                        </div>*/}
                    </div>
                    <div class=" d-flex flex-row align-items-center px-3">
                        <input id="txtChatText" className="cssChatText"  onSubmit={handleShow} placeholder="Please enter your question here..."/>
                        <i className="fa fa-paper-plane icon-send"></i>
                    </div>
                </div>
            </div>
                :null}
        </>
    }
export default ChatBox;