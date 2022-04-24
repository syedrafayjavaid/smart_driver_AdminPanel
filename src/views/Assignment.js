

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
import { withStyles, makeStyles } from '@material-ui/core/styles';
import DescriptionIcon from '@material-ui/icons/Description';
import DetailsIcon from '@material-ui/icons/Details';


import UpdateIcon from '@material-ui/icons/Update';

import Slider from '@material-ui/core/Slider';

import { event } from "jquery";








const Assignment = () => {


    

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

;



  const classes = useStyles();
  const history = useHistory();

  const [productData, setProductData] = useState({}); 
  const [filteredData, setFilteredData] = useState({}); 
  

  const [open, setOpen] = useState(false); 
  const [open2, setOpen2] = useState(false); 
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
  const [memberError, setmemberError] = React.useState(false);

  // Setting States 
  const [title, setTitle ]= React.useState('');
  const [detail, setDetail] = React.useState('');
  const [pcost, setPcost] = React.useState('');
  const [member, setMember] = React.useState('');
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






 // add user

  const postExpense = async () => {


     let expenseData = {};

     expenseData.name= title
     expenseData.description= detail
     expenseData.creator = pcost

      let tokens = member.split(',');

          tokens.push(pcost);

     expenseData.member = tokens


     console.log("out going data ",expenseData);
     

      await axios.post(config.base_url+'/createclass',expenseData)

     .then(res =>{
         console.log("expense add response:",res.data.result)
         setOpen(false)
         setSnackOpen(true)
         viewProductData()
         setTitle('')
         setDetail('')
         setPcost('')
         setMember('')
    
        

     }).catch(err =>{
         console.log(err)
         alert("sorry we couldn't add expense details,try later")
     });




  }




  /// update user

  const expenseUpdate = async (IsItem) =>{

            setUpdateId(IsItem._id)
            setTitle(IsItem.title)
            setDetail(IsItem.detail)
            setPcost(IsItem.amount)
            let  updateDate = new Date(IsItem.createdDate)
            updateDate =updateDate.toISOString().split('T')[0]
            setDate(updateDate)
            setOpen2(true)

  }


  const Update = async () =>{


        

            let updateData= {};

            updateData._id = updateId;
            updateData.title = title;
            updateData.detail = detail;
            updateData.amount = pcost;
            updateData.createdDate= date;

            
            const res = await axios.put(config.base_url+"/expense/update",updateData)
                .then(res =>{
                    console.log(res);
                    viewProductData();
                    setOpen2(false);
                    setSnackOpen3(true)
                    setTitle('')
                    setDetail('')
                    setPcost('')
                    setDate(date)

                
                
            }).catch(err =>{
                console.log(err)
                alert("Oops we ran into a problem expense details were not updated")
            });





  }



  


/// getting users data

  const viewProductData = async () => {
   
    
      const res = await axios.get(config.base_url+'/admin/assignments')

      .then(res =>{
          setProductData(res.data.data[1].assignment);

      }).catch(err =>{
          console.log(err)
      });
  }





  //deleting user

   const deleteProductData = async (IsItem) => {
    
                let id = IsItem.code;
                console.log(id)
                    
            
                const res = await axios.get(config.base_url+"/admin/deleteclass/"+id)
                    .then(res =>{
                        console.log(res);
                        viewProductData();
                        setSnackOpen2(true)
                    
                    
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
    setTitle('')
    setDetail('')
    setPcost('')
    setDate(date)
    
  }







 let memberLength;
 let assignmentLength;



    return (
       <>

<Container fluid >


{/* <Fab className="addBtnFloat"  onClick={()=>setOpen(true)} variant="extended" style={{backgroundColor:"#0D87B1"}} aria-label="Add" size="large" >
 
      <Add />
      Add Assidnment
    
  </Fab> */}

  <div>
   <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
       horizontal: 'left',
       }}
       open={snackOpen}
       autoHideDuration={6000}
       onClose={handleClose2}
       message="Expense Details Added Successfully"
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
       message="Expense Deleetd Successfully"
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
       message="Record Updated Successfully"
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
        <Card.Header  className="productsgallerybar" style={{backgroundColor:"#0D87B1"}}>
          <Card.Title  style={{marginBottom:"14px", textAlign:"center" ,fontSize:"25px",fontFamily:"Baufra",color:"white"}}  > Classes   </Card.Title>
          
         

        </Card.Header>
        
        


       
        <Card.Body className="all-icons" style={{marginTop:"40px" }}>


        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>UUID</StyledTableCell>
              <StyledTableCell align="left">Title</StyledTableCell>
              <StyledTableCell align="left">Type</StyledTableCell>
              <StyledTableCell align="center">Questions</StyledTableCell>
              <StyledTableCell align="left">Members</StyledTableCell>  
              <StyledTableCell align="center">Start Time</StyledTableCell>
                <StyledTableCell align="center">End Time</StyledTableCell>
                
            
            
        
            
            </TableRow>
          </TableHead>
          <TableBody>
             
               {productData.length > 0 ? 
                productData.map((IsItem, key) => (
              <StyledTableRow key={key}>
                <StyledTableCell  scope="row">
                  {(IsItem.uuid)}
                </StyledTableCell>
                <StyledTableCell align="left">{IsItem.title}</StyledTableCell>
                <StyledTableCell align="left">{IsItem.type}</StyledTableCell>
                <StyledTableCell align="center">{ memberLength = Object.keys(IsItem.mem).length }</StyledTableCell>            
                <StyledTableCell align="center">{assignmentLength =Object.keys(IsItem.question).length }</StyledTableCell>
                <StyledTableCell align="left">{IsItem.start}</StyledTableCell>
                <StyledTableCell align="left">{IsItem.end}</StyledTableCell>
                  

               
                <StyledTableCell align="center">{ 
                  
                <IconButton onClick={()=>expenseUpdate(IsItem)}>
                  <UpdateIcon className="deleteIconBlue" />
                </IconButton>
               
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

    
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>



          
      <Dialog
              open={open}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth={"sm"} fullWidth={true} 
           
          >
       

          <DialogTitle style={{backgroundColor:"#0D87B1"}} className="dialogHeading" id="alert-dialog-title">New class</DialogTitle>
          
                 
                
                                

      
           
        <DialogContent>

                <br></br>
       
     
          <TextField
          error= {titleError}
          id="name"
          label="Name"
          placeholder="Name" 
          autoComplete="off"
          helperText={titleError === true ? "Field Required" : ''}
          value={title} 
          onChange={(e)=> handleField(e, setTitle, setTitleError)}
          variant="outlined"
          fullWidth
   
        />
    
        <br></br>
        <br></br>
        <TextField
          error ={detailError}
          id="quantity"
          label="Description"
          placeholder="Description" 
          autoComplete="off"
          helperText={detailError === true ? "Field Required" : ''}
          value={detail}
          onChange={(e) => handleField(e, setDetail, setDetailError)}
          variant="outlined"
          fullWidth
        
        />
     <br></br>
     <br></br>
     <TextField
          error={costError}
          type="text"
          label="Creator Name"
          placeholder="Creator Name"
          autoComplete="off"
          defaultValue="success"
          helperText={costError=== true ? "Field Required" : ''}
          value={pcost} 
          onChange={(e)=> handleField(e, setPcost ,setcostError)} 
          variant="outlined"
          fullWidth
        />
        <br></br>
     <br></br>
     <TextField
          error={memberError}
          type="text"
          label="Members"
          placeholder="Members"
          autoComplete="off"
          defaultValue="success"
          helperText={memberError=== true ? "Field Required" : ''}
          value={member} 
          onChange={(e)=> handleField(e, setMember ,setmemberError)} 
          variant="outlined"
          fullWidth
        />
  
  
  
         
                <br></br>
                <br></br>
     
         
                  
                 </DialogContent>

                      <DialogActions>
                        <Grid container justify="center" style={{textAlign:"center"}}>
                            <Grid item xs={6}>
                            <Button onClick={closeDialog} variant="contained"  className="dialogButton" size="medium"style={{color:"white",backgroundColor:"#0D87B1"}}>
                                CANCEL
                            </Button>
                            </Grid>
                            <Grid item xs={6}>
                          
                                <Button type="submit"   onClick={postExpense} variant="contained"  className="dialogButton" size="medium"style={{color:"white",backgroundColor:"#0D87B1"}}>
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
              maxWidth={"sm"} fullWidth={true} 
           
          >
       

          <DialogTitle style={{backgroundColor:"#0D87B1"}} className="dialogHeading" id="alert-dialog-title">Update Expense</DialogTitle>
          
                 
                
                                

      
           
        <DialogContent>

                <br></br>
       
     
          <TextField
          error= {titleError}
          id="name"
          label="Expense Title"
          placeholder="Expense Title" 
          autoComplete="off"
          helperText={titleError === true ? "Field Required" : ''}
          value={title} 
          onChange={(e)=> handleField(e, setTitle, setTitleError)}
          variant="outlined"
          fullWidth
   
        />
    
        <br></br>
        <br></br>
        <TextField
          error ={detailError}
          id="quantity"
          label=" Expense Details"
          placeholder="Expense Detail" 
          autoComplete="off"
          helperText={detailError === true ? "Field Required" : ''}
          value={detail}
          onChange={(e) => handleField(e, setDetail, setDetailError)}
          variant="outlined"
          fullWidth
        
        />
     <br></br>
     <br></br>
     <TextField
          error={costError}
          type="number"
          label="Total Cost"
          placeholder="Total Cost"
          autoComplete="off"
          defaultValue="success"
          helperText={costError=== true ? "Field Required" : ''}
          value={pcost} 
          onChange={(e)=> handleField(e, setPcost ,setcostError)} 
          variant="outlined"
          fullWidth
        />
        <br></br>
     <br></br>

     <TextField
          error={costError}
          type="number"
          label="Total Cost"
          placeholder="Total Cost"
          autoComplete="off"
          defaultValue="success"
          helperText={costError=== true ? "Field Required" : ''}
          value={pcost} 
          onChange={(e)=> handleField(e, setPcost ,setcostError)} 
          variant="outlined"
          fullWidth
        />
  
        
         
                <br></br>
                <br></br>
     
         
                  
                 </DialogContent>

                      <DialogActions>
                        <Grid container justify="center" style={{textAlign:"center"}}>
                            <Grid item xs={6}>
                            <Button onClick={closeDialog} variant="contained"  className="dialogButton" size="medium"style={{color:"white",backgroundColor:"#0D87B1"}}>
                                CANCEL
                            </Button>
                            </Grid>
                            <Grid item xs={6}>
                          
                                <Button type="submit"   onClick={Update} variant="contained"  className="dialogButton" size="medium"style={{color:"white",backgroundColor:"#0D87B1"}}>
                                   SUBMIT
                                </Button>
                       
                            </Grid>
                        </Grid>
                        </DialogActions>
            
                        <br></br>
       
        
                        </Dialog>








       </>
    )
}

export default Assignment;
