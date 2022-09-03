import './post.scss'
import {backendLink} from '../link.js'

function confirmationWindow(props){
    document.getElementById("modalConfirmation").style.display= 'block'
    props.setSelectedPostId(props.id)
    props.setWhatToDelete('post')
}

function editWindow(props){
    document.getElementById("modalEdit").style.display= 'block'
    props.setEditPostData(props)
}



function Post(props) {
   let ImgStyle =  {backgroundImage: `url("${backendLink}/backend/uploads/${props.img}")`}
    return(
        <div className="PostWrapper">
           
            <div className='blogTextWrapper'>
                <div  className="PostImage" style={ImgStyle}></div>
                <div className='postContentWrap'>
                    <h1 className='PostHeader'>
                        {props.header}
                    </h1>
                    <div className='PostBody'>
                        {props.body}
                    </div>
                </div>
                <div>
                    <div><p>Date:</p> {props.date}</div>
                </div>
                <div>
                    <div><p>Author:</p> {props.author}</div>
                </div>
                <div  >
                   <button className='editPost'  onClick={()=> editWindow(props) }>EDIT</button>
                   <button className='deletePost' onClick={()=> confirmationWindow(props) }>DELETE</button>
                </div>
            </div>
        </div>
    )
}

export default Post;