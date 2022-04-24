

import { Card,  CardTitle, Container, Row, Col } from "react-bootstrap";
import { CardBody } from "reactstrap";
import React, {useState, useEffect} from 'react';

import {Grid, CardActions, Fab, CardMedia,} from "@material-ui/core";
import {Add, Label,} from "@material-ui/icons";
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
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SearchIcon from '@material-ui/icons/Search';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterListIcon from '@material-ui/icons/FilterList';
import Snackbar from '@material-ui/core/Snackbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DescriptionIcon from '@material-ui/icons/Description';
import DetailsIcon from '@material-ui/icons/Details';


import UpdateIcon from '@material-ui/icons/Update';

import Slider from '@material-ui/core/Slider';

import { event } from "jquery";








const Posts = () => {


    

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor:"#C0392B",
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

;



  const classes = useStyles();
  const history = useHistory();

  const [productData, setProductData] = useState({}); 
  const [filteredData, setFilteredData] = useState({}); 
  

  const [open, setOpen] = useState(false); 
  const [open2, setOpen2] = useState(false); 
  const [open3, setOpen3] = useState(false); 
  const [updateId , setUpdateId] =  useState('');

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [expanded, setExpanded] = React.useState(false);

  const [category, setCategory ]= React.useState('');
  const [subcategory,setSubcategory ] = React.useState('');
  

  const[productName, setProductName] = React.useState('');
  const[color, setColor] = React.useState('');

  const [categoryData, setCategoryData] = React.useState({}); 
  const [subcategoryData, setSubcategoryData] = useState({}); 

  const [snackOpen, setSnackOpen] = React.useState(false);
  const [snackOpen2, setSnackOpen2] = React.useState(false);
  const [snackOpen3, setSnackOpen3] = React.useState(false);



  const [titleError, setTitleError] = React.useState(false);
  const [detailError, setDetailError] = React.useState(false);
  const [costError, setcostError] = React.useState(false);
  const [desError, setdesError] = React.useState(false);
  const [modelImage, setModelImage] = React.useState('');

  // Setting States 
    
  const [uuid, setuuid ]= React.useState('');
  const [title, setTitle ]= React.useState('');
  const [detail, setDetail] = React.useState('');
  const [pcost, setPcost] = React.useState('');
  const [des, setdes] = React.useState('');
  const dat =  new Date().toISOString().split('T')[0]
  const [date, setDate] = React.useState(dat);

  const [value, setValue] = React.useState([0, 500000]);

  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleField = (e, func, errorFunc) => {
    func(e.target.value);
    console.log(e.target.name,e.target.value)
      errorFunc(false)
  }






 // add Post

  const postExpense = async () => {




          if(title === '' || detail === '' || des === ''|| modelImage === ''){

                  if(title == ''){
                      setTitleError(true)
                  }
                  if(detail === '')
                  {
                    setDetailError(true)
                  }
                  if(des ===''){
                    setdesError(true)
                  }
                  if(modelImage==''){

                    alert("Please Upload Image")
                  }
              
          


            }

            else{


                let expenseData = {};

             

                expenseData.title= title;
                expenseData.tags= detail;
                expenseData.body = des;
                expenseData.author = localStorage.getItem("userName");
                expenseData.image = "imageURl";
          
                

                

                  await axios.post(config.base_url+'/createarticle',expenseData)

                .then(res =>{
                    console.log("expense add response:",res.data.result)
                    setOpen(false)
                    setSnackOpen(true)
                    viewProductData()
                    setTitle('')
                    setDetail('')
                    setdes('')
                
                    

                }).catch(err =>{
                    console.log(err)
                    alert("sorry we couldn't add Post  ,try later later")
                });




            }



  }






  /// view post

  const viewPost = async (IsItem) =>{

          
    setuuid(IsItem.uuid)
    setTitle(IsItem.title)
    setDetail(IsItem.tags)
    setdes(IsItem.body)
    setOpen3(true)

}













  /// update post

  const expenseUpdate = async (IsItem) =>{

          
            setuuid(IsItem.uuid)
            setTitle(IsItem.title)
            setDetail(IsItem.tags)
            setdes(IsItem.body)
            setOpen2(true)

  }


  const Update = async () =>{


        

            let updateData= {};

            updateData.uuid = uuid;
            updateData.title= title;
            updateData.tags= detail;
            updateData.body = des;
            updateData.author = localStorage.getItem("userName");
            updateData.image = "imageURl";
      
            
            const res = await axios.post(config.base_url+"/updatearticle",updateData)
                .then(res =>{
                    console.log(res);
                    viewProductData();
                    setOpen2(false);
                    setSnackOpen3(true)
                    setTitle('')
                    setDetail('')
                    setPcost('')
              

                
                
            }).catch(err =>{
                console.log(err)
                alert("Oops we ran into a problem User details were not updated")
            });





  }



  


/// getting Post data

  const viewProductData = async () => {
   
    
    let username = localStorage.getItem("userName")

    // console.log("user name is",username);


      const res = await axios.get(config.base_url+"/getarticle/"+username)

      .then(res =>{
          setProductData(res.data.data);

      }).catch(err =>{
          console.log(err)
      });
  }





  //Delete Post 

   const deleteProductData = async (IsItem) => {
    
                let id = IsItem.uuid;
              
                    
            
                const res = await axios.get(config.base_url+"/deletearticle/"+id)
                    .then(res =>{
                        console.log(res);
                        viewProductData();
                        setSnackOpen2(true)
                    
                    
                }).catch(err =>{
                    console.log(err)
                });

    
   }





   
    const handleModelImage = event => {
        setModelImage(event.target.files);
    };







  useEffect(() => {
    viewProductData();
   
  }, [])


 

  const productOpen = (IsItem)=>{

      setOpen(true);
      setIsItem(IsItem);

    

  }



  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false)
    setSnackOpen2(false)
    setSnackOpen3(false)

  };


  const handleDate = (e,func) => {
    console.log(e.target.value)
    func(e.target.value)
};




  const closeDialog = ()=>{


    setOpen(false)
    setOpen2(false)
    setOpen3(false)
    setTitle('')
    setDetail('')
    setdes('')
    setPcost('')
    setDate(date)
    
  }











    return (
       <>

<Container fluid >


<Fab className="addBtnFloat"  onClick={()=>setOpen(true)} variant="extended" style={{backgroundColor:"#C0392B"}} aria-label="Add" size="large" >
 
      <Add />
      New Post
    
  </Fab>

  <div>
   <Snackbar
   style={{backgroundColor:"red"}}
    anchorOrigin={{
      vertical: 'bottom',
       horizontal: 'left',
       }}
       open={snackOpen}
       autoHideDuration={6000}
       onClose={handleClose2}
       message="Post Added Successfully"
       action={
         <React.Fragment>
           <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose2}>
             <CloseIcon fontSize="small" />
           </IconButton>
         </React.Fragment>
       }
     />
   </div>
   
   <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
       horizontal: 'left',
       }}
       open={snackOpen2}
       autoHideDuration={1000}
       onClose={handleClose2}
       message="Post Deletd Successfully"
       action={
         <React.Fragment>
           <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose2}>
             <CloseIcon fontSize="small" />
           </IconButton>
         </React.Fragment>
       }
     />

<Snackbar
    anchorOrigin={{
      vertical: 'bottom',
       horizontal: 'left',
       }}
       open={snackOpen3}
       autoHideDuration={1000}
       onClose={handleClose2}
       message="Post Record Updated Successfully"
       action={
         <React.Fragment>
           <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose2}>
             <CloseIcon fontSize="small" />
           </IconButton>
         </React.Fragment>
       }
     />
   

  
  <Row>
    <Col md="12">
      <Card ClassName="card text-center">
        <Card.Header  className="productsgallerybar" style={{backgroundColor:"#F39C12"}}>
          <Card.Title  style={{marginBottom:"14px", textAlign:"center" ,fontSize:"25px",fontFamily:"Baufra",color:"white"}}  > MY POSTS</Card.Title>
          
         

        </Card.Header>
        
        


       
        <Card.Body className="all-icons" style={{marginTop:"40px" }}>


        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Plagiarism</StyledTableCell>
              <StyledTableCell align="left"><ThumbUpAltIcon></ThumbUpAltIcon></StyledTableCell> 
              <StyledTableCell align="left"><ThumbDownAltIcon></ThumbDownAltIcon></StyledTableCell> 
              <StyledTableCell align="center">View</StyledTableCell>
                <StyledTableCell align="center">Update</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
            
            
            </TableRow>
          </TableHead>
          <TableBody>
             
               {productData.length > 0 ? 
                productData.map((IsItem, key) => (
              <StyledTableRow key={key}>
                <StyledTableCell  scope="row">
                  {(IsItem.title)}
                </StyledTableCell>
                <StyledTableCell align="left">{IsItem.status}</StyledTableCell>
                <StyledTableCell align="left">{IsItem.plag+"%"}</StyledTableCell>
                <StyledTableCell align="left">{IsItem.like}</StyledTableCell>
                <StyledTableCell align="left">{IsItem.dislike}</StyledTableCell>
           
                <StyledTableCell align="center">

                <VisibilitySharpIcon onClick={()=>viewPost(IsItem)}>


                </VisibilitySharpIcon>


                </StyledTableCell>
                   
               
                <StyledTableCell align="center">{ 
                  
                <IconButton onClick={()=>expenseUpdate(IsItem)}>
                  <UpdateIcon className="deleteIconBlue" />
                </IconButton>
               
                }
                </StyledTableCell>
                <StyledTableCell align="center">{ 
                <IconButton aria-label="action" onClick={()=> deleteProductData(IsItem)} >
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

    
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>



          
      <Dialog
              open={open}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth={"md"} fullWidth={true} 

           
          >
       

          <DialogTitle style={{backgroundColor:"#C0392B"}} className="dialogHeading" id="alert-dialog-title">NEW POST</DialogTitle>
          
                 
                
                                

      
    
           <br></br>
        <DialogContent>
          

          <Row>

            <Col md="6">


            <TextField
          error= {titleError}
          id="Title"
          label="Title"
          placeholder="Enter Title" 
          autoComplete="off"
          helperText={titleError === true ? "Field Required" : ''}
          value={title} 
          onChange={(e)=> handleField(e, setTitle, setTitleError)}
          variant="outlined"
          fullWidth
   
        />
            
            
            </Col>


            <Col md="6">


            <TextField
          error ={detailError}
          id="Tags"
          label="Tags"
          placeholder="Tags" 
          autoComplete="off"
          helperText={detailError === true ? "Field Required" : ''}
          value={detail}
          onChange={(e) => handleField(e, setDetail, setDetailError)}
          variant="outlined"
          fullWidth
        
        />
            
            
            </Col>


           

          </Row>


                <br></br>
                
                <br></br>
          <Row>
                <Col>
                <TextField
          error={desError}
          type="text"
          multiline
          rows={10}
          rowsMax={10}
          label="Article Body"
          placeholder="Type Your Article Here......."
          autoComplete="off"
          defaultValue="success"
          helperText={desError=== true ? "Field Required" : ''}
          value={des} 
          onChange={(e)=> handleField(e, setdes ,setdesError)} 
          variant="outlined"
          fullWidth
        />

                
                
         </Col>
         


          </Row>
        
                 <br></br>
                <br></br>
                <Row style={{justifyContent:"center",marginLeft:"30px"}}>
              
                <div className={classes.root} >
                      <input
                      accept="*"
                      className={classes.input}
                      id="contained-modelbutton-file"
                      type="file"
                      name="3Dimage"
                      onChange={handleModelImage}
                      />
                      <label htmlFor="contained-modelbutton-file">
                      <Button 
                      style={{backgroundColor:"#C0392B",color:"white"}}
                      variant="contained"
                      name="Upload 3D Model"
                      component="span" 
                      size="medium"
                      startIcon={<CloudUploadIcon />}>
                        upload Image
                      </Button>
                      </label>
                      </div>
               
                </Row>
        
   
                  
       </DialogContent>

       <br></br>

     

                      <DialogActions>
                        <Grid container justify="center" style={{textAlign:"center"}}>

                          


                            
                            <Grid item xs={4}>
                            <Button onClick={closeDialog} variant="contained"  className="dialogButton" size="medium"style={{color:"white",backgroundColor:"#C0392B"}}>
                                CANCEL
                            </Button>
                            </Grid>
                            <Grid item xs={4}>
                          
                                <Button type="submit"   onClick={postExpense} variant="contained"  className="dialogButton" size="medium"style={{color:"white",backgroundColor:"#C0392B"}}>
                                   SUBMIT
                                </Button>
                       
                            </Grid>
                        </Grid>
                        </DialogActions>
            
                        <br></br>
       
        
                        </Dialog>


  
        


      
         
           <Dialog
              open={open2}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth={"md"} fullWidth={true} 

           
          >
       

          <DialogTitle style={{backgroundColor:"#C0392B"}} className="dialogHeading" id="alert-dialog-title">UPDATE POST</DialogTitle>
          
                 
                
                                

      
    
           <br></br>
        <DialogContent>
          

          <Row>

            <Col md="6">


            <TextField
          error= {titleError}
          id="Title"
          label="Title"
          placeholder="Enter Title" 
          autoComplete="off"
          helperText={titleError === true ? "Field Required" : ''}
          value={title} 
          onChange={(e)=> handleField(e, setTitle, setTitleError)}
          variant="outlined"
          fullWidth
   
        />
            
            
            </Col>


            <Col md="6">


            <TextField
          error ={detailError}
          id="Tags"
          label="Tags"
          placeholder="Tags" 
          autoComplete="off"
          helperText={detailError === true ? "Field Required" : ''}
          value={detail}
          onChange={(e) => handleField(e, setDetail, setDetailError)}
          variant="outlined"
          fullWidth
        
        />
            
            
            </Col>


           

          </Row>


                <br></br>
                
                <br></br>
          <Row>
                <Col>
                <TextField
          error={desError}
          type="text"
          multiline
          rows={10}
          rowsMax={10}
          label="Article Body"
          placeholder="Type Your Article Here......."
          autoComplete="off"
          defaultValue="success"
          helperText={desError=== true ? "Field Required" : ''}
          value={des} 
          onChange={(e)=> handleField(e, setdes ,setdesError)} 
          variant="outlined"
          fullWidth
        />

                
                
         </Col>
         


          </Row>
        
                <br></br>
                <br></br>
                <Row style={{justifyContent:"center",marginLeft:"30px"}}>
              
                <div className={classes.root} >
                      <input
                      accept="*"
                      className={classes.input}
                      id="contained-modelbutton-file"
                      type="file"
                      name="3Dimage"
                      onChange={handleModelImage}
                      />
                      <label htmlFor="contained-modelbutton-file">
                      <Button 
                      style={{backgroundColor:"#C0392B",color:"white"}}
                      variant="contained"
                      name="Upload 3D Model"
                      component="span" 
                      size="medium"
                      startIcon={<CloudUploadIcon />}>
                        upload Image
                      </Button>
                      </label>
                      </div>
               
                </Row>
        
  
                  
       </DialogContent>

       <br></br>

     

                      <DialogActions>
                        <Grid container justify="center" style={{textAlign:"center"}}>

                          


                            
                            <Grid item xs={4}>
                            <Button onClick={closeDialog} variant="contained"  className="dialogButton" size="medium"style={{color:"white",backgroundColor:"#C0392B"}}>
                                CANCEL
                            </Button>
                            </Grid>
                            <Grid item xs={4}>
                          
                                <Button type="submit"   onClick={Update} variant="contained"  className="dialogButton" size="medium"style={{color:"white",backgroundColor:"#C0392B"}}>
                                   SUBMIT
                                </Button>
                       
                            </Grid>
                        </Grid>
                        </DialogActions>
            
                        <br></br>
       
        
                        </Dialog>





            
           <Dialog
              open={open3}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth={"md"} fullWidth={true} 

           
          >
       

          <DialogTitle style={{backgroundColor:"#C0392B"}} className="dialogHeading" id="alert-dialog-title">ARTICLE</DialogTitle>
          
                 
                
                                

      
    
           <br></br>
        <DialogContent>
          

          <Row>

            <Col md="6">


            <TextField
          error= {titleError}
          disabled
          id="Title"
          label="Title"
          placeholder="Enter Title" 
          autoComplete="off"
          helperText={titleError === true ? "Field Required" : ''}
          value={title} 
          onChange={(e)=> handleField(e, setTitle, setTitleError)}
          variant="outlined"
          fullWidth
   
        />
            
            
            </Col>


            <Col md="6">


            <TextField
          error ={detailError}
          disabled
          id="Tags"
          label="Tags"
          placeholder="Tags" 
          autoComplete="off"
          helperText={detailError === true ? "Field Required" : ''}
          value={detail}
          onChange={(e) => handleField(e, setDetail, setDetailError)}
          variant="outlined"
          fullWidth
        
        />
            
            
            </Col>


           

          </Row>


                <br></br>
                
                <br></br>
          <Row>
                <Col>
                <TextField
          error={desError}
          disabled
          type="text"
          multiline
          rows={10}
          rowsMax={10}
          label="Article Body"
          placeholder="Type Your Article Here......."
          autoComplete="off"
          defaultValue="success"
          helperText={desError=== true ? "Field Required" : ''}
          value={des} 
          onChange={(e)=> handleField(e, setdes ,setdesError)} 
          variant="outlined"
          fullWidth
        />

                
                
         </Col>
         


          </Row>
        
                <br></br>
                <br></br>
              
                  
       </DialogContent>

       <br></br>

     

                      <DialogActions>
                        <Grid container justify="center" style={{textAlign:"center"}}>

                          
                            
                        <Grid item xs={4}></Grid>
                            
                            <Grid item xs={4}>
                            <Button onClick={closeDialog} variant="contained"  className="dialogButton" size="medium"style={{color:"white",backgroundColor:"#C0392B"}}>
                                CANCEL
                            </Button>
                            </Grid>
                            <Grid item xs={4}>
                          
                              
                       
                            </Grid>
                        </Grid>
                        </DialogActions>
            
                        <br></br>
       
        
                        </Dialog>


  
    






       </>
    )
}

export default Posts;
