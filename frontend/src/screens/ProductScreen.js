import React from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import {Row , Col, ListGroup, Card, Badge, Button } from "react-bootstrap"
import Rating from "../Components/Rating"
import { Helmet } from 'react-helmet-async'

const reducer = (state , action) =>{
  switch (action.type){
    case 'fetch_request' :
      return {...state , loading : true}
    case 'fetch_success' :
      return {...state , product : action.payload , loading : false}
    case 'fetch_fail' :
      return {...state , loading : false , error : action.payload}

      default : 
        return state
  }
}



const ProductScreen = () => {

    const params = useParams()
    const {slug} = params;


    const [{loading , error , product} , dispatch] = React.useReducer(reducer , {product : [] , loading : true , error : ""})

    console.log(product)
    React.useEffect(()=> {

      const fetchData = async ()=> {
        dispatch({type : "fetch_request"})
         try{ 
           const result = await axios.get(`/api/products/slug/${slug}`);
           dispatch({type : "fetch_success" , payload : result.data})
         }catch(err){
           dispatch({type : "fetch_fail" , payload : err.message})
         }
      }

      fetchData()
    } , [slug])


  return loading ? (<div>Loading ...</div>) : error ? (<div>{error}</div>)
  : (
  <div>
      <Row>
        <Col md={6}>
          <img className='img-large' src={product.image} alt={product.name}/>  
        </Col>

        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>

            <Rating rating={product.rating} numReviews={product.numReviews}></Rating>

            <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description : <p>{product.description}</p></ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.countInStock > 0 ? (<Badge bg="success">In Stock</Badge>) : (<Badge bg="danger">Unavailable</Badge>)}</Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <div className='d-grid'>
                    <Button variant='primary'>Add to Cart</Button>
                  </div>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card.Body>
        </Col>
      </Row>
  </div>)
}

export default ProductScreen