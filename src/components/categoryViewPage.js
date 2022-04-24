import React, {useState, useEffect} from 'react';
import "./item.css";
import {Grid, Card, CardActions, Fab, CardMedia,} from "@material-ui/core";
import { CardTitle } from 'reactstrap';
import {Add,} from "@material-ui/icons";
import {
  Container,
} from "react-bootstrap";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import addProduct from "components/AddProduct";
import pic1 from "./edit.jpg";
import {Link, useHistory} from "react-router-dom";
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import { TablePagination } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Tooltip } from '@material-ui/core';
import { Dialog,DialogActions, DialogContent, DialogContentText, DialogTitle,FormControlLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import Category from '@material-ui/icons/Category';
import config from 'config';
import { CardBody ,CardHeader} from 'reactstrap';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';




const CategoryViewPage = (props) => {




//////////////////// STYLING HOOKS/////////////////////////

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
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


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});



    const history = useHistory();
    const classes = useStyles();

    const [categoryData, setCategoryData] = useState({}); 
    const [isItem,setIsItem] = useState({})
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [snackOpen2, setSnackOpen2] = React.useState(false);
  
  

////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////





//////////////////////////// Fetch Record//////////////////////////////////////
    const viewCategoryData = async () => {
      const res = await axios.get(config.base_url+"/category/view"
      )
      .then(res =>{
          console.log(res);
          return res.data.data;
      }).catch(err =>{
          console.log(err)
      });

      setCategoryData(res);
    }
//---------------------------------------------------------------------------------------  



 const deleteConfirm = (IsItem) =>{

    setIsItem(IsItem)
    setDeleteDialogue(true)

 }




////////////////////////  DELETE  CATEGORY RECORD ////////////////////////////////

const deleteCategory = async () => {
  
  let id = isItem._id;
  console.log(isItem)
  const res = await axios.delete(config.base_url+`/category/delete?_id=${id}`)
       .then(res =>{
          console.log(res);
          viewCategoryData();
          setDeleteDialogue(false)
          return res.data;
      
    }).catch(err =>{
         console.log(err)
     });
 }


//------------------------------------------------------------------------------













//////////////////////////////// POST UPDATE DATA  ////////////////////////////////////

 const PostUpdate = async ()=>{
 let data = {};
  data._id = updateId;
  data.categoryName = category;
  data.active = state;


  axios.put(config.base_url+"/category/update",data)
  .then(res =>{
   if(res.data.code === 0){
     console.log(res);
     setCategory('')
     setState(true)
     viewCategoryData();
     handleClose(setOpenUpdateCategory,setCategoryError);
   }
   else{
     alert("A category with the same name exists in record")
     console.log("Category Already Exists");
   }
 
}).catch(err =>{
    console.log(err)
});




}


//-----------------------------------------------------------------------------------









////////////////////// CATEGORY DETAILS FOR UPDATE  ///////////////////////////////////////


const  CategoryDetails = (IsItem)=>{
  
  let id = IsItem.categoryName;
  setUpdateId(id);
  setCategory(IsItem.categoryName);
  setOpenUpdateCategory(true);
  
}

//---------------------------------------------------------------------------- 

   
     

    



//-----------------------------------------------------------------------------



    ///////////---CODE FOR ADDING NEW CATEGORY---///////////////

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


const deleteDialogueClose =()=>{
  setDeleteDialogue(false)
}



// handle Active Switch

const handleSwitch =()=>{

    setState(!state)
}


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

       if(openUpdateCategory === true){

              if(category === '')
               {
              setCategoryError(true)
              }
              else{
                PostUpdate()
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
     
    

      axios.post(config.base_url+"/category/add", categoryData)
      .then(res =>{
        console.log(res);
        if(res.data.code === 0){
          console.log(res);
          setCategory('')
          setState(true)
          viewCategoryData();
          handleClose(setOpenCategory,setCategoryError);
      
          
        }else{
          alert("A category with the same name exists in record")
          console.log("Category Already Exists");
        }
      })
      .catch(err =>{
          console.log(err)
      });

    }
    
}



/////////////////////// SETTING STATES ///////////////////////////

// Dialogues Box States
const [openCategory,setOpenCategory] = React.useState(false);


// setting variable States
const [category, setCategory ]= React.useState('');



// Errors Validation 
const [categoryError, setCategoryError] = React.useState(false);


// states for switch
const [state, setState] = React.useState(true);


// states for update 
const [openUpdateCategory, setOpenUpdateCategory] = React.useState(false);

const [updateId, setUpdateId] = React.useState('');

const [deleteDialogue, setDeleteDialogue] = React.useState(false);

//---------------------------------------------------------------------------------------------------
    
  
useEffect(() => {
  viewCategoryData();
}, [])



///////////////////////////////// REVERSING RECORD ARRAY ///////////////////////////////////////

 

   
    return (
     <Card >


       <Fab className="addBtnFloat" variant="extended"color="secondary" aria-label="Add" size="large" onClick={()=> handleClick(openCategory, setOpenCategory)} >
       <Tooltip title="Add Category" aria-label="add">
       
        <AddShoppingCartIcon />
          
          
            </Tooltip>
        </Fab>

          <CardHeader className="productsgallerybar" style={{backgroundColor:"#B68D40"}}>
          <CardTitle  style={{marginBottom:"0px", textAlign:"center" ,fontSize:"25px",fontFamily:"Baufra",color:"black"}}  > CATEGORIES   </CardTitle>
          </CardHeader>
        
        <CardBody>

        <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Category Name</StyledTableCell>
                    <StyledTableCell align="right">Active</StyledTableCell>
                    <StyledTableCell align="right">Created Date</StyledTableCell>
                    <StyledTableCell align="right">Last Modified</StyledTableCell>
                    <StyledTableCell align="right">Update</StyledTableCell>
                    <StyledTableCell align="right">Delete</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                   
                     {categoryData.length > 0 ? 
                      categoryData.map((IsItem, key) => (
                    <StyledTableRow key={key}>
                      <StyledTableCell component="th" scope="row">
                        {(IsItem.categoryName).toUpperCase()}
                      </StyledTableCell>
                      <StyledTableCell align="right">{IsItem.active === true ? 'TRUE' : 'FALSE'}</StyledTableCell>
                      <StyledTableCell align="right">{IsItem.createdDate}</StyledTableCell>
                      <StyledTableCell align="right">{IsItem.lastModified ? IsItem.lastModified : "N/A" }</StyledTableCell>
                      <StyledTableCell align="right">{
                        <IconButton aria-label="update" onClick={()=> CategoryDetails(IsItem)} >
                        <UpdateIcon  className ="deleteIconBlue"/>
                      </IconButton>}
                      </StyledTableCell>
                      <StyledTableCell align="right">{ 
                      <IconButton aria-label="delete" onClick={()=> deleteConfirm(IsItem)} >
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
                    open={openUpdateCategory}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                <DialogTitle className="dialogHeading" id="alert-dialog-title">Update Category</DialogTitle>
                <DialogContent className="dialogDescription">
                <DialogContentText id="alert-dialog-description">
                  <Grid container >

                  <TextField
                  error= {categoryError}
                  id="name"
                  label="Update Category Name"
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
                    <Button    onClick={()=>  handleClose(setOpenUpdateCategory,setCategoryError)} color="primary">
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
                       <h5>Note that Deleting this category will result in deletion of all subcategories and products which have this category.Are you Sure you want to delete category?</h5>
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
                        <button type="submit" onClick={deleteCategory} style={{outline:"none", background:"none", border:"none", color:"red"}}>
                            confirm
                        </button>
                      {/* </Link> */}
                    </Grid>
                 </Grid>
                </DialogActions>
            </Dialog>



       </CardBody>

           
       
      
     </Card>
    )
};

export default CategoryViewPage;
