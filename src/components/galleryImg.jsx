import './post.scss'
import {backendLink}  from '../link.js'
import {escBtnListener} from './galleryPopUp.js'
import { useState , useEffect } from "react";

import { faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function fontAwesome(value,className) {
    return <FontAwesomeIcon className={className} icon={value} /> 
}


function GalleryImg(props) {

    const [imagesAreLoaded, setImagesAreLoaded] = useState(false);
    let src = backendLink +'/backend/galleryImages/'+ props.img.imgLink;
    
 
    useEffect(() => {
      const img = new Image()
      img.src = src
      img.onload = () => setImagesAreLoaded(true)
    }, [src])


    function PopUpSlider(imgSrc,index,id){
        escBtnListener(props.setPopUpState);
        props.setPopUpImgIndex(index);
        props.setPopUpState('block')
        props.setPopUpImg(imgSrc)
        props.setIdToDelete(id)
    }

    function ImgDeleteConfirmationWindow(id){
        document.getElementById("modalConfirmation").style.display= 'block'
        props.setSelectedPostId(id)
        props.setWhatToDelete('img')
    }
    return(
        <div className='galleryImgPiece'>

          
            <div style={{display: 'flex', alignItems: 'center', flex: '1'}}>
                <div className={imagesAreLoaded ? 'imgItself': 'imgLazyLoader'} 
                    onClick = {()=> PopUpSlider(props.img.imgLink, props.gg,props.img.id,props.img.imgName)}
                    style={imagesAreLoaded ? {backgroundImage:  'url("'+ backendLink +'/backend/galleryImages/'+ props.img.imgLink + '")'}: {}}  
                >
                
                </div>
            </div>
            <button className='galleryDeleteBtn' onClick={()=> ImgDeleteConfirmationWindow(props.img.id)}>
                {fontAwesome(faTrashCan ,'faTrashCan')} 
                DELETE
            </button>
        </div>
    )
}

export default GalleryImg;