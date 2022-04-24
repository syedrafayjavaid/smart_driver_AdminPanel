import React from 'react'
import axios from 'axios'
import config from 'config'
import { useEffect } from 'react';
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
  import TextField from '@material-ui/core/TextField';
  import { Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ButtonBase, Tooltip} from '@material-ui/core';


const Profile = () => {


    const [open, setOpen] = React.useState(false);
    const [change, setChange] = React.useState(false);

    const [nameError, setNameError] = React.useState(false);
    const [name, setName] = React.useState('');

    const [passwordError, setPasswordError] = React.useState(false);
    const [password, setPassword] = React.useState('');

    const [userNameError, setUserNameError] = React.useState(false);
    const [userName, setUserName] = React.useState('');


    const [userNameError1, setUserNameError1] = React.useState(false);
    const [userName1, setUserName1] = React.useState('');

    const [passwordError1, setPasswordError1] = React.useState(false);
    const [password1, setPassword1] = React.useState('');

    const [emailError, setEmailError] = React.useState(false);
    const [email, setEmail] = React.useState('');



    const handleChange = (e, func, errorFunc) => {
        func(e.target.value);
        console.log(e.target.name,e.target.value)
          errorFunc(false)
      }

     //Validation Check After Button Click
     const handleClickOpen = () => {
        // Check if any field of Form is Empty
          if(name === '' || password=== '' || email=== '' || userName=== ''){
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
    

        updateProfile();

        
      }


      };


       //Validation Check After Button Click
     const handleClickOpen2 = () => {
        // Check if any field of Form is Empty
          if(password1=== '' || userName1=== ''){

              if(password1 === '')
              {
                setPasswordError1(true)
              }
              if(userName1 === '')
              {
                setUserNameError1(true)
              }
            
            
      }

      else{
    

        userLogin();

        
      }


      };








     function EditProfile () {

        setOpen(true);

     }
  
  

    
      /// fecthing Admin data

    const adminData = async ()=>{

        var username = localStorage.getItem("userName");
   
    await axios.get(config.base_url+"/admin/retrive")
    .then(res=>{

        setName(res.data.data.name);
        setUserName(res.data.data.userName);
        setEmail(res.data.data.email);
        setPassword(res.data.data.password);


    }).catch(err=>{

        console.log(err);

    });


    }


    // Updating Admin Profile

    const updateProfile = async ()=>{


        let data = {};

        data.userName = userName;
        data.name = name;
        data.email = email;
        data.password = password;



    await axios.put(config.base_url+'/admin/update',data)
    .then(res=>{

        if(res.data.code === 0){

            setChange(false);
        }

    }).catch(err=>{
        console.log(err)
    })



    } 



    // checking validation
    
    const userLogin= async()=>{

        var adminData = {};

        adminData.userName = userName1;
        adminData.password = password1;


   await axios.post(config.base_url+"/admin/login",adminData)
     .then(res =>{
         console.log(res);
         if(res.data.code ===0){
      
            setChange(true);
            setOpen(false);
           
         }
         else if(res.data.code === -1){
           alert("Admin account not found")
       
         }
          else if(res.data.code === 1){
           alert("Wrong Password")
          
         }
         else{
          alert("Opps system something went wrong")
         }
     }).catch(err =>{
         console.log(err)
     });


     }


   


       function handleClose(){

        setOpen(false);
        setUserNameError1(false);
        setPasswordError1(false);

       }


       useEffect(() => {
        adminData()
      }, [])




    return (
        <>
        
        <Card  style={{maxWidth:"700px",margin:"0 auto", boxShadow:"0 0 5px",borderRadius:"10px"}}>
              <Card.Header   style={{backgroundColor:"#D35400",borderRadius:"10px"}}>
                <Card.Title  style={{marginBottom:"14px", textAlign:"center" ,fontSize:"25px",fontFamily:"Baufra",color:"white"}}  > ADMIN PROFILE</Card.Title>
                
         </Card.Header>
         <Card.Body style={{height:"480px"}}>


     

        <Row style={{backgroundColor:"white",justifyContent:"center",marginTop:"25px"}}>

            <Col md="2" ></Col>
            <Col  md="8" >

            <TextField
            error= {nameError}
            disabled= {change===false?true:""}
            id="name"
            label="Name"
            placeholder="Name" 
            autoComplete="off"
            helperText={nameError === true ? "Enter Name" : ''}
            value={name} 
            onChange={(e)=> handleChange(e, setName, setNameError)}
            variant="outlined"
            fullWidth
  
   
             />
        
            </Col>
            <Col></Col>
        </Row>

        <Row style={{backgroundColor:"white",justifyContent:"center",marginTop:"25px"}}>

            <Col md="2" ></Col>
            <Col  md="8" >

            <TextField
            error= {userNameError}
            disabled= {change===false?true:""}
            id="name"
            label="User Name"
            placeholder="Enter User Name" 
            autoComplete="off"
            helperText={userNameError === true ? "Enter UserName" : ''}
            value={userName} 
            onChange={(e)=> handleChange(e, setUserName, setUserNameError)}
            variant="outlined"
            fullWidth
  
   
             />
        
            </Col>
            <Col></Col>
        </Row>

        <Row style={{backgroundColor:"white",justifyContent:"center",marginTop:"25px"}}>

            <Col md="2" ></Col>
                <Col  md="8" >

                <TextField
                error= {emailError}
                disabled= {change===false?true:""}
                id="name"
                label="Email"
                placeholder="Email" 
                autoComplete="off"
                helperText={emailError === true ? "Enter Email" : ''}
                value={email} 
                onChange={(e)=> handleChange(e, setEmail, setEmailError)}
                variant="outlined"
                fullWidth


                />

                </Col>
                <Col></Col>
                </Row>
 



        <Row style={{backgroundColor:"white",justifyContent:"center",marginTop:"25px"}}>

        <Col md="2" ></Col>
            <Col  md="8" >

            <TextField
            error= {passwordError}
            disabled= {change===false?true:""}
            id="name"
            label="Password"
            type={change===false?"password":""}
            placeholder="Password" 
            autoComplete="off"
            helperText={passwordError === true ? "Enter Password" : ''}
            value={password} 
            onChange={(e)=> handleChange(e, setPassword, setPasswordError)}
            variant="outlined"
            fullWidth
  
   
             />
        
            </Col>
            <Col></Col>
        </Row>


      

        <Row style={{backgroundColor:"white",justifyContent:"center",marginTop:"45px"}}>

        <Col md="4" ></Col>
        <Col md="4">

        {change===true?
        <Button variant="contained" style={{backgroundColor:"#D35400",color:"white"}} size ="large"onClick={handleClickOpen} fullWidth>Save Changes</Button>
        :
        <Button variant="contained" style={{backgroundColor:"#D35400",color:"white",borderRadius:"20px"}} size ="large"onClick={EditProfile} fullWidth>Edit Profile</Button>
        }
        </Col>
        <Col></Col>
        </Row>
        

        
        <Dialog maxWidth={"xs"} fullWidth
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                   
                >
                <DialogTitle className="dialogHeading" id="alert-dialog-title" style={{backgroundColor:"#D35400"}}>CONFIRMATION</DialogTitle>
                <DialogContent className="dialogDescription">
              
                  {/* <DialogContentText>

                   Change  Quantity  of product
                  
                  </DialogContentText> */}

                    <Row >
                      <Col lg="2" md="2" sm="2"></Col>
                    <Col lg="8" md="8" sm="8">
                    <TextField
                    error= {userNameError1}
                    id="name"
                    label="User Name"
                    placeholder="Enter User Name" 
                    autoComplete="off"
                    helperText={userNameError1 === true ? "Enter UserName" : ''}
                    value={userName1} 
                    onChange={(e)=> handleChange(e, setUserName1, setUserNameError1)}
                    variant="outlined"
                    fullWidth
  
   
                      />
                 
                    </Col>
                   </Row> 

                   
                   <Row style={{marginTop:"25px"}} >
                      <Col lg="2" md="2" sm="2"></Col>
                    <Col lg="8" md="8" sm="8">
                    <TextField
                    error= {passwordError1}
                    id="name"
                    label="Password"
                    placeholder="Enter Password" 
                    autoComplete="off"
                    helperText={passwordError1 === true ? "Enter Password" : ''}
                    value={password1} 
                    onChange={(e)=> handleChange(e, setPassword1, setPasswordError1)}
                    variant="outlined"
                    fullWidth
  
   
                      />
                 
                    </Col>
                   </Row> 
              
             
                </DialogContent>
                <br></br>
                <DialogActions style={{backgroundColor:""}}>
                 <Grid container justify="center" style={{textAlign:"center"}}>
                    <Grid item xs={6}>
                      <Button  onClick={handleClose} style={{color:"#D35400"}}>
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button  type="submit" onClick={handleClickOpen2} style={{ color:"#D35400"}}>
                            Submit
                        </Button>
                    
                    </Grid>
                 </Grid>
                </DialogActions>
            </Dialog>


       
     
     
          
   
  



         </Card.Body>
         </Card>
            
     
        </>
    )
}

export default Profile
