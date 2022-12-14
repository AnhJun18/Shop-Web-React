import React, {useEffect, useState} from "react";
import './../assets/css/chatbox.css'
import axios from "../api/axios";
import axiosApiInstance from "../context/interceptor";
import {useLocation, useNavigate} from "react-router-dom"


const ChatBox = () => {
    const navigate= useNavigate()
    const [show, setShow] = useState(false)
    const [talk, setTalk] = useState([])
    const [message, setMessage] = useState()
    const [collect,setCollect] =useState([])
    const [isRecommend,setIsRecommend]= useState(false)

    const scroll = () => {
        const el = document.getElementById('chat-feed');
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }

    const callChatBox = async (msg) => {
        const response = await axios(`http://127.0.0.1:5000/get?msg=${msg}`, {
            method: 'GET',
            mode: 'no-cors',
        })
        const kq = {
            response: response.data,
            link: response.data.startsWith("list") ? `/recommend?l=${response.data}` : null
        }

       if(isRecommend){
            setIsRecommend(false)
            collect.splice(0)
            setCollect(collect)
       }

        collect.push({
            request:msg,
            response:response.data
        })
        setCollect(collect)
        if (kq.link) {
            try {
                setIsRecommend(true);
                const rp = await axios.get(axiosApiInstance.defaults.baseURL + `/api/chatbot/tags/describer?nameTag=${kq.response}`)
                kq.response = rp.data.data?rp.data.data:response.data

            } catch (e) {
                kq.response = {
                    name: response.data
                }
            }
        }

        console.log(collect)
        talk.push(kq)
        setTalk(talk)
    }


    const handleShow = () => {
        setShow(!show);
    }

    const handleSend = async (e) => {
        if (message) {
            const tmp = {
                request: message
            }
            talk.push(tmp)
            setTalk(talk)
            setMessage(" ")
            await callChatBox(message)
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
            setMessage(" ")
            await callChatBox(message)
            setMessage("")
        }
    }
    const  handleClick = (e)=>{
        e.preventDefault(false);
        axios.post(axiosApiInstance.defaults.baseURL + `/api/chatbot/collect`,collect)
        window.location.href=`${e.currentTarget.title}`
    }
    useEffect(() => {
        scroll();
    }, [message, show])

    return <>
        <div className="chat-button ml-3 mb-4">
            <button type="button" onClick={handleShow} className="btn-xl btn-info btn-circle"><i
                class="fa fa-comment text-white"></i></button>
        </div>
        {show ?
            <div class="container chat-container d-flex justify-content-center">
                <div class="card chat-card ">
                    <div className=" chat-header d-flex flex-row  adiv ">
                        <img src={require('./../assets/images/chatbox.png')} width="50" height="50"/>
                        <div className="d-flex justify-content-between p-3 w-100 ps-0 text-white">
                            <span className="pb-3">ChatBox tư vấn</span>
                            <i onClick={handleShow} className="close fa fa-times"></i>
                        </div>
                    </div>

                    <div class="chat-element" id="chat-feed">
                        <div class="d-flex p-3">
                            <img src={require('./../assets/images/chatbox.png')} width="30" height="30"/>
                            <div class="chat-response ml-2 p-3 text-justify">Chào bạn, mình là chatbot tư vấn ❤! <br/>
                                Bạn có thể cho mình biết bạn muốn mua đồ đi đâu được không?
                            </div>
                        </div>

                        {talk.map((i) =>
                            i.request ?
                                <div className="d-flex  flex-row-reverse p-3">
                                    <div className="chat-request  mr-2 p-3 text-justify"><span>{i.request}</span>
                                    </div>
                                </div>
                                : i.response ?
                                <div className="d-flex p-3">
                                    <img src={require('./../assets/images/chatbox.png')}
                                         width="30" height="30"/>
                                    <div className="chat-response ml-2 p-3">{i.link ?
                                        <div className="describer-recommend">{i.response?.describer}: <a
                                       onClick={handleClick}  title={`${i.link}`}>
                                            <div className="link-recommend">{i.response.name?i.response.name:i.link}</div>
                                        </a></div>
                                        : i.response}
                                    </div>
                                </div>
                                : null
                        )}
                    </div>
                    <div class=" d-flex flex-row align-items-center px-3 chatbox-input">
                        <input id="txtChatText" autoComplete="off" className="cssChatText text-justify" value={message}
                               onKeyDown={(e) => handleSubmit(e)} onChange={(e) => setMessage(e.currentTarget.value)}
                               placeholder="Nhập câu hỏi của bạn..."/>
                        <i className="fa fa-paper-plane icon-send" onClick={handleSend}></i>
                    </div>
                </div>
            </div>
            : null}
    </>
}
export default ChatBox;