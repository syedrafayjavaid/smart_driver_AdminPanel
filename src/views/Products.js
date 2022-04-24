import React from "react";
import Background from "assets/img/background.jpg";
import AddItems  from "./AddItems.js"

// react-bootstrap components
import {
  Badge,
  Button,
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



function addproducts(){

  return (
    <>
    <Container fluid style={{ backgroundImage: `url(${Background})`, backgroundSize:"cover",backgroundRepeat:"no-repeat"}}>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

    <Row className="justify-content-md-center">

    <Card className="card text-center " bg="dark">
      <CardHeader></CardHeader>
      <Card.Title style={{color:"white", fontFamily:"initial" ,fontSize:25}}> PRODUCTS  </Card.Title>
      
   
    <Card.Body>

        <Card className="card text-center col-auto"  border="dark" bg="secondary" >
       <Card.Body>
      
       <Link to={'/admin/addproductnew'}>
       <Button
         className="btn-fill pull-right"
          type="submit"
           variant="danger"
            >
             ADD PRODUCT
         </Button>
        </Link>
        </Card.Body>
      </Card>
      <Card className="card text-center col-auto " border="secondary" bg="secondary" >
       <Card.Body>

      <Link to={'/admin/viewproduct'}>

        <Button
          className="btn-fill pull-right"
            type="submit"
            variant="success"
              >
              EDIT PRODUCTS
         </Button>
      </Link>
        </Card.Body>
      </Card>
  
          
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
  );
}

export default addproducts;
