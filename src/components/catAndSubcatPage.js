import React, {useState, useEffect} from 'react';
import "./item.css";
import {Button,Grid, Card, CardActions, Fab, CardMedia,} from "@material-ui/core";
import {Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,FormControlLabel} from '@material-ui/core';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { Link, useHistory } from "react-router-dom";
import Switch from '@material-ui/core/Switch';
import Background from "assets/img/background.jpg";
import View from "assets/img/view.png";
import SubCategory from 'views/SubCategories';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import AddBoxIcon from '@material-ui/icons/AddBox';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel } from '@material-ui/core';
import { Select,FormHelperText,MenuItem } from '@material-ui/core';
import logo2 from "assets/img/2.jpeg";
import { Opacity } from '@material-ui/icons';
import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

import config from 'config';



const catAndSubcatPage= () => {





  //Adding Styel to UseStyle Hook
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));





  // setting states for values and errors
  const onClick= (e, func,errorFunc)=>{
      func(e.target.value)
      errorFunc(false)


  }

  // Dialogue Open 
  const handleClick =(state,func)=>{
      func(!state);
  }

  // Dialogue Close
  const handleClose =(func,funcError)=>{
    
    func(false);
    funcError(false);
  }

  // handle Active Switch

  const handleSwitch =()=>{

      setState(!state)
  }


  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
    setSnackOpen2(false)
  };






  // posting data to server after validation

  const submit = ()=>{

    if(openCategory === true){

       if(category === '')
         {
          setCategoryError(true)
         }
         else{
            postData()
  
         }


    }

    if(openSubcategory === true){

      if(subcategory === '')
        {
         setSubcategoryError(true)
        } 
      if(category === '')
        {
         setCategoryError(true)
        } 
      else{
           postData()
        }


   }
   

  }

 

  // Posting data to server
  function postData ()  {


      if( openCategory === true){

        let categoryData = {};
      
        categoryData.categoryName = category;
        categoryData.active = state
       
        //history.push("/admin/addproductnew");
        console.log("Calling apis", categoryData)
       
        axios.post(config.base_url + '/category/add', categoryData)
        .then(res =>{
          console.log(res);
          if(res.data.code === 0){
            console.log(res);
            setCategory('')
            setState(true)
            viewCategoryData()
            setSnackOpen(true)
            handleClose(setOpenCategory(),setCategoryError());
         
          }else{
            alert("A category with the same name exists in record")
            console.log("Category Already Exists");
          }
        })
        .catch(err =>{
            console.log(err)
        });

      }
      else{

        let subCategoryData = {};
        
        subCategoryData.SubCategoryName = subcategory;
        subCategoryData.categoryName = category;
        subCategoryData.active = state
       
  
        console.log("Calling Subcategory Api ", subCategoryData)
       
       
        
        axios.post(config.base_url + '/Subcategory/add', subCategoryData)
        .then(res =>{
          console.log(res);
          if(res.data.code === 0){
            console.log(res);
            setSubCategory('')
            setCategory('')
            setState(true)
            setSnackOpen2(true)
            handleClose(setOpenSubcategory(), setSubcategoryError());
          }else{
            alert("A Subcategory with the same name exists in record")
            console.log("Subcategory Already Exists");

          }
        })
        .catch(err =>{
            console.log(err)
        });

      }

    
}




    ////////////////// FETCHING CATEGORY DATA //////////////////////////

    const viewCategoryData = async () => {
      const res = await axios.get(config.base_url+"/category/view")
      .then(res =>{
          console.log(res);
          return res.data.data;
      }).catch(err =>{
          console.log(err)
      });

      setCategoryData(res);
    }
   //------------------------------------------------------------------



   
   //////////////// INVOKING CATEGORY VIEW FUNCATION //////////////////

  useEffect(() => {
  viewCategoryData();
  }, [])

  //-------------------------------------------------------------------







  const classes = useStyles();


  // Dialogues Box States
  const [openCategory,setOpenCategory] = React.useState(false);
  const [openSubcategory,setOpenSubcategory] = React.useState(false);

  // setting variable States
  const [category, setCategory ]= React.useState('');
  const [subcategory,setSubCategory ] = React.useState('');

  const [categoryData, setCategoryData] = React.useState({}); 


  // Errors Validation 
  const [categoryError, setCategoryError] = React.useState(false);
  const [SubcategoryError, setSubcategoryError] = React.useState(false);

  // states for switch
  const [state, setState] = React.useState(true);

  const [snackOpen, setSnackOpen] = React.useState(false);
  const [snackOpen2, setSnackOpen2] = React.useState(false);



    return (
   <>

<div>
         <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
             horizontal: 'right',
             }}
             open={snackOpen}
             autoHideDuration={3000}
             onClose={handleClose2}
             message="Category Added Successfully"
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
             horizontal: 'right',
             }}
             open={snackOpen2}
             autoHideDuration={3000}
             onClose={handleClose2}
             message="Subcategory Added Successfully"
             action={
               <React.Fragment>
                 <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose2}>
                   <CloseIcon fontSize="small" />
                 </IconButton>
               </React.Fragment>
             }
           />
         




   <div style={{marginTop:"30px", marginLeft:"240px"}}>
        <div className="card text-center w-75" style={{/* backgroundImage: `url(${Background})`, backgroundSize:"cover",backgroundRepeat:"no-repeat"*/}}  >
      
         <div className="card-body "style={{marginTop:"30px"}} >

         <Grid container justify="space-evenly"    direction="row" spacing={10} >
        <Grid item xs={4}>

        <Button className="cat"  style={{minHeight:"180px",minWidth:"280px"}} variant="contained"  onClick={()=> handleClick(openCategory, setOpenCategory)}> 
       <h5>
        <AddBoxIcon fontSize="large">

        </AddBoxIcon>
        <br></br>
        <p>
        Add category
        </p>
      
        </h5>
         </Button>
         
        </Grid>
        <Grid item xs={4}>
          <Link to="/admin/categoryViewPage">
          <Button className="cat" style={{minHeight:"180px",minWidth:"280px"}} variant="contained">
          <h5>
            <VisibilityIcon fontSize="large">
            </VisibilityIcon>
            <br></br>
            View Categories
            </h5>
            </Button>
          </Link>
        
          
        </Grid>
        </Grid>
        <Grid container justify="space-evenly"   direction="row" spacing={10} >
        <Grid   item xs={4}>
        <Button className="cat"  style={{minHeight:"180px",minWidth:"280px"}} variant="contained" onClick={()=> handleClick(openSubcategory, setOpenSubcategory)} >     
          <h5>
        <AddBoxIcon fontSize="large"> 

        </AddBoxIcon>
        <br></br>
        <p5>
        Add Subcategory
        </p5>
        
        </h5></Button>
    
        </Grid>

        <Grid item xs={4}>
        <Link to="/admin/SubcategoryViewPage">
        <Button className="cat" style={{minHeight:"180px",minWidth:"280px"}} variant="contained">  
         <h5 >
            <VisibilityIcon fontSize="large">
            </VisibilityIcon>
            <br></br>
            View Subcategories
            </h5>
            </Button>
                </Link>
        </Grid>
        </Grid>
       
       






        
       
        <Dialog
                    open={openCategory}
            
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                <DialogTitle className="dialogHeading" id="alert-dialog-title">Add New Category</DialogTitle>
                <DialogContent className="dialogDescription">
                <DialogContentText id="alert-dialog-description">
                  <Grid container >

                  <TextField
                  error= {categoryError}
                  id="name"
                  label="Enter Category Name"
                  placeholder="Type Category Name" 
                  autoComplete="off"
                 helperText={categoryError === true ? "Field Required" : ''}
                 value={category} 
                 onChange={(e)=> onClick(e,setCategory,setCategoryError)}
                  variant="outlined"
                 fullWidth
   
        />
                  </Grid>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                 <Grid container justify="center" style={{textAlign:"center" ,width:"450px"}}>
                    <Grid item xs={4}>
                    <Button    onClick={()=>  handleClose(setOpenCategory,setCategoryError)} color="primary">
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item xs={4}> 
                    <FormControlLabel
                      control={<Switch checked={state} onChange={handleSwitch} color="primary" />}
                       label="Active" style={{color:"#4d58d1"}}
                       
                       />
                    </Grid>
                    <Grid item xs={4}> 
                    <Button color="primary" onClick={submit}  >
                        Submit
                      </Button>
                    </Grid>
                 </Grid>
                </DialogActions>
            </Dialog>
         

       

         
        <Dialog
                    
                    open={openSubcategory}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                  
                <DialogTitle className="dialogHeading" id="alert-dialog-title">Add Sub Category</DialogTitle>
                <DialogContent className="dialogDescription">
                <DialogContentText id="alert-dialog-description">
                  <Grid container>

                  <TextField
                  error= {SubcategoryError}
                  id="name"
                  label="Enter Subcategory Name"
                  placeholder="Type Subcategory Name" 
                  autoComplete="off"
                 helperText={SubcategoryError === true ? "Field Required" : ''}
                 value={subcategory} 
                 onChange={(e)=> onClick(e,setSubCategory,setSubcategoryError)}
                  variant="outlined"
                 fullWidth
   
        />
        </Grid>
        <br></br>
        <Grid container>
        <FormControl variant="outlined" error={categoryError}  fullWidth className={classes.formControl} >
        <InputLabel id="demo-simple-select-outlined-label">Select Category</InputLabel>
        <Select
          
          id="category"
          value={category}
          onChange={(e)=> onClick(e, setCategory ,  setCategoryError)}
          label="Select Main Category"
          fullWidth
        >
         
          {categoryData.length > 0 ? 
           categoryData.map((IsItem, key) => (
         

            <MenuItem value={(IsItem.categoryName)}>
            {(IsItem.categoryName)}
            </MenuItem>

      
         
          
          ))
          : 
        <strong>Data not Found</strong>
          }
        </Select>
        <FormHelperText>{categoryError ? 'Please select category' : ''}</FormHelperText>
        </FormControl>
        </Grid>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                 <Grid container justify="center" style={{textAlign:"center" ,width:"450px", marginBottom:"10px"}}>
                    <Grid item xs={4}>
                    <Button  onClick={()=>  handleClose(setOpenSubcategory,setSubcategoryError)} color ="primary">
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item xs={4}> 
                    <FormControlLabel
                      control={<Switch checked={state} onChange={handleSwitch} color="primary" />}
                       label="Active" style={{color:"#4d58d1"}}
                       
                       />
                    </Grid>
                    <Grid item xs={4}> 
                    <Button   onClick={submit} color="primary">
                        Submit
                      </Button>
                    </Grid>
                 </Grid>
                </DialogActions>
            </Dialog>
          <br></br>
          <br></br>
         
          

             
         </div>
            </div>
              </div>
   </>

    )
};

export default catAndSubcatPage;
