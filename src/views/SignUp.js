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


const SignUp = () => {


    
    const [name, setName] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [nameError, setNameError] = React.useState(false);
    const [userNameError, setUserNameError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);
  

    const history = useHistory();



    const handleChange = (e, func, errorFunc) => {
        func(e.target.value);
        console.log(e.target.name,e.target.value)
          errorFunc(false)
      }


      //Validation Check After Button Click
      const handleClickOpen = () => {
        // Check if any field of Form is Empty
          if(name === '' || password=== ''||userName==''|| email==''){
              if(name == ''){
                  setNameError(true)
              }
              if(password === '')
              {
                setPasswordError(true)
              }
              if(userName === '')
              {
                setUserNameError(true)
              }
            
              if(email === '')
              {
                setEmailError(true)
              }
            
            
      }
      else{
        
        userSignUp();

        
      }
      };
  



      const userSignUp= async()=>{

         var adminData = {};

         adminData.name = name;
         adminData.username = userName;
         adminData.email = email;
         adminData.password = password;


    await axios.post(config.base_url+"/editor/signup",adminData)
      .then(res =>{
          console.log(res);
          if(res.data.sucess === true){

                history.push('/');
                
            
          }
          else{

            alert("Signup request fail try again");

          }
      }).catch(err =>{
          console.log(err)
      });


      }







    return (

   <>
    <Container fluid style={{ backgroundImage: `url(${background})`, backgroundSize:"cover",backgroundRepeat:"no-repeat",height:"100vh",width:"100vw"}}>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
     
 

    <Row className="justify-content-md-center">

    <Card className="card text-center " style={{minHeight:"360px",minWidth:"380px"}}  >
    <Card.Header  className="productsgallerybar" style={{backgroundColor:"#C0392B",color:"white"}}>
                <Card.Title  style={{marginBottom:"14px", textAlign:"center" ,fontSize:"25px",fontFamily:"Baufra",color:"white"}}  > SIGN UP   </Card.Title>
                </Card.Header>
   
    <Card.Body>

        <Row style={{backgroundColor:"white",justifyContent:"center",marginTop:"25px"}}>

        <TextField
          error= {nameError}
          id="name"
          label="Name"
          placeholder="Enter Name" 
          autoComplete="off"
          helperText={nameError === true ? "Enter Name" : ''}
          value={name} 
          onChange={(e)=> handleChange(e, setName, setNameError)}
          variant="outlined"
  
   
        />


        </Row>

        <Row style={{backgroundColor:"white",justifyContent:"center",marginTop:"25px"}}>

        <TextField
          error= {nameError}
          id="name"
          label="User Name"
          placeholder="Enter User Name" 
          autoComplete="off"
          helperText={userNameError === true ? "field required" : ''}
          value={userName} 
          onChange={(e)=> handleChange(e, setUserName, setUserNameError)}
          variant="outlined"


        />

        </Row>

        <Row style={{backgroundColor:"white",justifyContent:"center",marginTop:"25px"}}>

        <TextField
          error= {emailError}
          id="name"
          label="User Email"
          placeholder="Enter Email" 
          autoComplete="off"
          helperText={nameError === true ? "Filed required" : ''}
          value={email} 
          onChange={(e)=> handleChange(e, setEmail, setEmailError )}
          variant="outlined"


        />


         </Row>

         <Row style={{backgroundColor:"white",justifyContent:"center",marginTop:"25px"}}>

        <TextField
          error= {passwordError}
          id="name"
          type="password"
          label="Password"
          placeholder="Enter Password" 
          autoComplete="off"
          helperText={passwordError === true ? "Enter Password" : ''}
          value={password} 
          onChange={(e)=> handleChange(e, setPassword, setPasswordError)}
          variant="outlined"
  
   
        />


        </Row>


        <Row style={{justifyContent:"center",marginTop:"30px",marginBottom:"20px"}}>

        <Button variant="contained" style={{backgroundColor:"#C0392B",color:"white"}} size ="large"onClick={handleClickOpen}>SIGN UP</Button>
        </Row>

    
     
     
          
    </Card.Body>
    </Card> 
    

     </Row>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
     <br></br>

    </Container> 
  
         
    </>
    
    )
}

export default SignUp;
