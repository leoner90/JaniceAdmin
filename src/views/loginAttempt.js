import {backendLink} from '../link.js'
function loginAttempt(login, password,event,setMsg) {
    event.preventDefault();
    let formData = new FormData();
    formData.append('login', login);
    formData.append('password', password);
    

    const requestOptions = {
        method: 'POST',
        mode: "cors",
        enctype: 'multipart/form-data',
        body: formData
    }
    let url = `${backendLink}/backend/login.php`;

    fetch(url,requestOptions)
.then((response) => response.json())
.then(data => {     
    if(data.token){ 
        sessionStorage.clear();
        sessionStorage.setItem("jwt", data.token);
        sessionStorage.setItem("login", data.login);
        document.location.reload();
    }
    setMsg(data)
    
}).catch(err => {
alert(err)
})
   
}

export default loginAttempt;