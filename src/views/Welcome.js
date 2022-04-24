import React from 'react'

import background from "assets/img/h.jpg"
import TextField from '@material-ui/core/TextField';
import { Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ButtonBase, Tooltip} from '@material-ui/core';
import axios from 'axios';


import { useHistory } from 'react-router-dom';

// react-bootstrap components
import {
  Badge,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  CardDeck,
  Alert
} from "react-bootstrap";
import { CardHeader, responsiveFontSizes } from "@material-ui/core";
import { Link } from "react-router-dom";
import { data } from 'jquery';
import Admin from 'layouts/Admin';
import config from 'config';
import { max } from 'date-fns';


const Welcome = () => {


    const [nameError, setNameError] = React.useState(false);
    const [name, setName] = React.useState('');

    const [passwordError, setPasswordError] = React.useState(false);
    const [password, setPassword] = React.useState('');

    const history = useHistory();



    const handleChange = (e, func, errorFunc) => {
        func(e.target.value);
        console.log(e.target.name,e.target.value)
          errorFunc(false)
      }


      //Validation Check After Button Click
      const handleClickOpen = () => {
        // Check if any field of Form is Empty
          if(name === '' || password=== ''){
              if(name == ''){
                  setNameError(true)
              }
              if(password === '')
              {
                setPasswordError(true)
              }
            
      }
      else{
        
        userLogin();

        
      }
      };
  



      const userLogin= async()=>{

         var adminData = {};

         adminData.userName = name;
         adminData.password = password;


         console.log("yes i am called and data going is:",adminData)


    await axios.post("http://localhost:3000/admin/login",adminData)
      .then(res =>{
          console.log(res);
          if(res.data.code === 0){
            //  alert("login Successful")
              localStorage.setItem("login", true);
              localStorage.setItem('userName',res.data.data.username)
              console.log("#########", localStorage.getItem("login"));
                history.push('/admin/dashboard');
            
          }
          else{
            alert("Admin account not found.Make sure userName and Password is correct")
            console.log("#########", localStorage.getItem("login"));
          }
       
      }).catch(err =>{
          console.log(err)
      });


      }





    function signup(){

        history.push("/signup")

    }


    return (

   <>
    <div  >
     

    

    <Card  style={{ maxWidth:"400px", borderRadius:"20px",margin:"100px auto",backgroundColor:"#FBFCFC" ,boxShadow:"0 0 10px"}}  >
    <Card.Header   style={{backgroundColor:"#D35400",color:"white",borderRadius:"20px"}}>
                <Card.Title  style={{borderRadius:"20px",marginBottom:"14px", textAlign:"center" ,fontSize:"25px",fontFamily:"Baufra",color:"white"}}  > ADMIN LOGIN   </Card.Title>
                </Card.Header>
   
    <Card.Body>

        <Row style={{backgroundColor:"white",justifyContent:"center",marginTop:"25px",background:"#FBFCFC"}}>

        <TextField
          error= {nameError}
          id="name"
          label="User Name"
          placeholder="Enter User Name" 
          autoComplete="off"
          color="warning"
          helperText={nameError === true ? "Enter UserName" : ''}
          value={name} 
          onChange={(e)=> handleChange(e, setName, setNameError)}
          variant="outlined"
  
   
        />


        </Row>

         <Row style={{backgroundColor:"white",justifyContent:"center",marginTop:"25px",background:"#FBFCFC"}}>

        <TextField
          error= {passwordError}
          id="name"
          type="password"
          label="Password"
          placeholder="Enter Password" 
          autoComplete="off"
          color="warning"
          helperText={passwordError === true ? "Enter Password" : ''}
          value={password} 
          onChange={(e)=> handleChange(e, setPassword, setPasswordError)}
          variant="outlined"
  
   
        />


        </Row>

        <br></br>

        <Row style={{justifyContent:"center",marginTop:"15px"}}>

        <Button variant="contained" style={{backgroundColor:"#D35400",color:"white",borderRadius:"10px",width:"200px"}} size ="large"onClick={handleClickOpen}> Login</Button>
        
        </Row>
        <br></br>
     
       

    
     
     
          
    </Card.Body>
    </Card> 
   

    </div> 
  
         
    </>
    
    )
}

export default Welcome
