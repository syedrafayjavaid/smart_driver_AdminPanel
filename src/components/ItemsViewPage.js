import React, {useState, useEffect} from 'react';
import "./item.css";
import {Grid, Card, CardActions, Fab, CardMedia,} from "@material-ui/core";
import {Add,} from "@material-ui/icons";
import axios from 'axios';
import {
  Container,
} from "react-bootstrap";

import addProduct from "components/AddProduct";
import pic1 from "./edit.jpg";
import {Link, useHistory} from "react-router-dom";
import config from 'config';




const ItemsViewPage = (props) => {


    const history = useHistory();

    const [productData, setProductData] = useState({}); 

    const viewProductData = async () => {
     
       console.log(config.base_url);
       
       console.log(config.base_url);
        const res = await axios.get(config.base_url+'/product/view')
        .then(res =>{
            console.log('viewProductData - res: ', res);
            setProductData(res.data.result);

        }).catch(err =>{
            console.log(err)
        });
    }


     const deleteProductData = async (IsItem) => {
      
      let id = IsItem._id;
      console.log(id)
          
     // const res = await axios.delete(`http://localhost:2000/product/delete?_id=${id}`)

      const res = await axios.delete(config.base_url+"/product/delete?_id="+id)
           .then(res =>{
              console.log(res);
              viewProductData();
              return res.data;
          
        }).catch(err =>{
             console.log(err)
         });

      
     }

    useEffect(() => {
      viewProductData();
    }, [])

    
   const productDetails = [
      //  {
      //      productImg: pic1,
      //      productName: "Chair",
      //      productDescription: "Good Product",
      //      productPurchaseCost: "$80",
      //      productSalePrice: "$200",
      //      productCategory: "Furniture",
      //      productSubCategory: "Sofa",
      //      productQuantity: "90",
      //      productColor: "Orange",
      //      productDimentions: "100inch",
      //  },
    //    {
    //     productImg: pic1,
    //     productName: "Tabel",
    //     productDescription: "Nice Product",
    //     productPurchaseCost: "$50",
    //     productSalePrice: "$100",
    //     productCategory: "Furniture",
    //     productSubCategory: "Bed",
    //     productQuantity: "10",
    //     productColor: "Brown",
    //     productDimentions: "300inch",
    //  },
   ]

    return (
     <div style={{position: "absolute"}}>
       
        <Fab className="addBtnFloat" variant="extended"color="secondary" aria-label="Add" size="large" >
        <Link  to = "/admin/addproductnew">
            <Add />
            Add Product  
            </Link>
        </Fab>
        
        <Grid container>
          <Grid item xs={12}>
          {
          productData?  
          productData.length > 0 ? 
            productData.map((IsItem, key) => (
                <Card className="mainCard" key={key}>
                <Grid container spacing={2}>
                   <Grid item xs={3}>
                     <CardMedia>
                       <div className="itemCardImageDiv">
                       {console.log("This is the image",IsItem.image[0])}
                         <img src={IsItem.image[0]} alt="pic1" className="img-fluid" />
                       </div>
                     </CardMedia>
                   </Grid>
                   <Grid item xs={7}>
                       <Grid container spacing={2}>
                          <Grid item xs={6}>
                              <div className="cardDetails">
                                 <div className="productTitle">
                                     <h3>Name: {IsItem.name}</h3>
                                 </div>
                                 <div className="productInfo">
                                    <p>{IsItem.description}</p>
                                    <p>Category: {IsItem.category}</p>
                                    <p>SubCategory: {IsItem.subCategory}</p>
                                 </div>    
                              </div>
                          </Grid>
                          <Grid item xs={6}>
                              <div className="cardDetails mt-5">
                                 <div className="productInfo">
                                    <p>Cost: {IsItem.purchaseCost}</p>
                                    <p>Sale Price: {IsItem.salePrice}</p>
                                    <p>Color: {IsItem.colour}</p>
                                    <p>Dimentions: {IsItem.dimention}</p>
                                 </div>    
                              </div>
                          </Grid>
                       </Grid>
                   </Grid>
                   <Grid item xs={2}>
                        <CardActions>
                            <Grid container spacing={3}>
                                <Grid item xs={12} className="mt-5">
                                <Link to={'/admin/updateproductnew/'+IsItem._id}>
                                   <button className="update-btn">Update</button>
                                </Link>
                                </Grid>
                                <Grid item xs={12}>
                                
                                    <button className="delete-btn" onClick={()=>deleteProductData(IsItem)}>Delete</button>

                                </Grid>
                            </Grid>
                        </CardActions>
                    </Grid>
                   
                </Grid>
             </Card>
            ))
            : 
            <strong>Data not Found</strong>
            :""
          }
           
          </Grid>
         
        </Grid>
      
     </div>
    )
};

export default ItemsViewPage;
