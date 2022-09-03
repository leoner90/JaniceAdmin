import './App.css';
import {Router2 } from './router/index'
import Navigation from './components/NavBar.jsx'
import React, {  useState, useEffect } from 'react';
import isLogedInServerCall from './views/logedIn.js'
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function fontAwesome(value,className) {
    return <FontAwesomeIcon className={className} icon={value} /> 
}

function App() {
  const [isLogedIn, setisLogedIn] = useState(false);
    useEffect(() => {
      isLogedInServerCall(setisLogedIn);
  }, []);
  return (
    <div className="App" style={{backgroundImage: "url('./mainBg.jpg')"}}>
   
      <div className='header'>
      {isLogedIn === true ? (
      <button className='logoutBtn2' onClick = {()=>
            {
                // sessionStorage.removeItem("jwt");
                // sessionStorage.removeItem("login");
                sessionStorage.clear();
                document.location.reload()
            }
        }
        >
           LOG OUT 
           {fontAwesome(faArrowRightFromBracket,'logOutAwesome')}
        </button>
      ) : (
        <span></span>
      )}
      </div>
      <div style={{display: 'flex', minHeight: '100vh'}}>
      <div className='navBarWrapper' style={{flex: 2}}>
      <img className='cmsLogo' src= "https://www.globalvoices.com/wp-content/uploads/2019/01/typo3.png" alt=""></img>
      
      {isLogedIn === true ? (
        <div>
        <Navigation /> 
        
        </div>
        ) :
        
        (<p />) }
      </div>
   
        <div className='routerContentWrapper' >< Router2/> </div>
      </div>
      
    </div> 
  );
}

export default App;
