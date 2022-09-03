import {backendLink} from '../link.js'
function islogedIn(setisLogedIn) { 
    let formData = new FormData();
    formData.append('token', sessionStorage.getItem("jwt"));
    formData.append('login', sessionStorage.getItem("login"));
    const requestOptions = {
        method: 'POST',
        mode: "cors",
        enctype: 'multipart/form-data',
        body: formData
    }
    let url = `${backendLink}/backend/isUserLoggedIn.php`;

     fetch(url,requestOptions)
    .then((response) => response.json())
    .then(data => {   
        setisLogedIn(data)
    }).catch(err => {
    console.log('error')
    })
     
} 

export default islogedIn;