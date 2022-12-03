import Navbar from "../navbar/Navbar"
import Header from '../header/Header';
import Howitworks from "../howitworks/Howitworks";
import Footer from '../footer/Footer';
import { Fragment } from "react";
import Support from '../support/Support';
const Home = () => {
  return (
    <Fragment>
        <Navbar/>
        <Header/>
        <Howitworks/>
        <Support/>
        <Footer/> 
    </Fragment>
  )
}

export default Home