
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
import { makeStyles,withStyles } from "@material-ui/core";
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

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const UserViewPage = (props) => {



  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor:"#0D87B1",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  




  
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width:250
      
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







  const viewProductData = async () => {
   
     console.log(config.base_url);
     
     console.log("This is the base url",config.base_url);
      const res = await axios.get(config.base_url+'/user/view')

      .then(res =>{
          console.log('viewProductData - res: ', res);
          setProductData(res.data.data);

      }).catch(err =>{
          console.log(err)
      });
  }


   const deleteUserData = async () => {
    
     
    let userName = userData.userName;
   
        
   // const res = await axios.delete(`http://localhost:2000/product/delete?_id=${id}`)
   
    const res = await axios.delete(config.base_url+"/user/delete?userName="+userName)
         .then(res =>{
            console.log(res);
            viewProductData();
            setDeleteDialogue(false)
            setOpen(false);
            setSnackOpen(true)
            return res.data;
        
      }).catch(err =>{
           console.log(err)
       });

    
   }

  useEffect(() => {
    viewProductData();
  }, [])


 

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


   
 



////////////////////////////////////// FILTER FUNCATION ////////////////////////////////////

  const filter = async ()=>{

        const filterData = {};


        filterData.firstName= name;
        filterData.userName= userName;
        filterData.city = city;

        console.log("name ",name)
        console.log("User Name ",userName)
        console.log("city", city)

        const res = await axios.put(config.base_url+"/user/filter",filterData)
        .then(res =>{
          console.log("incoming filtered data ",res.data.data)
          if(res.data.code === -1){
            alert("Record Not Found")
            viewProductData();
          }else if(res.data.data.length === 0){
            alert("Record Not Found")
            viewProductData();
          }
          else{
            setProductData(res.data.data);
          }
          setName('');
          setUserName('')
          setCity('')
      }).catch(err =>{
          console.log(err)
      });
    
  }

//-------------------------------------------------------------------------------------------


  
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
             message="User Deleted Successfully"
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
            <Card ClassName="card text-center">
              <Card.Header  className="productsgallerybar" style={{backgroundColor:"#0D87B1"}}>
                <Card.Title  style={{marginBottom:"14px", textAlign:"center" ,fontSize:"25px",fontFamily:"Baufra",color:"white"}}  > Expenses</Card.Title>
                
                <div>  
            
                                    <Tooltip title="Search" aria-label="add">
                                    <Button className="FilterBtn" variant="contained" size="" style={{backgroundColor:"white",color:"#0D87B1"}}  onClick={handleClick}>
                                    <FilterListIcon></FilterListIcon>
                                    </Button>
                                      </Tooltip>
                                            
                                <Menu style={{justifyContent:"center"}}
                                  id="simple-menu"
                                  anchorEl={anchorEl}
                                  keepMounted
                                  open={Boolean(anchorEl)}
                                  onClose={handleClose}
                                  fullWidth
                                >
                                  
                                  <MenuItem  style={{justifyContent:"center", margin:"3px"}}>
                                                   
                                                <FormControl   fullWidth  className={classes.formControl}>
                                                    <TextField
                        
                                                  id="description"
                                                  label="Name"
                                                  placeholder="Enter Name" 
                                                  autoComplete="off"
                                                  value={name}
                                                  onChange={(e)=>setName(e.target.value)}
                                                  variant="standard"
                                                
                                          
                                                />
                                                </FormControl>        

                                             </MenuItem>



                                             <MenuItem style={{justifyContent:"center", margin:"3px"}} >
                                                    

                                               <FormControl   fullWidth  className={classes.formControl}>
                                                    <TextField
                        
                                                  id="description"
                                                  label="User Name"
                                                  placeholder="Enter username" 
                                                  autoComplete="off"
                                                  value={userName}
                                                  onChange={(e)=> setUserName(e.target.value)}
                                                  variant="standard"
                                                
                                          
                                                />
                                                </FormControl>





                                             </MenuItem>





                                                 
                                  
                                  <MenuItem style={{justifyContent:"center", margin:"3px"}} >
                                  <FormControl   fullWidth  className={classes.formControl}>
                                  <TextField
                
                                          id="description"
                                          label="City"
                                          placeholder="Enter city Name" 
                                          autoComplete="off"
                                          value={city} 
                                          onChange={(e)=>setCity(e.target.value)}
                                          variant="standard"
                                        
                                  
                                        />
                                  </FormControl>
                                  
                                  </MenuItem>
                                  
                                  <MenuItem  style={{justifyContent:"center",marginTop:"8px"}}>
                                   
                                  <Tooltip title="Apply Filter" aria-label="add">
                                   <Button onClick={filter}  variant="contained" size=""style={{backgroundColor:"#B68D40"}}  >
                                       <SearchIcon></SearchIcon>
                                        </Button>
                                         </Tooltip>
                                         </MenuItem>
                                </Menu>
                              </div>
                                                    

              </Card.Header>
              


             <br></br>
         
       
      


             
              <Card.Body className="all-icons" style={{marginTop:"40px" }}>


          



                <Row>





                <Col lg={5} md={5} sm={5} xs={5}>
                <Card>
                <Card.Header  className="productsgallerybar" style={{backgroundColor:"#0D87B1"}}>
                <Card.Title  style={{marginBottom:"14px", textAlign:"center" ,fontSize:"20px",fontFamily:"Baufra",color:"white"}}  > New Expense</Card.Title>
                </Card.Header>

                </Card>

                <Card.Body>

             
                      <TextField
                      // error= {nameError}
                      id="name"
                      label="Title"
                      placeholder="Title" 
                      autoComplete="off"
                      // helperText={nameError === true ? "Field Required" : ''}
                      // value={name} 
                      // onChange={(e)=> handleChange(e, setName, setNameError)}
                      variant="outlined"
                      fullWidth
              
                    />
                    <br></br>
                    <br></br>

                <TextField
                      // error= {nameError}
                      id="name"
                      label="Title"
                      placeholder="Title" 
                      autoComplete="off"
                      // helperText={nameError === true ? "Field Required" : ''}
                      // value={name} 
                      // onChange={(e)=> handleChange(e, setName, setNameError)}
                      variant="outlined"
                      fullWidth
              
                    />
                         <br></br>
                         <br></br>
                
                <TextField
                      // error= {nameError}
                      id="name"
                      label="Title"
                      placeholder="Title" 
                      autoComplete="off"
                      // helperText={nameError === true ? "Field Required" : ''}
                      // value={name} 
                      // onChange={(e)=> handleChange(e, setName, setNameError)}
                      variant="outlined"
                      fullWidth
              
                    />

                          <br></br>
                         <br></br>
                
                <TextField
                      // error= {nameError}
                      id="name"
                      label="Title"
                      placeholder="Title" 
                      autoComplete="off"
                      // helperText={nameError === true ? "Field Required" : ''}
                      // value={name} 
                      // onChange={(e)=> handleChange(e, setName, setNameError)}
                      variant="outlined"
                      fullWidth
              
                    />
                


                </Card.Body>
                
                </Col>




                <Col lg={4} md={4} sm={4} xs={4}>
                <Card>
                
                      
             <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Product Name</StyledTableCell>
                    <StyledTableCell align="left">Stock</StyledTableCell>
                    <StyledTableCell align="center">Cost</StyledTableCell>
                    <StyledTableCell align="center">Price</StyledTableCell>
                    <StyledTableCell align="center">Brand</StyledTableCell>
                    <StyledTableCell align="center">Category</StyledTableCell>
                    <StyledTableCell align="center">Subcategory</StyledTableCell>
                    <StyledTableCell align="center">Details</StyledTableCell>
                    <StyledTableCell align="center">Update</StyledTableCell>
                    <StyledTableCell align="center">Delete</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                   
                     {productData.length > 0 ? 
                      productData.map((IsItem, key) => (
                    <StyledTableRow key={key}>
                      <StyledTableCell  scope="row">
                        {(IsItem.name).toUpperCase()}
                      </StyledTableCell>
                      <StyledTableCell align="left">{IsItem.quantity }</StyledTableCell>
                      <StyledTableCell align="center">{IsItem.purchaseCost}</StyledTableCell>
                      <StyledTableCell align="center">{IsItem.salePrice}</StyledTableCell>
                      <StyledTableCell align="center">{IsItem.brand}</StyledTableCell>
                      <StyledTableCell align="center">{IsItem.category}</StyledTableCell>
                      <StyledTableCell align="center">{IsItem.subCategory}</StyledTableCell>
                      <StyledTableCell align="center">{
                        <IconButton aria-label="details" onClick={()=>productOpen(IsItem)} >
                        <DescriptionIcon  className ="deleteIconBlue"/>
                      </IconButton>}
                      </StyledTableCell>
                      <StyledTableCell align="center">{ 
                         <Link to={'/admin/updateproductnew/'+IsItem._id}>
                      <IconButton aria-label="Update" >
                        <UpdateIcon className="deleteIconBlue" />
                      </IconButton>
                      </Link>
                      }
                      </StyledTableCell>
                      <StyledTableCell align="center">{ 
                      <IconButton aria-label="action" onClick={()=>deleteProductData(IsItem)} >
                        <DeleteIcon className="deleteIconRed" />
                      </IconButton>}
                      </StyledTableCell>
                    </StyledTableRow>
                    
                
                     ))
                      : 
                    <strong>Data not Found</strong>
                      }
                </TableBody>
              </Table>
            </TableContainer>


                </Card>
                
                
                
                </Col>


                </Row>
              
             

                <Row >
                
                
                {
                productData?
                productData.length > 0 ? 
                 productData.map((IsItem, key) => (
                  
                  <Col  lg="2" md="3" sm="4" xs="6" onClick={()=>productOpen(IsItem)}>
                    <Card  > 
                    
                      <CardMedia className="itemCardImageDiv"  onClick={()=>productOpen(IsItem)}>

                      
                         <img  src={IsItem.profilePicture} alt="No image" className="img-fluid"  style={{height:"130px"}}/>
                        
                         </CardMedia>
                      {/* 
                      
                      <Carousel fade>

                      <Carousel.Item>
                       <div className="itemCardImageDiv">
                         <img src={ IsItem.image[0]} alt="pic1" className="img-fluid" />
                       </div>

                       </Carousel.Item>
                       <Carousel.Item>
                       <div className="itemCardImageDiv">
                         <img src={  IsItem.image[1]} alt="pic1" className="img-fluid" />
                       </div>
                       </Carousel.Item>
                       <Carousel.Item>
                       <div className="itemCardImageDiv">
                         <img src={  IsItem.image[2]} alt="pic1" className="img-fluid" />
                       </div>

                       </Carousel.Item>

                          </Carousel>
                      
                      
                      
                      */}  
                      


                      
                       
                       
                     
                    
                       <CardBody style={{marginTop:"-9px",backgroundColor:"#FBFCFC", minHeight:"80px"}}>
                       <h style={{fontFamily:"Georgia", fontWeight: "600",fontSize:"21",marginLeft:"-4px"}}>{IsItem.firstName} </h>
                       <h6 style={{color:"#2E86C1",fontWeight: "300",marginTop:"4px"}}> @  {IsItem.userName}     </h6>
                       
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

                      <Dialog  className="dialogeContent" open= {open} maxWidth={"md"} fullWidth={true} 
                      >
                
                      <DialogContent className="dialogeContent" styles={{backgroundColor:"black",paddingTop:"0px"}}>
                
                       <Card className="dialogeContent" style={{marginBottom:"0px"}}> 

                       <Row>
                          <Col lg="7" style={{padding:"0px",borderRadius:"5px",height:"300px"}}>
                          <Carousel controls={false} fade>
                          
                            <Carousel.Item style={{height:"600px"}}>
                              <img style={{height:"600px"}}
                                className="d-block w-100"
                                src={isItem.profilePicture}
                                alt="First slide"
                              />
                              <Carousel.Caption>
                                <h3>Asaan Kharidari</h3>
                                <p>Syed Rafay Javaid & Abdul Moiz</p>
                              </Carousel.Caption>
                            </Carousel.Item>
                          
                         
                           
                               </Carousel>
                          </Col>

                          <Col lg="5"  className="scrollableDiv2" style={{paddingLeft:"0px",backgroundColor:"black",borderRadius:"5px"}} >

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


                              <DialogTitle className="dialogHeading" style={{backgroundColor:"black"}}>
                              <h style={{textAlign:"center" ,fontSize:"25px",fontFamily:"Baufra",color:"white"}}> {isItem.userName ? (isItem.userName).toUpperCase(): "N/A"} </h>
                                  </DialogTitle>
                                        
                                          
                                 <Container className="" fullWidth style={{backgroundColor:"black",padding:"15px",marginTop:"0px", borderColor:"red"}}>
                                  <p style={{color:"white", textAlign:"center"}}>
                                      First Name: {isItem.firstName}
                                      <br></br>
                                      Last Name: {isItem.lastName}
                                       <br></br>
                                        
                                      
                                      Email:  {isItem.email}
                                     <br></br>
  
                                     Password: {isItem.password}
                                     <br></br>
                                     City : {isItem.city}
                                      <br></br>
                                      Phone:    {isItem.contactNumber}
                                        <br></br>
                              
                                       Created Date: {isItem.createdDate}
                                       <br></br>
                                       Last Modified: {isItem.lastModified? isItem.lastModified:"N/A"}
                                       
                                       <div className={classes.accordroot}>
                                                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                                      <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1bh-content"
                                                        id="panel1bh-header"
                                                      >
                                                        <Typography className={classes.heading}>Address</Typography>
                    
                                                      </AccordionSummary>
                                                      <AccordionDetails>
                                                        <Typography>
                                                          {isItem.address1}
                                                          {/* {isItem.address2} */}
                                                        </Typography>
                                                      </AccordionDetails>
                                                    </Accordion>
                                                    
                                                  </div>
                                      
                                  </p>
                                        
                                 {/*<h5 style={{color:"white"}}> Category Name: {isItem.category}</h5>
                                      
                                    <h5 style={{color:"white"}}>  Subcategory Name: {isItem.subCategory}</h5>
                                      
                                    
                                    <h5 style={{color:"white"}}>Quantity:   {isItem.quantity}</h5>
                        

                                    <h5 style={{color:"white"}} >Purchase Cost:   {isItem.purchaseCost}</h5>
                          
                                     <h5 style={{color:"white"}} > Sale Price: {isItem.salePrice}</h5>
                                
                                      <h5 style={{color:"white"}} >  Color:    {isItem.colour}</h5>
                                        
                                     <h5 style={{color:"white"}} >  Diamentions:     {isItem.dimention}</h5>
                                     
                                     <h5 style={{color:"white"}} > Created Date:     {isItem.createdDate}</h5>
                                      
              <h5 style={{color:"white"}} >  Last Modified:    {isItem.lastModified? isItem.lastModified:"N/A"}</h5>*/}
                                      
                               

                             </Container>
                                
                                <Container style={{backgroundColor:"black"}}>


                                <Row style={{paddingTop:"0px",paddingBottom:"16px"}}>
                          
                                  <Col lg="4"></Col>

                                  <Col lg ="4">
                                  <Tooltip title="Drop User" aria-label="add">
                                <Button className="deleteDialogueButton" style={{left:"20px"}} variant="contained" size="medium"   onClick={()=>deleteConfirm(isItem)}>
                                  <DeleteIcon className="deleteIconRed"></DeleteIcon>
                                </Button>
                                </Tooltip>
                                  </Col>


                                  <Col lg="2" >
                                    {/*
                                  <Link to={'/admin/updateproductnew/'+isItem._id}>
                                  <Tooltip title="Update Product" aria-label="add">
                                <Button  variant="contained" size="medium"   >
                                  <EditIcon className ="deleteIconBlue"></EditIcon>
                                </Button>
                                </Tooltip>
                                </Link>   
                                        */}
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
                       <h5>Note that Deleting user will permanently delete this user.Are you Sure you want to delete this user?</h5>
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

export default UserViewPage;




