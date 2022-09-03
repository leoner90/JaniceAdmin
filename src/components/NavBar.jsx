import './css/navBar.scss'; 
import { NavLink } from 'react-router-dom'
  // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {faCircleDot } from '@fortawesome/free-solid-svg-icons'

function NavBar () {
    return (
        <div>
            <div className='NavBar' >
                <NavLink 
                    
                    to={`${process.env.PUBLIC_URL}/allPosts`}  >POSTS
                </NavLink>
                <NavLink 
                    to={`${process.env.PUBLIC_URL}/gallery`} >GALLERY 
                </NavLink>
            
            </div>
         
        </div>
  
    )
}

export default NavBar;