import {backendLink}  from '../link.js'


export function deleteImg(id) {
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
        let url = `${backendLink}/backend/deleteImage.php`;

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