import isLogedInServerCall from '../views/logedIn.js'
import React, {  useState, useEffect } from 'react';
import {backendLink} from '../link.js'
import '../views/css/admin.scss';
import { faPlus , faFloppyDisk ,faAngleDoubleUp , faCamera , faAngleDoubleDown} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function fontAwesome(value,className) {
    return <FontAwesomeIcon className={className} icon={value} /> 
}

function closeAddNewPostModal() {
    document.getElementById("addNewImg").style.display = 'none';
    document.removeEventListener("keydown", escapePressed);
}


function escapePressed(e) {
  var keyCode = e.keyCode;
  if(keyCode===27) {
    closeAddNewPostModal();
  }  
}

function addNewSection() {
    document.getElementById("selectOptions").style.display= 'none';
    document.getElementById("addNewSection").style.display= 'none';
    document.getElementById("newOptionWrapper").style.display= 'inherit';
    
}

function cancelBtn(setNewPartition) {
    setNewPartition(false)
    document.getElementById("selectOptions").style.display= 'block';
    document.getElementById("addNewSection").style.display= 'inherit';
    document.getElementById("newOptionWrapper").style.display= 'none';
}

function ModalAddImage(props) {
    const [fileSrc, setFileSrc] = useState('defaultAddImg.jpg');
    const [imgName, setImgName] = useState('');
    const [partition, setPartition] = useState(1);
    const [postImg, setPostImg] = useState(3);
    const [isLogedIn, setisLogedIn] = useState(false);
    const [newPartition, setNewPartition] = useState(false);
    const [msg, setMsg] = useState([]);
    const [toggleClass, setToggleClass] = useState('none');
    useEffect(() => {
        isLogedInServerCall(setisLogedIn);
        document.addEventListener("keydown", escapePressed);
    }, []);


    
    function imagePreview(event) {
        let file= URL.createObjectURL(event.target.files[0])
        setFileSrc(file)
    }


    function createNewPost() {
        //TO DO In CASE OF NOT SELECTED
        // if(!partition) {
        //     setPartition(1)
        // } 
        let formData = new FormData();
        if(newPartition) {     
            formData.append('imgCategory', newPartition);
            formData.append('newPartition', true);
        } else {
            formData.append('imgCategory', partition);
            formData.append('newPartition', false);
        }

        formData.append('imgName', imgName);
        formData.append('img', postImg);
        formData.append('token', sessionStorage.getItem("jwt"));
        formData.append('login', sessionStorage.getItem("login"));

        const requestOptions = {
            method: 'POST',
            mode: "cors",
            enctype: 'multipart/form-data',
            body: formData
        }
        let url = `${backendLink}/backend/addNewImg.php`;
    
        fetch(url,requestOptions)
        .then((response) => response.json())
        .then(data => {
            
            if(data.status === 200) {
                document.location.reload();
            } else {
                setMsg(data);
            }
            
        }).catch(err => {
        alert(err)
        })
    }
    return (
        <div id="addNewImg" className="addNewPostWrapper"> 
          {isLogedIn ? (
            <div className='newPost'>
                <span className='newPostCloseBtn' onClick={()=>closeAddNewPostModal()}>X</span>
                <h3 className='newPostHeaderMain'> {fontAwesome(faPlus,'newpostHeaderAwesome')} NEW IMAGE</h3>
                <p className='ErrorMsg'>{msg}</p>
               
                <div className='addImgWrapper'>
                    <div style={{flex: '5', display:'flex',flexDirection: 'column' , paddingRight: '10px'}}>   
                        <div  className='addPostImg' style={{backgroundImage: "url(" + fileSrc + ")"}}> </div>
                        <input id="fileItem" type={'file'}  onChange={(e)=>{setPostImg(e.target.files[0]); imagePreview(e)}}/>
                    </div> 
                    <div style={{flex: '7'}}> 
                      
                        <div className='addImgRighBarWrapper'>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <h3 className='ChooseOprionHeader'>CHOOSE OR ADD NEW SECTION :</h3>
                                <div >
                                    <button className='addNewSectionBtn' id='addNewSection' onClick={()=> addNewSection()}>ADD NEW SECTION +</button>
                                </div>
                            </div>
                            
                            <div style={{display: 'flex', flex: '1',width: '100%',alignItems: 'flex-start'}}>

                                    <div id="selectOptions"  className='customSelect' onClick={()=> toggleClass === 'none' ? setToggleClass("block") : setToggleClass('none')} style={{width:'100%'}}>
                                        <div className='selectContentWrapper'  >
                                        <p className='selectHeader'>{props.imgSections.find(x => Number(x.id) === Number(partition)).sectionName}</p>
                                            <p>{toggleClass === 'none' ? fontAwesome(faAngleDoubleDown,'selectArrowDown') : fontAwesome(faAngleDoubleUp,'selectArrowDown')}</p> 
                                        </div>
                                        <div className='optionsWrapperAddImg' style={{display: toggleClass}} >
                                            {props.imgSections.map((section, index) => { 
                                                if(Number(section.id) !== 0) {
                                                    return (
                                                        <p key={index} onClick={()=> setPartition(section.id)}>
                                                            {fontAwesome(faCamera,'optionAwesome')}
                                                            {section.sectionName}
                                                        </p>
                                                    )
                                                    }   else {
                                                        return ''
                                                    }
                                                
                                                })}
                                        </div>
                                    </div>
                                    <div id="newOptionWrapper" className='newOptionWrapper'>
                                        <input className='addNewOption'   type={'text'} placeholder={'New partition Name'} value={newPartition ? newPartition : ''}   onChange={(e)=> setNewPartition(e.target.value)}/>
                                        <button className='cancelBtnAddImg'  onClick={()=>cancelBtn(setNewPartition)}>Cancel</button> 
                                    </div>
                           </div>
                           <button className='addImgBtn' type={'submit'} onClick={()=> createNewPost()}>
                                SUBMIT  
                                {fontAwesome(faFloppyDisk,'addImgFloppyAwesome')}
                            </button>
                        </div>
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

export default ModalAddImage;