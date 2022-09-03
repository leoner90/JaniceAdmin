import React, {  useState, useEffect } from 'react';
import isLogedInServerCall from './logedIn.js'
import './css/admin.scss';
import Post from '../components/Post.jsx'
import {backendLink , port}  from '../link.js'
import ModalConfirmation from '../components/modalConfirmation.jsx'
import ModalEdit from '../components/modalEdit.jsx'
import ModalAddPost from '../components/modalWindowAddPost.jsx';
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function fontAwesome(value,className) {
    return <FontAwesomeIcon className={className} icon={value} /> 
}

function AdminPage() {
    const [allPosts, setAllPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(0);
    const [whatToDelete, setWhatToDelete] = useState(false);
    const [editPostData, setEditPostData] = useState(0);
    const [isLogedIn, setisLogedIn] = useState(false);
    const [limit, setLimit] = useState(Math.ceil(document.documentElement.scrollHeight / 150));
    const [maxLimit, setMaxLimit] = useState(0);
    useEffect(() => {
        isLogedInServerCall(setisLogedIn);
    }, []);

    function onScroll() { 
        if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 10 && limit < maxLimit ) {
            setLimit(limit + 1);
            window.removeEventListener('scroll', onScroll); 
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
            fetch(`${backendLink}/backend/posts.php` , requestOptions)
            .then(response => response.json())
            .then(data => 
                {
                    setMaxLimit(data.maxLimit);
                    setAllPosts(data.posts);
                   
                }
            );
            
            window.addEventListener('scroll',onScroll);
            
        }, [limit,maxLimit]);



    // useEffect(() => {
    //   fetch(`${backendLink}/backend/posts.php`)
    //   .then(response => response.json())
    //   .then(data => setAllPosts(data.posts.reverse())
    //   );
    // }, []);




    return (
    <div className="adminLoginPageWrapper"> 
        {isLogedIn === true ? (
            <div>
                <ModalAddPost />
                <ModalConfirmation id={selectedPostId} whatToDelete= {whatToDelete}/>
                <ModalEdit editPostData={editPostData}/>
                <button className='addNewPost' onClick={()=> document.getElementById("addNewPostWrapper").style.display= 'block' }>
                    ADD NEW POST 
                    {fontAwesome(faPlus,'faPlus')}
                </button>
                {allPosts.map((post, index) => {
                    return (
                        <Post 
                            key = {index}
                            id= {post.id}
                            author= {post.user} 
                            date={post.createdAt} 
                            img={post.imgLink} 
                            header={post.header} 
                            body= {post.body}
                            setSelectedPostId={setSelectedPostId}
                            setEditPostData={setEditPostData}
                            setWhatToDelete={setWhatToDelete}
                            />
            
                    )
                })}             
            </div>
        ) : ( 
        
        <div>
            {/* {window.location = 'http://admin.localhost:3000'} */}
            You are not logged in<br></br>
            {/* :3000 fo localhost */}
            <a href={`${backendLink + port}`}>Log in Here</a>
        </div>
        ) }
    </div>
    )
}

export default AdminPage;