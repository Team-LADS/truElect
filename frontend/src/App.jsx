import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Theme from './theme/Theme';
import { useThemeContext } from './context/theme-context';
import Profile from './sections/profile/Profile';
// import Home from './sections/home/Home';
import Register from './sections/register/Register';
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Landing";

import {ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { useContractContext } from './context/contractContext/contractContext';


const App = () => {
const {themeState} = useThemeContext()


// const {check,getUserProfile,currentAccount} = useContractContext();


// const getBal = async()=>{
//   const resTx = await getUserProfile();
//   const res = await resTx.wait();
//   console.log('this sis res',res, currentAccount);
// }

// getBal();
  
  return (
    <main className={`${themeState.primary} ${themeState.background}`} >
      <Theme/>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/profile' element={<Profile/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route path="/dashboard" element={ <Dashboard /> } /> 
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </main>
  )
} 

export default App;