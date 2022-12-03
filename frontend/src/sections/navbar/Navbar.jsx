import './navbar.css'
import Logo from '../../assets/logo.png';
import { data } from './data'
import { IoIosColorPalette } from 'react-icons/io'
import { GiHamburgerMenu } from 'react-icons/gi'
import { ImCross } from 'react-icons/im'
import { useModalContext } from '../../context/modal-context';
import { useState,useCallback } from 'react';
import {Link} from 'react-router-dom'
import { useContractContext } from '../../context/contractContext/contractContext';

import { useStorageContext } from '../../context/storageContext';
import { useEffect } from 'react';

const Navbar = () => {
<<<<<<< HEAD
  const {showModalHandler} = useModalContext();
  const [showLinks,setShowLinks] = useState(false)
  const [connect,setConnect] = useState('');
  const [navSm,setNavSm] = useState('');
  const {connectWallet,currentAccount} = useContractContext();
  const {userProfile,getUserProfile} = useStorageContext();

  const getInfo = useCallback(()=>{
    getUserProfile(currentAccount)
  },[currentAccount])
 console.log(typeof userProfile)
  useEffect(()=> {
    if(!currentAccount) return
    
    getInfo();
  },[currentAccount])
=======
  const { showModalHandler } = useModalContext();
  const [showLinks, setShowLinks] = useState(false)
  const [connect, setConnect] = useState('');
  const [navSm, setNavSm] = useState('');
  const { connectWallet, currentAccount } = useContractContext();
>>>>>>> 5a5fd109c7bd5fdde3c2e7da2d3f78404fb1f3ed

  const showLinksHandler = () => {
    setShowLinks(true);
    setNavSm('nav__menu-sm');
    setConnect('connect-sm');
  }
  const hideLinksHandler = () => {
    setShowLinks(false);
    setNavSm('hide');
    setConnect('hide');
  }

  return (
    <nav id='nav'>
      <div className="container nav__container"><a href="index.html" className='nav__logo'><img src={Logo} alt="Logo" /></a>

        <ul className={`nav__menu ${navSm}`}>
          {
<<<<<<< HEAD
            data.map(item=>(<li key={item.id}><a href={item.link} >{item.title}</a></li>))
            
          }
          {
            (userProfile !==undefined ) && <li><Link to='/profile' >Profile</Link></li>
          }

          {/* <li className={`connect ${connect} walcon`}> */}
              {
              
              !currentAccount &&   <li ><a className=" btn sm" href="#" onClick={()=>connectWallet()}>Connect Wallet</a></li>
            } 
            {
               !userProfile &&  <li ><a className=" btn sm" href="/register">Register</a></li>

            }
          {/* </li> */}

         </ul>
  
       {/* <ul className={`connect ${connect} walcon`}>
         
         
      </ul> */}
      <ul className='walcon'>
      { !currentAccount && <li className="light__red"></li>
      }{
        currentAccount && <li className="light__green"></li>
      }
      {
        currentAccount && <li className="connected " ><a className="connected btn sm" href='#'>{currentAccount}</a></li>
       }
      </ul>
     
      <button id='theme__icon' onClick={()=> showModalHandler()}><IoIosColorPalette/></button>
      {
        !showLinks && <div className="nav__icon" onClick={()=>showLinksHandler()}>
        <GiHamburgerMenu/>
    </div>
      }
      
      {
        showLinks &&  <div className="nav__close" onClick={()=>hideLinksHandler()}>
        <ImCross/>
    </div>
      }
     
=======
            data.map(item => <li key={item.id}><a href={item.link} >{item.title}</a></li>)
          }
        </ul>

        <ul className={`connect ${connect}`}>
          {

            !currentAccount && <li ><a className=" btn sm" href="#" onClick={() => { connectWallet() }}>Connect Wallet</a></li>
          }
          {
            !currentAccount && <li ><a className=" btn sm" href="#">Register</a></li>

          }

        </ul>
        <ul className='walcon'>
          {!currentAccount && <li className="light__red"></li>
          }{
            currentAccount && <li className="light__green"></li>
          }
          {
            currentAccount && <li className="connected "><a className="connected btn sm" href='#'>{currentAccount}</a></li>
          }
        </ul>

        <button id='theme__icon' onClick={() => showModalHandler()}><IoIosColorPalette /></button>
        {
          !showLinks && <div className="nav__icon" onClick={() => showLinksHandler()}>
            <GiHamburgerMenu />
          </div>
        }

        {
          showLinks && <div className="nav__close" onClick={() => hideLinksHandler()}>
            <ImCross />
          </div>
        }

>>>>>>> 5a5fd109c7bd5fdde3c2e7da2d3f78404fb1f3ed
      </div>
    </nav>
  )
}

export default Navbar