import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight ,faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {backendImgLinkGallery} from '../link.js'
import './css/gallery.scss';
 
function fontAwesome(value,className) {
    return <FontAwesomeIcon className={className} icon={value} /> 
}

let url = `${backendImgLinkGallery}/galleryImages/`;

export function escBtnListener(setPopUpState) {
    function closePopUp(e){
        if(e.key === "Escape"){
            setPopUpState('none');
            document.removeEventListener('keydown', closePopUp );
        }
    }
    document.addEventListener('keydown', closePopUp);
}

export function nextImg(setPopUpImgIndex,popUpImgIndex,allImages,setPopUpImg,setIdToDelete) {
    
   
    let newIndex = popUpImgIndex + 1;
    if (newIndex > allImages.length - 1){
        newIndex = 0
        setPopUpImgIndex(0)
    } else {
        setPopUpImgIndex(newIndex)
    }
    setPopUpImgIndex(newIndex)
    setIdToDelete( allImages[newIndex].id)
    setPopUpImg( allImages[newIndex].imgLink)
}

export function prewImg(setPopUpImgIndex,popUpImgIndex,allImages,setPopUpImg,setIdToDelete) {
 
    let newIndex = popUpImgIndex - 1;
    if (newIndex < 0){
        newIndex = allImages.length - 1
        setPopUpImgIndex(newIndex)
    } else {
        setPopUpImgIndex(newIndex)
    }
    setPopUpImgIndex(newIndex)
    setIdToDelete( allImages[newIndex].id)
    setPopUpImg( allImages[newIndex].imgLink)
}

export default function PopUpItself(props){
    function ImgDeleteConfirmationWindow(id){
        document.getElementById("modalConfirmation").style.display= 'block'
        props.setSelectedPostId(id)
        props.setWhatToDelete('img')
    }
    return (
        <div className='PopUpWrapper' style={{display: props.popUpState}}>
            <div className='PopContentWrapper'>
                <div className='PopUpCancelBtn' onClick = {()=> props.setPopUpState('none')}> X </div>
                <div className='SliderWrapper'>
                    <div className='nextBtn'onClick = {()=> prewImg(props.setPopUpImgIndex,props.popUpImgIndex,props.allImages,props.setPopUpImg, 
                        props.setIdToDelete)}>
                        <FontAwesomeIcon className='faChevrons' icon={faChevronLeft} />
                    </div>
                        <div className='PopUpImg' style={{backgroundImage: 'url("'+ url + props.popUpImg +'")'}}></div>
                    <div  className='backBtn' onClick = {()=> nextImg(props.setPopUpImgIndex,props.popUpImgIndex,props.allImages,props.setPopUpImg,props.setIdToDelete)}>
                        <FontAwesomeIcon className='faChevrons' icon={faChevronRight} />
                    </div>
                </div>
                <button className='PopUpDeleteBtn'  onClick={()=> ImgDeleteConfirmationWindow(props.idToDelete)}>{fontAwesome(faTrashCan ,'faTrashCan')}DELETE</button>
            </div>
        </div>
    )
}