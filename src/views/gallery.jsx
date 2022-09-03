import React, {  useState, useEffect } from 'react';
import isLogedInServerCall from './logedIn.js'
import './css/admin.scss';
import ModalConfirmation from '../components/modalConfirmation.jsx'

import {backendLink , port,backendImgLinkGallery}  from '../link.js'
import ModalAddImg from '../components/addImgModal.jsx';
import PopUpItself from '../components/galleryPopUp.js';
import GalleryImg from '../components/galleryImg.jsx';

import { faAngleDoubleUp , faCamera , faAngleDoubleDown,faPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function fontAwesome(value,className) {
    return <FontAwesomeIcon className={className} icon={value} /> 
}
let backendUrl = `${backendImgLinkGallery}/getGalleryImages.php`;

function Gallery() {
    const [popUpState, setPopUpState] = useState('none');
    const [popUpImg, setPopUpImg] = useState('');
    const [popUpImgIndex, setPopUpImgIndex] = useState(0);
    const [idToDelete, setIdToDelete] = useState(-1);
    const [allImages, setAllImages] = useState([]);
    const [imgSections, setImgSections] = useState([]);
    const [selectedOption, setSelectedOption] = useState(0);
    const [selectedPostId, setSelectedPostId] = useState(0);
    const [whatToDelete, setWhatToDelete] = useState(false);
    const [isLogedIn, setisLogedIn] = useState(false);
    const [limit, setLimit] = useState(initialImgLimit());
    const [maxLimit, setMaxLimit] = useState(50);
    const currentImgSet = [];
    const [toggleClass, setToggleClass] = useState('none');
    let gg = 0;

    useEffect(() => {
        isLogedInServerCall(setisLogedIn);
    }, []);

    function initialImgLimit() {
        let howManyRows = Math.ceil(document.documentElement.scrollHeight / 100);
        let howManyItemsPerRow = 0;
        if(window.innerWidth > 1500) {
            howManyItemsPerRow = 4;
        } else if(window.innerWidth > 1300){
            howManyItemsPerRow = 3;
        } else {
            howManyItemsPerRow = 1;
        } 
        return howManyRows * howManyItemsPerRow;
    }

    function loadMorePosts() {
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 10 ) {
        if(limit < maxLimit) {
            //reDo DRY
            let howManyItemsPerRow = 0;
            if(window.innerWidth > 1500) {
                howManyItemsPerRow = 10;
            } else if(window.innerWidth > 1300){
                howManyItemsPerRow = 8;
            } else {
                howManyItemsPerRow = 3;
            } 
            setLimit(limit + howManyItemsPerRow);
            console.log('server call')
        }
        window.removeEventListener('scroll', loadMorePosts);
        
    }
}

    useEffect(() => {
        let formData = new FormData();
        formData.append('limit', limit);
        const requestOptions = {
            method: 'POST',
            mode: "cors",
            enctype: 'multipart/form-data',
            body: formData
        }
        fetch(backendUrl , requestOptions)
        .then(response => response.json())
        .then(data => 
            {
                setAllImages(data.galleryimages);
                setImgSections(data.imgSections);
                setMaxLimit(data.maxLimit);
            }
        );
        window.addEventListener('scroll',loadMorePosts);
        
    }, [limit]);
 
    return (
        <div>
        <ModalConfirmation id={selectedPostId} whatToDelete= {whatToDelete}/>
    <div id="GalleryWrapper" className="GalleryWrapper"> 
        {isLogedIn === true ? (
            <div>
                
                <PopUpItself
                    popUpState={popUpState} 
                    setPopUpState={setPopUpState}
                    popUpImg={popUpImg} 
                    setPopUpImg={setPopUpImg} 
                    popUpImgIndex={popUpImgIndex}  
                    setPopUpImgIndex={setPopUpImgIndex}
                    selectedOption={selectedOption}
                    allImages= {currentImgSet}
                    imgSections={imgSections}
                    idToDelete={idToDelete}
                    setIdToDelete={setIdToDelete}
                    setSelectedPostId={setSelectedPostId}
                    setWhatToDelete={setWhatToDelete}
                    
                />
                <ModalAddImg imgSections={imgSections} setImgSections={setImgSections}/>
                <button className='addNewImgBtn'  onClick={()=> document.getElementById("addNewImg").style.display= 'block' }>
                   ADD NEW IMG
                   {fontAwesome(faPlus,'faPlus')}
                </button>

                <div   className='customSelect' onClick={()=> toggleClass === 'none' ? setToggleClass("block") : setToggleClass('none')}>
                    <div className='selectContentWrapper'  >
                        <p className='selectHeader'>{selectedOption === 0 ? 'ALL' : imgSections.find(x => x.id === selectedOption).sectionName}</p>
                        <p>{toggleClass === 'none' ? fontAwesome(faAngleDoubleDown,'selectArrowDown') : fontAwesome(faAngleDoubleUp,'selectArrowDown')}</p> 
                    </div>
                    <div className='optionsWrapper' style={{display: toggleClass}} >
                        {imgSections.map((section, index) => { 
                            
                            if(allImages.find(x => Number(x.imgCategory) === Number(section.id) || Number(section.id) === 0) ) {
                                return (
                                    <p key={index} onClick={()=> setSelectedOption(section.id)}>
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


                <div style={{display: 'flex' , flexWrap: 'wrap'}} >
                    {allImages.map((img, index) => {   
                        if(Number(img.imgCategory) ===  Number(selectedOption)  || Number(selectedOption) === 0) {
                            currentImgSet.push(img);
                            gg++;

                            return (
                                <GalleryImg 
                                setPopUpImgIndex={setPopUpImgIndex}
                                setPopUpState={setPopUpState}
                                setPopUpImg={setPopUpImg}
                                gg={gg}
                                img={img}
                                key={index}
                                setIdToDelete={setIdToDelete}
                                setSelectedPostId={setSelectedPostId}
                                setWhatToDelete={setWhatToDelete}
                                />
                                )
                        } else {
                            return '';
                        }
                })}     
               </div>       
            </div>
        ) : ( 
        
        <div>
            You are not logged in<br></br>
            <a href={`${backendLink + port}`}>Log in Here</a>
        </div>
        ) }
    </div>
    </div>
    )
}

export default Gallery;