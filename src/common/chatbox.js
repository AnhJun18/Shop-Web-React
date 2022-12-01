import React, {useEffect, useState} from "react";
import './../assets/css/chatbox.css'
import axios from "../api/axios";



const ChatBox = ()=> {
   const [show, setShow]= useState(false)
    const [talk, setTalk]= useState([])
    const [message, setMessage]= useState()


    const scroll=()=>{
        const el = document.getElementById('chat-feed');
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }

    const callChatBox=async (msg) => {
        const response =await axios(`http://127.0.0.1:5000/get?msg=${msg}`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, *cors, same-origin
        })
        const kq = {
            response: response.data
        }
        talk.push(kq)
        setTalk(talk)
    }


    const handleShow = ()=>{
       setShow(!show);
    }

    const handleSend = async (e) => {
        if (message) {
            const tmp = {
                request: message
            }
            talk.push(tmp)
            setTalk(talk)
            await callChatBox()
            setMessage("")
        }

    }

    const handleSubmit = async (e) => {
        if (e.key === "Enter" && message) {
            const tmp = {
                request: message
            }
            talk.push(tmp)
            setTalk(talk)
            await callChatBox(message)
            setMessage("")
        }
    }
    useEffect(()=>{
        scroll();
    },[message,show])

    return <>
            <div className="chat-button ml-3 mb-4">
                <button type="button" onClick={handleShow} className="btn-xl btn-info btn-circle"><i class="fa fa-comment text-white"></i></button>
            </div>
          {show ?
              <div class="container chat-container d-flex justify-content-center" >
                <div class="card chat-card ">
                    <div className=" chat-header d-flex flex-row  adiv ">
                        <img src={require('./../assets/images/chatbox.png')} width="50" height="50"/>
                        <div className="d-flex justify-content-between p-3 w-100 ps-0 text-white">
                            <span className="pb-3">ChatBox tư vấn</span>
                            <i onClick={handleShow} className="close fa fa-times"></i>
                        </div>
                    </div>

                    <div class="chat-element"  id="chat-feed">
                        <div class="d-flex p-3">
                            <img src={require('./../assets/images/chatbox.png')}  width="30" height="30"/>
                            <div class="chat-response ml-2 p-3 text-justify">Chào bạn, mình là chatbot tư vấn ❤! <br/>
                                Bạn có thể cho mình biết bạn muốn mua đồ đi đâu được không? </div>
                        </div>

                  {talk.map((i)=>
                      i.request?
                          <div className="d-flex  flex-row-reverse p-3">
                              <div className="chat-request  mr-2 p-3 text-justify"><span>{i.request}</span>
                              </div>
                          </div>
                          :
                          i.response?
                              <div className="d-flex p-3">
                                  <img src={require('./../assets/images/chatbox.png')}
                                       width="30" height="30"/>
                                  <div className="chat-response ml-2 p-3">{i.response}
                                  </div>
                              </div>
                              :null
                  )     }
                    </div>
                    <div class=" d-flex flex-row align-items-center px-3 chatbox-input">
                        <input id="txtChatText" autoComplete="off" className="cssChatText text-justify" value={message} onKeyDown={(e)=>handleSubmit(e)} onChange={(e)=>setMessage(e.currentTarget.value)} placeholder="Nhập câu hỏi của bạn..."/>
                        <i className="fa fa-paper-plane icon-send" onClick={handleSend}></i>
                    </div>
                </div>
            </div>
                :null}
        </>
    }
export default ChatBox;