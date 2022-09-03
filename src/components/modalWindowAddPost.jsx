import isLogedInServerCall from '../views/logedIn.js'
import React, {  useState, useEffect } from 'react';
import {backendLink} from '../link.js'
import '../views/css/admin.scss';

import { faPlus , faFloppyDisk} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function fontAwesome(value,className) {
    return <FontAwesomeIcon className={className} icon={value} /> 
}

function closeAddNewPostModal() {
    document.getElementById("addNewPostWrapper").style.display= 'none';
    document.removeEventListener("keydown", escapePressed);
}




function escapePressed(e) {
  var keyCode = e.keyCode;
  if(keyCode===27) {
    closeAddNewPostModal();
  }  
}

function ModalAddPost() {
    const [fileSrc, setFileSrc] = useState('defaultAddImg.jpg');
    const [postHeader, setPostHeader] = useState('');
    const [postBody, setPostBody] = useState('');
    const [postImg, setPostImg] = useState(3);
    const [isLogedIn, setisLogedIn] = useState(false);
    const [msg, setMsg] = useState([]);
 
    useEffect(() => {
        isLogedInServerCall(setisLogedIn);
        document.addEventListener("keydown", escapePressed);
    }, []);

 

    
    function imagePreview(event) {
        let file= URL.createObjectURL(event.target.files[0])
        setFileSrc(file)
    }


    function createNewPost(header, body, img) {

        let formData = new FormData();
        formData.append('header', header);
        formData.append('body', body);
        formData.append('img', img);
        formData.append('token', sessionStorage.getItem("jwt"));
        formData.append('login', sessionStorage.getItem("login"));

        const requestOptions = {
            method: 'POST',
            mode: "cors",
            enctype: 'multipart/form-data',
            body: formData
        }
        let url = `${backendLink}/backend/addNewPost.php`;
    
        fetch(url,requestOptions)
    .then((response) => response.json())
    .then(data => {
        if(data.status === 200) {
            setPostBody('');
            setPostHeader('');
            setPostImg();
            document.location.reload();
        } else {
            setMsg(data);
        }
       
        
    }).catch(err => {
    alert('error')
    })
    }
    return (
        <div id="addNewPostWrapper" className="addNewPostWrapper"> 
          {isLogedIn ? (
            <div className='newPost'>
                 <span className='newPostCloseBtn' onClick={()=>closeAddNewPostModal()}>X</span>
                 
                 <h3 className='newPostHeaderMain'>{fontAwesome(faPlus,'newpostHeaderAwesome')}NEW POST</h3>
                    <div>
                        {msg.map((error, index) => {
                            return <p className='ErrorMsg' key={index}>{error}</p>
                        })}
                    </div>
                <div className='addPostWrapper'>
                    
                    <div className='addPostImageWrapper'>
                        <div  className='addPostImg' style={{backgroundImage: "url(" + fileSrc + ")"}}> </div>
                        <div> 
                            <input id="fileItem" type={'file'}  onChange={(e)=> 
                                {
                                    setPostImg(e.target.files[0]);
                                    imagePreview(e)
                                }                    
                            }/>
                        </div>
                    </div>
                   
                    <div className='addPostBodyWrapper'>
                      
                        <input className='newPostHeader' type={'text'} placeholder={'Header'} value={postHeader}  onChange={(e)=> setPostHeader(e.target.value)}/>
                        <textarea className='newPostBody'  placeholder={'Enter post text here...'}  onChange={(e)=> setPostBody(e.target.value)}  ></textarea>
                        <button className='addPostBtn' type={'submit'} onClick={()=> createNewPost(postHeader,postBody,postImg)}>
                            SUBMIT {fontAwesome(faFloppyDisk,'newpostHeaderAwesome')}
                        </button>
                    </div>
                    
                </div>
               
              
            </div>
            ) : (
                 <div>
                    You are not logged in<br></br>
                    <a href={`${backendLink}:3000`}>Log in Here</a>
                </div>
            )}
           
        </div>
    )
}

export default ModalAddPost;