
import React, { Component } from "react";
import { Navbar} from "react-bootstrap";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import {
  Badge,
  Card,
  Form,

  Nav,
  Container,
  Row,
  Col,
  CardDeck,
  Alert
} from "react-bootstrap";



function Header() {


  const history = useHistory(); 



  function onClickLogout(){

    localStorage.setItem("login",false)
    localStorage.setItem("userName",'')
    history.push('/')

  }


  
  return (

    <>
  
    <Navbar expand="lg" variant="light" style={{backgroundColor:"white",height:"60px",fontFamily:"Baufra"}}className='m-auto'>
    <Navbar.Brand  className='m-auto' style={{color:"#D35400"}} ><span>SMART DRIVER</span></Navbar.Brand>

      
      <Button variant="contained" style={{backgroundColor:"#D35400",color:"white"}} onClick={onClickLogout}>logout</Button>
    
  
  

  </Navbar>
 
  </>
  
      
  );
}

export default Header;
