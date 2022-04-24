
import { Card,  CardTitle, Container, Row, Col } from "react-bootstrap";
import { CardBody } from "reactstrap";
import React, {useState, useEffect} from 'react';

import {Grid, CardActions, Fab, CardMedia,} from "@material-ui/core";
import {Add,} from "@material-ui/icons";
import axios from 'axios';
import { Carousel } from "react-bootstrap";

import addProduct from "components/AddProduct";
import CancelIcon from '@material-ui/icons/Cancel';
import {Link, useHistory} from "react-router-dom";
import config from 'config';
import { IconButton } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { Dialog,DialogActions, DialogContent, DialogContentText, DialogTitle,FormControlLabel } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Tooltip } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Menu } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { FormControl,InputLabel,Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterListIcon from '@material-ui/icons/FilterList';
import { event } from "jquery";
import avatar from "assets/img/userAvatar.png";
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import Snackbar from '@material-ui/core/Snackbar';
import userAvatar from "assets/img/userAvatar.png"
import WarningIcon from '@material-ui/icons/Warning';
import BlockIcon from '@material-ui/icons/Block';
import CheckIcon from '@material-ui/icons/Check';


const Drivers = (props) => {


    
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      
      },
    },
    input: {
      display: 'none',
    },

    accordroot: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    


    
  }));

;



  const classes = useStyles();
  const history = useHistory();

  const [productData, setProductData] = useState({}); 

  

  const [open, setOpen] = useState(''); 
  const [isItem , setIsItem] =  useState("no name");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [expanded, setExpanded] = React.useState(false);

  const [name, setName]= React.useState('');

  const [userName,setUserName ] = React.useState('');
  const [snackOpen, setSnackOpen] = React.useState(false);

  const[city, setCity] = React.useState('');

  const [deleteDialogue, setDeleteDialogue] = React.useState(false);

  const [categoryData, setCategoryData] = React.useState({}); 
  const [subcategoryData, setSubcategoryData] = useState({}); 

  const[userData, SetUserData] = React.useState('');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const deleteDialogueClose =()=>{
    setDeleteDialogue(false)
  }
  




  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
   
  };






  /// FETCHING ALL DRIVERS DATA

  const viewProductData = async () => {
    
      await axios.get(config.base_url+'/admin/retriveDrivers')
      .then(res =>{
          console.log('viewProductData - res: ', res);
          setProductData(res.data.data);

      }).catch(err =>{
          console.log(err)
      });
  }




  const block= async(isItem) =>{

      let data = {};

      const userName = isItem.userName;
      const status = "blocked"
      data.userName = userName
      data.status = status
      await axios.post(config.base_url+'/admin/driverAction',data)
      .then(res =>{

          if(res.data.code===0){

            alert("Driver Blocked")
            setOpen(false)

          }
         

      }).catch(err =>{
          console.log(err)
      });



  }

  const approve= async(isItem) =>{

    let data = {};

    const userName = isItem.userName;
    const status = "approved"
    data.userName = userName
    data.status = status
    await axios.post(config.base_url+'/admin/driverAction',data)
    .then(res =>{

        if(res.data.code===0){

          alert("Driver Approved")
          setOpen(false)

        }
       

    }).catch(err =>{
        console.log(err)
    });



}



   const deleteUserData = async () => {
    
    let userID = {};
     
    userID.id = userData._id;
   
    console.log("incoming id",userID.id)
        
   // const res = await axios.delete(`http://localhost:2000/product/delete?_id=${id}`)
   
    const res = await axios.post(config.base_url+"/admin/deleteeditor",userID)
         .then(res =>{
          
            console.log(res);
            if(res.data.sucess){

              viewProductData();
              setDeleteDialogue(false)
              setOpen(false);
              setSnackOpen(true)
              return res.data;

            }
           
        
      }).catch(err =>{
           console.log(err)
       });

    
   }

  useEffect(() => {
    viewProductData();
  }, [block])


 

  const productOpen = (IsItem)=>{

      setOpen(true);
      setIsItem(IsItem);

    

  }

  const closeDialog = ()=>{

    setOpen(false);
  }

  const deleteConfirm = (IsItem) =>{

    SetUserData(IsItem)
    setDeleteDialogue(true)

 }


   
 


  
  return (
    <>
      <Container fluid >
        <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
             horizontal: 'right',
             }}
             open={snackOpen}
             autoHideDuration={6000}
             onClose={handleClose2}
             message="Editor Deleted Successfully"
             action={
               <React.Fragment>
                 <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose2}>
                   <CloseIcon fontSize="small" />
                 </IconButton>
               </React.Fragment>
             }
           />
         </div>

        
        <Row>
          <Col md="12">
            <Card ClassName="card text-center" style={{boxShadow:"0 0 10px"}}>
              <Card.Header  className="productsgallerybar" style={{backgroundColor:"#D35400"}}>
                <Card.Title  style={{marginBottom:"14px", textAlign:"center" ,fontSize:"25px",fontFamily:"Baufra",color:"white"}}  > DRIVERS   </Card.Title>
                        

              </Card.Header>
              
              


             
              <Card.Body className="all-icons" style={{marginTop:"20px",padding:"40px" }}>
              
             

                <Row >
                  
                
                
                {
                productData?
                productData.length > 0 ? 
                 productData.map((IsItem, key) => (
                  
                  <Col  lg="2" md="3" sm="4" xs="6" onClick={()=>productOpen(IsItem)}>
                    <Card className="itemCardDiv"  style={{backgroundColor:"#E59866",borderRadius:"10px"}}> 
                    
                      <CardMedia className="itemCardImageDiv"  onClick={()=>productOpen(IsItem)}>

                      
                         <img  src={IsItem.profilePicture?config.base_url+IsItem.profilePicture:userAvatar} alt="no image" className="img-fluid"  style={{height:"130px"}}/>
                        
                         </CardMedia>
                   


                      
        
                    
                       <CardBody style={{marginTop:"-9px",backgroundColor:"#E59866", minHeight:"80px",borderRadius:"10px",textAlign:"center"}}>
                       <h style={{fontFamily:"Georgia", fontWeight: "600",fontSize:"21",marginLeft:"-4px",textAlign:"center",color:""}}>{IsItem.firstName} </h>
                       <h6 style={{color:"#784212",fontWeight: "300",marginTop:"4px"}}> @ {IsItem.userName}     </h6>
                       
                       </CardBody>
                    
                     </Card>
                   </Col>

                 

                     
                  ))
                 : 
                <strong>Loading Page Please Wait</strong>
                :
                "Data not Found"
               }

                 
                </Row>
                 
          
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

                      <Dialog  className="dialogeContent"  open= {open} maxWidth={"md"} fullWidth={true} 
                      >
                
                      <DialogContent className="dialogeContent" styles={{backgroundColor:"#D35400",paddingTop:"0px"}}>
                
                       <Card className="dialogeContent" style={{marginBottom:"0px"}}> 

                       <Row>
                          <Col lg="7" style={{padding:"0px",borderRadius:"5px",height:"300px"}}>
                          <Carousel controls={false} fade>
                          
                            <Carousel.Item style={{height:"600px"}}>
                              <img style={{height:"600px"}}
                                className="d-block w-100"
                                src={isItem.profilePicture?config.base_url+isItem.profilePicture:userAvatar}
                                alt="First slide"
                              />
                              <Carousel.Caption>
                           
                              </Carousel.Caption>
                            </Carousel.Item>
                          
                         
                           
                               </Carousel>
                          </Col>

                          <Col lg="5"  className="scrollableDiv2" style={{paddingLeft:"0px",backgroundColor:"#D35400",borderRadius:"5px"}} >

                            <Row>
                            <Col lg="8">
                              
                            </Col>
                          <Col lg="2">
                          <Tooltip title="Close Window" aria-label="add" style={{left:"51px",top:"8px"}}>
                                <Button variant="contained" size="small" color="secondary" onClick={closeDialog}>
                                  <CloseIcon></CloseIcon>
                                </Button>
                                </Tooltip>


                          </Col>
                          
                              </Row>


                              <DialogTitle className="dialogHeading" style={{backgroundColor:"#D35400"}}>
                              <h style={{textAlign:"center" ,fontSize:"25px",fontFamily:"Baufra",color:"white"}}> {isItem.userName ? (isItem.userName): "N/A"} </h>
                                  </DialogTitle>
                                        
                                          
                                 <Container className="" fullWidth style={{backgroundColor:"D35400",padding:"15px",marginTop:"-10px", borderColor:"red"}}>
                                  <p style={{color:"white", textAlign:"center",fontFamily:"Baufra",fontSize:"20px"}}>
                                       Name: {isItem.firstName}
                                      <br></br>
                                      Password: {isItem.password}
                                     <br></br>
             
                                      Email:  {isItem.email}
                                     <br></br>
                  
                                     License:{isItem.licenseNumber}
                                     <br></br>
                                     Cnic:{isItem.cnic}
                                     <br></br>
                                     contactNumber:{isItem.contactNumber}
                                     <br></br>
                                     age:{isItem.age}
                                     <br></br>
                                     Salary:{isItem.expectedSalary}
                                     <br></br>
                                    
                                     
                 
                                     status:{isItem.status}
                                                                
                                      
                                  </p>
                                        
                              

                             </Container>
                                
                                <Container style={{backgroundColor:"#d35400"}}>


                                <Row style={{paddingTop:"0px",paddingBottom:"16px"}}>
                          
                                  <Col lg="2"></Col>

                                  <Col lg ="4">
                                  <Tooltip title="Approve Driver" aria-label="add">
                                <Button  style={{left:"20px",backgroundColor:"#D35400"}} variant="contained" size="medium"  disabled={isItem.status==="approved"?true:false} onClick={()=>approve(isItem)}>
                                  
                                  <CheckIcon className="iconGreen"></CheckIcon>
                                </Button>
                                </Tooltip>
                                  </Col>


                                  <Col lg="2" >
                                  
                                  <Tooltip title="Block Driver" aria-label="add">
                                <Button  variant="contained" style={{backgroundColor:"#D35400"}} disabled={isItem.status==="blocked"?true:false} onClick={()=>block(isItem)} size="medium">
                                  <BlockIcon className="deleteIconRed"></BlockIcon>
                                </Button>
                                </Tooltip>
                         
                                       
                                  </Col>
                              
                                </Row>

                                </Container>
                                             
                          </Col>
                         
                       </Row>
                      

                 </Card>
                        
                       </DialogContent>

                  
                </Dialog>

                 
            <Dialog
                    open={deleteDialogue}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                <DialogTitle style={{backgroundColor:"red"}} className="dialogHeading" id="alert-dialog-title">CONFIRM</DialogTitle>
                <DialogContent className="dialogDescription">
                <DialogContentText id="alert-dialog-description">
                  <Grid container>
                    <Grid item xs={2}>
                       <ReportProblemIcon style={{color:"red"}}fontSize="large" className="dialogIcon" />
                    </Grid>
                    <Grid item xs={10}>
                       <h5>Note that Deleting user will permanently delete this Editor.Are you Sure you want to delete this Editor?</h5>
                    </Grid>
                  </Grid>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                 <Grid container justify="center" style={{textAlign:"center"}}>
                    <Grid item xs={6}>
                      <Button onClick={deleteDialogueClose} style={{color:"red"}}>
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      {/* <Link to={'/admin/viewproduct'}> */}
                        <button type="submit"  onClick={deleteUserData} style={{outline:"none", background:"none", border:"none", color:"red"}}>
                            confirm
                        </button>
                      {/* </Link> */}
                    </Grid>
                 </Grid>
                </DialogActions>
            </Dialog>









    </>
  );


    
};

export default Drivers;




