import { Card, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ButtonBase, Tooltip} from '@material-ui/core';
import React, { Component } from 'react';
import { Link, useHistory } from "react-router-dom";
import './stylesheets/AddProductStyle.css';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Category } from '@material-ui/icons';
import SubCategory from 'views/SubCategories';
import { Col,Form,Row } from 'react-bootstrap';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import config from 'config';

function addProduct() {
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

    const history = useHistory();
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    // Form validation errors State Setting 
    const [nameError, setNameError] = React.useState(false);
    const [stockError, setstockError] = React.useState(false);
    const [categoryError, setcategoryError] = React.useState(false);
    const [subCategoryError, setsubCategoryError] = React.useState(false);
    const [costError, setcostError] = React.useState(false);
    const [saleError, setsaleError] = React.useState(false);
    const [colourError, setColourError] = React.useState(false);
    const [brandError, setBrandError] = React.useState(false);
    const [descriptionError, setdescriptionError] = React.useState(false);
    const [imageError, setImageError] = React.useState(false);
    const [modelError, setModelError] = React.useState(false);
    
    // Setting States 
    const [name, setName] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [pcost, setPcost] = React.useState('');
    const [sprice, setSprice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [subCategory, setSubCategory] = React.useState('');
    const [color, setColor] = React.useState('');
    const [brand,setBrand] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [categoryData, setCategoryData] = React.useState({}); 
    const [subcategoryData, setSubcategoryData] = React.useState({}); 

    //Validation Check After Button Click
    const handleClickOpen = () => {
      // Check if any field of Form is Empty
        if(name === '' || category === '' || quantity === '' || pcost === '' || sprice === '' || subCategory === '' || brand === '' || description === ''){
            if(name == ''){
                setNameError(true)
            }
            if(quantity === '')
            {
              setstockError(true)
            }
            if(pcost ===''){
              setcostError(true)
            }
            if(sprice ===''){
              setsaleError(true)
            }
            if(brand ===''){
              setBrandError(true)
            }
            if(description ===''){
              setdescriptionError(true)
            }
            if(category === ''){
              setcategoryError(true)
            }
            if(subCategory ===''){
              setsubCategoryError(true)
            }
          


    }
    else{
        setOpen(true);
    }
    };

  
    const handleClose = () => {
      setOpen(false);
    };

    // OnChange function form field state set 
 
    
    // // On file select (from the pop up)
    // const onChangeImage = event => {
    //    setImage(event.target.files);
    // };



    // const handleModelImage = event => {
    //     setModelImage(event.target.files);
    // };



    const handleChange = (e, func, errorFunc) => {
      func(e.target.value);
      console.log(e.target.name,e.target.value)
        errorFunc(false)
    }

    function postDataToServer ()  {
      //   console.log("Image array",image)
      //   console.log("ModelImage array",modelImage)
   
      //   for(var x = 0; x < image.length; x++) {
      //     data.append('file', image[x])
      // }
      
         var productData = {};
         productData.Name = name;
         productData.Quantity =quantity;
         productData.PurchaseCost= pcost;
         productData.SalePrice =sprice;
         productData.brand= brand;
         productData.Category=category;
         productData.SubCategory=subCategory;
         productData.Description =description;
    
      
           console.log("This is the cmoing from data",productData)

            setName('')
            setQuantity('')
            setPcost('')
            setSprice('')
            setBrand('')
            setDescription('')
            setColor('')
            setCategory('')
            setSubCategory('')
            handleClose();
    
        console.log("Posting Product Data", productData)
        console.log("Based url that is beign used", config.base_url )
        axios.post('http://localhost:3001/product/add', productData)
        .then(res =>{
            console.log(res);
            setSnackOpen(true)
           // history.push("/admin/MyProducts")
           
        })
        .catch(err =>{
            console.log(err)
        });
    }
   


    ////////////////// FETCHING CATEGORY DATA //////////////////////////

    const viewCategoryData = async () => {

      console.log('viewCategoryData: ');
      await axios.get(config.base_url +'/category/view')
      .then(res =>{
        console.log('viewCategoryData - res: ', res);
          console.log(res);
          if (res.status === 200){
            setCategoryData(res.data.data);
          }
          else{
            setCategoryData([]);
          }
      }).catch(err =>{
          console.log(err)
      });
    }
   //------------------------------------------------------------------







   ////////////////// FETCHING SUBCATEGORY DATA //////////////////////////
   
   const viewSubcategoryData = async () => {
    const res = await axios.get(config.base_url + '/Subcategory/view')
    .then(res =>{
        console.log(res);
        return res.data.data;
    }).catch(err =>{
        console.log(err)
    });

    setSubcategoryData(res);
  }
  //------------------------------------------------------------------




  const [snackOpen, setSnackOpen] = React.useState(false);

  const handleClick = () => {
    setSnackOpen(true);
  };

  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };



  const back = () => {
    
      history.push("/admin/MyProducts")
    
  };





   //////////////// INVOKING CATEGORY VIEW FUNCATION //////////////////

   useEffect(() => {
    viewCategoryData();
    viewSubcategoryData();
  }, [])

  //-------------------------------------------------------------------




    return (
        <>

        <div>
         
            <Snackbar
             anchorOrigin={{
               vertical: 'bottom',
                horizontal: 'right',
                }}
                open={snackOpen}
                autoHideDuration={6000}
                onClose={handleClose2}
                message="Product Added Successfully"
                action={
                  <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose2}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </React.Fragment>
                }
              />
            </div>





        <div style={{marginTop:"0px", marginLeft:"240px"}}>
          
            <Tooltip title =" Back to Main">
            <Button  variant="contained"  onClick={back} style={{backgroundColor:"#0D87B1",color:"white",top:"7vh",left:"2vw",zIndex:"999"}}>
            <ArrowBackIosIcon>
              
            </ArrowBackIosIcon>
        </Button> 
        </Tooltip>
        <div className="card text-center w-75" style={{padding:"10px"}}>
        
        <div className="card-header">
     
        <h4 className="card-title" style={{color:"#0D87B1"}}>ADD PRODUCT</h4>
         </div>
         <div className="card-body" >
        {/* <form method="POST" action="http://localhost:2000/product/add"> */}
        <form className="form-group text-center" noValidate autoComplete="off">
        <br></br>
        <div className="form-row">
         <div className="col-md-4">
          <TextField
          error= {nameError}
          id="name"
          label="Product Name"
          placeholder="Product Name" 
          autoComplete="off"
          helperText={nameError === true ? "Field Required" : ''}
          value={name} 
          onChange={(e)=> handleChange(e, setName, setNameError)}
          variant="outlined"
          fullWidth
   
        />
        </div>
        <div className="col-md-4">
        <TextField
          error ={stockError}
          id="quantity"
          type="number"
          label="STOCK QUANTITY"
          placeholder="Stock Quantity" 
          autoComplete="off"
          helperText={stockError === true ? "Field Required" : ''}
          value={quantity}
          onChange={(e) => handleChange(e, setQuantity, setstockError)}
          variant="outlined"
          fullWidth
        
        />
        </div>
        <div className="col-md-4">
        <TextField
          error={costError}
          id="pcost"
          type="number"
          label="PURCHASE COST SINGLE"
          placeholder="Price Per Piece"
          autoComplete="off"
          defaultValue="success"
          helperText={costError=== true ? "Field Required" : ''}
          value={pcost} 
          onChange={(e)=> handleChange(e, setPcost ,setcostError)} 
          variant="outlined"
          fullWidth
        />
        </div>
     
         </div>
         <br></br>
        <div className="form-row">
        <div className="col-md-4">
          <TextField
          error={saleError}
          id="sprice"
          label="SALE PRICE SINGLE"
          type="number"
          placeholder="Price Per Piece" 
          autoComplete="off"
          defaultValue="Hello World"
          helperText={ saleError === true ? "Field Required" : ''}
          value={sprice} 
          onChange={(e)=>  handleChange(e, setSprice, setsaleError) }      
          variant="outlined"
          fullWidth  
        />
        </div>
        {/* <div className="col-md-4">
        <TextField
          error ={colourError}
          id="color"
          label="PRODUCT COLOUR"
          placeholder="Colour" 
          autoComplete="off"
          defaultValue="Hello World"
          helperText={colourError === true ? "Field Required" : ''}
          value={color} 
          onChange={(e)=> handleChange(e, setColor, setColourError) }
          variant="outlined"
          fullWidth
        />
        </div> */}
        <div className="col-md-4">
          <TextField
          error = {brandError}
          id="dimention"
          label="BRAND NAME"
          placeholder="Brand Name" 
          autoComplete="off"
          defaultValue="Hello World"
          helperText={brandError === true ? "Field Required" : ''}
          value={brand} 
          onChange={(e)=> handleChange(e,setBrand, setBrandError) }
          variant="outlined"
          fullWidth  
        />
        </div>
        <div className="col-md-4">
        <FormControl variant="outlined" error={categoryError}  fullWidth className={classes.formControl} >
        <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
        <Select id="category"
          labelId="demo-simple-select-outlined-label"
          value={category}
          onChange={(e)=> handleChange(e, setCategory , setcategoryError)}
          label="Category"
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
        </div>

         </div>
       
          
         <br></br>
      
        <div className="form-row">
        <div className="col-md-4">
        <FormControl variant="outlined" error={subCategoryError}  fullWidth className={classes.formControl} >
        <InputLabel id="demo-simple-select-outlined-label">Sub Category</InputLabel>
        <Select
          
          id="subCategory"
          labelId="demo-simple-select-outlined-label"
          value={subCategory}
          onChange={(e)=> handleChange(e, setSubCategory, setsubCategoryError)}
          label="Sub Category"
          fullWidth
        >
           {subcategoryData.length > 0 ? 
           subcategoryData.map((IsItem) => (
         

            <MenuItem value={(IsItem.subCategoryName)}>
            {(IsItem.subCategoryName)}
            </MenuItem>

      
         
          
          ))
          : 
        <strong>Data not Found</strong>
          }
        </Select>
        <FormHelperText>{subCategoryError ? 'Select sub category' : ''}</FormHelperText>
        </FormControl>
        </div>
            
         <div className="col-md-8">
          <TextField
          error = {descriptionError}
          id="description"
          label="PRODUCT DESCRIPTION"
          placeholder="Description" 
          autoComplete="off"
          defaultValue="Hello World"
          helperText={descriptionError === true ? "Field Required" : ''}
          value={description} 
          onChange={(e)=>  handleChange(e, setDescription, setdescriptionError)}
          variant="outlined"
          fullWidth
   
        />
        </div>
          
     
          
      
              
       
       </div>
            

         { /* 
         <div className="col-md-4">
          <TextField
          error={categoryError}
          id="standard-start-adornment"
          label=" CATEGORY NAME"
          placeholder="Furniture,Decore .etc" 
          autoComplete="off"
          defaultValue="Hello World"
          helperText={categoryError === true ? "Incorrect entry." : ''}
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          variant="outlined"
          fullWidth
         *
   
        />
         </div>*/}
         {/*
        <div className="col-md-4">
        <TextField
          error ={subCategoryError}
          id="standard-start-adornment"
          label="SUB CATEGORY NAME"
          placeholder="Sofa,Bed,Table .etc" 
          autoComplete="off"
          defaultValue="Hello World"
          helperText={subCategoryError === true ? "Incorrect entry." : ''}
          value={subCategory} 
          onChange={(e)=> 
          setSubCategory(e.target.value)}
          variant="outlined"
          fullWidth
        
        />
        </div>    
          */ }
          <br></br>
          <div className ="form-row">
          <div className="col-md-2" >
            </div>
{/* 

            <div className="col-md-4" >
          
          <div className={classes.root}  >
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple = {true}
            type="file"
            name="image"
            onChange={onChangeImage}
          />
          <label htmlFor="contained-button-file">
            <Button 
            variant="contained"
            color={image===''?"default":"inherit"}
             size="medium"
             name="Upload Image"
             component="span"  
             startIcon={<CloudUploadIcon />}>
              Upload Images
            </Button>
          </label>
          </div>
            </div>

     <div className="col-md-4" >
          
      <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-modelbutton-file"
        multiple
        type="file"
        name="3Dimage"
        onChange={handleModelImage}
      />
      <label htmlFor="contained-modelbutton-file">
        <Button 
        variant="contained"
         name="Upload 3D Model"
         color={modelImage===''?"default":"inherit"} 
         component="span" 
         size="medium"
         startIcon={<CloudUploadIcon />}>
           upload Models
        </Button>
      </label>
      </div>
        </div> */}


         </div>
       
      
            

                <Button variant="contained" style={{backgroundColor:"#0D87B1",color:"white"}} size ="large"onClick={handleClickOpen}> ADD PRODUCT</Button>

             
               
            

              <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                <DialogTitle className="dialogHeading"  id="alert-dialog-title">CONFIRM</DialogTitle>
                <DialogContent className="dialogDescription">
                <DialogContentText id="alert-dialog-description">
                  <Grid container>
                    <Grid item xs={4}>
                       <ReportProblemIcon fontSize="large" className="dialogIcon" />
                    </Grid>
                    <Grid item xs={8}>
                       <h5>Are you Sure you want to submit these details?</h5>
                    </Grid>
                  </Grid>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                 <Grid container justify="center" style={{textAlign:"center"}}>
                    <Grid item xs={6}>
                      <Button onClick={handleClose} style={{color:"#0D87B1"}}>
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      {/* <Link to={'/admin/viewproduct'}> */}
                        <button type="submit" onClick={postDataToServer} style={{outline:"none", background:"none", border:"none", color:"#0D87B1"}}>
                            Submit
                        </button>
                      {/* </Link> */}
                    </Grid>
                 </Grid>
                </DialogActions>
            </Dialog>

      
    </form>
     
       {/* <form method="POST"> 
            <div className="form-row">
                <div className="col-auto">
                <label for="name">Product Name</label>
                <input type="name" className="form-control" id="name" placeholder="Name" autoComplete="off" required="required" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                </div>
                <div className="col-auto">
                <label for="inputPass">STOCK QUANTITY</label>
                <input type="quantity" className="form-control" id="quantity" placeholder="82" autoComplete="off" required="required" name="quantity" value={quantity} onChange={(e)=> setQuantity(e.target.value)} />
                </div>
                <div className="col-auto">
                <label for="pcost">PURCHASE COST SINGLE</label>
                <input type="text" className="form-control" id="pcost" placeholder="Cost Per Piece" autoComplete="off" required="required" name="pcost" value={pcost} onChange={(e)=> setPcost(e.target.value)} />
                </div>
                <div className="col-auto">
                <label for="sprice">SALE PRICE SINGLE</label>
                <input type="text" className="form-control" id="sprice" placeholder="Price Per Piece" autoComplete="off" required="required" name="sprice" value={sprice} onChange={(e)=> setSprice(e.target.value)} />
                </div>
                <div className="col-auto">
                <label for="sprice">SALE PRICE SINGLE</label>
                <input type="text" className="form-control" id="sprice" placeholder="Price Per Piece" autoComplete="off" required="required" name="sprice" value={sprice} onChange={(e)=> setSprice(e.target.value)} />
                </div>
            </div>
            <br></br>
            <div className="form-row">
                <div className="col-m3">
                <label for="category">  CATEGORY NAME</label>
                <input type="text" className="form-control" id="category" placeholder="Furniture,Decore .etc" autoComplete="off" required="required" name="category" value={category} onChange={(e)=> setCategory(e.target.value)} />
                </div>
                <div className="col-auto">
                <label for="subCategory">SUB CATEGORY NAME</label>
                <input type="text" className="form-control" id="subCategory" placeholder="Sofa,Bed,Table .etc" autoComplete="off" required="required" name="subCategory" value={subCategory} onChange={(e)=> setSubCategory(e.target.value)} />
                </div>
                <div className="col-auto">
                <label for="color">PRODUCT COLOUR</label>
                <input type="text" className="form-control" id="color" placeholder="Colour" autoComplete="off" required="required" name="color" value={color} onChange={(e)=> setColor(e.target.value)} />
                </div>
                <div className="col-auto">
                <label for="dimention">PRODUCT DIMENTIONS</label>
                <input type="text" className="form-control" id="dimention" placeholder="width:100inch heigth:300inch" autoComplete="off" required="required" name="dimention" value={dimention} onChange={(e)=> setDimention(e.target.value)} />
                </div>
            </div>
            <br></br>
            
            <div className="form-row">
            <div className="form-group col-md-4">
                <label for="description">PRODUCT DESCRIPTION</label>
                <input type="text" className="form-control" id="description" placeholder="Complete Details About Product" autoComplete="off" required="required" name="description" value={description} onChange={(e)=> setDescription(e.target.value)} />
            </div>
                <div className="form-group col-md-4">
                <label className="form-label" for="customFile">SELECT PRODUCT IMAGE</label>
                <input type="file" className="form-control" id="image" name="image" value={image.name} onChange={onChangeImage} required="required" />
                </div>
              
                </div>
            </form>
          */}
            </div>
            </div>
            </div>

</>
    )

}


export default addProduct