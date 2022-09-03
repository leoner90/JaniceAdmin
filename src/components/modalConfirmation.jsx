import React from 'react'; 
import '../views/css/admin.scss';
import {backendLink} from '../link.js'
import {deleteImg} from './deleteImg.js'

function closeConfirmationModal() {
    document.getElementById("modalConfirmation").style.display= 'none'
}

document.addEventListener("keydown", escapePressed, false);

function escapePressed(e) {
  var keyCode = e.keyCode;
  if(keyCode===27) {
    closeConfirmationModal();
  }  
}


function deletePost(id) {
    let formData = new FormData();
    formData.append('postId', id);
    formData.append('token', sessionStorage.getItem("jwt"));
    formData.append('login', sessionStorage.getItem("login"));

    const requestOptions = {
        method: 'POST',
        mode: "cors",
        enctype: 'multipart/form-data',
        body: formData
    }
        let url = `${backendLink}/backend/deletePost.php`;

        fetch(url,requestOptions)
    .then((response) => response.json())
    .then(data => {
    if(data.status === 200) {
        document.location.reload();
    }
    }).catch(err => {
    alert('error')
    })
}






function preDelete(id , whatToDelete) {
    if(whatToDelete === 'post') {
        deletePost(id);
    } else if(whatToDelete === 'img'){
        deleteImg(id)
    }
}

function modalConfirmation(props) {
    
    return (
        <div id="modalConfirmation" className="modalConfirmWrapper">
            <div className='modalConfirmFlexer'>
                <div className='modalConfirmContent'>
                    <h3 className='modalConfirmationWarningHeader'>Are You Sure you want to delete this</h3>
                    <button className='modalConfirmationAgreeBtn' onClick={()=> preDelete(props.id, props.whatToDelete)}>Yes</button>
                    <button className='modalConfirmationDisagreeBtn'onClick={()=> closeConfirmationModal() }>No</button>
                </div>
            </div>
        </div>
    )
}

export default modalConfirmation;