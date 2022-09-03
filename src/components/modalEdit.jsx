import '../views/css/admin.scss';
import {backendLink} from '../link.js'
import React, {  useState     } from 'react';
import { faPenToSquare , faFloppyDisk, faBan} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function fontAwesome(value,className) {
    return <FontAwesomeIcon className={className} icon={value} /> 
}

function EditPost(props) {
    const [fileSrc2, setFileSrc2] = useState(false);
    const [postImg2, setPostImg2] = useState('');
    const [header, setHeader] = useState(false);
    const [body, setBody] = useState(false);

    //Close Pop Up
    function closeEditWindow() {
        document.getElementById("modalEdit").style.display= 'none'
    }

    document.addEventListener("keydown", escapePressed, false);

    function escapePressed(e) {
    var keyCode = e.keyCode;
    if(keyCode===27) {
        closeEditWindow();
    }  
    }
    //Image Preview
    function imagePreview(event) {
        let file= URL.createObjectURL(event.target.files[0])
        setFileSrc2(file)
    }


    //Send New Data to Server "Change the Post"
    function savePost(props ) {
        let newheader , newBody = '';

        if(!body) {
            newBody = props.body;
        } else {
            newBody = body;
        }

        if(!header) {
            newheader = props.header;
        } else {
            newheader = header;
        }
        
        let formData = new FormData();
        formData.append('newImg', postImg2);
        formData.append('newHeader', newheader);
        formData.append('newBody', newBody);
        formData.append('postId', props.id);
        formData.append('token', sessionStorage.getItem("jwt"));
        formData.append('login', sessionStorage.getItem("login"));

        const requestOptions = {
            method: 'POST',
            mode: "cors",
            enctype: 'multipart/form-data',
            body: formData
        }
            let url = `${backendLink}/backend/editPost.php`;

            fetch(url,requestOptions)
        .then((response) => response.json())
        .then(data => {
        if(data.status === 200) {
            document.location.reload();
        }
        }).catch(err => {
        alert(err)
        })
    }

   
    return (

        <div id="modalEdit" >
            <div style={{margin: '0 7.5%'}}>
            <h3 className='newPostHeaderMain'> {fontAwesome(faPenToSquare,'newpostHeaderAwesome')} EDIT POST</h3>
            <div style={{display: 'flex'}}>
                
                <div className='EditImageSection'>
                    <div  className="PostImage2" style={
                         fileSrc2 ? {backgroundImage: "url(" + fileSrc2 + ")"
                        } : props.editPostData.img ? {
                            backgroundImage: "url(" + backendLink + "/backend/uploads/" + props.editPostData.img  + ")"
                        } : {}
                       
                        
                        }>
                    </div>
                        <input id="fileItem2" type={'file'}  onChange={(e)=> 
                            {
                                setPostImg2(e.target.files[0]);
                                imagePreview(e)
                            }
                        }/>
                </div>
                <div className='postContentWrap2'>
                    <input className='editHeader'  type={'text'} value={
                        header ? header : 
                        props.editPostData.header ?  props.editPostData.header : ''
                        } 
                        onChange={(e)=> setHeader(e.target.value)} >
                    </input>
                
                            <textarea className='EditTextArea' 
                                value={ body ? body : props.editPostData.body}  
                                onChange={(e)=> setBody(e.target.value)} >
                            </textarea>
                    <div style={{marginTop:'5px'}}>
                        <button className='modalConfirmationAgreeBtn' onClick={()=> savePost(props.editPostData,setBody)}>Save {fontAwesome(faFloppyDisk,'newpostHeaderAwesome')}</button>
                        <button className='modalConfirmationDisagreeBtn'onClick={()=> closeEditWindow() }>  {fontAwesome(faBan,'newpostHeaderAwesome')} Cancel</button>
                    </div>
                </div>
            </div>
            
           </div>
        </div>
 
    )
}

export default EditPost;