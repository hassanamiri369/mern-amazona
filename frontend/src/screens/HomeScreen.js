import React , {useReducer , useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import logger from "use-reducer-logger"

import {Row , Col} from "react-bootstrap"
import Product from '../Components/Product'



// const reducer = ( state , action) => {
//     switch(action.type){
//         case "FETCH_REQUEST":
//             return{...state , loading : true}
//         case "FETCH_SUCCESS":
            
//             return {...state , products : action.payload , loading : false}
//         case "FETCH_FAIL":
//             return {...state  , loading : false , error : action.payload}
//         default : 
//             return state

//     }
// }


const HomeScreen = () => {

    // const [{loading , error , products} , dispatch] = useReducer(logger(reducer) , {products : [] , loading : true, error : ""})
    // console.log(products)

    const [products , setProducts] = React.useState([])
    const [loading , setLoading] = React.useState(true)
    const [error , setError] = React.useState("")
    
    useEffect(()=> {
        const fetchData = async ()=>{
            // dispatch({type : "FETCH_REQUEST"})      
        //    try{
        //     const result = await axios.get("/api/products")
        //     dispatch({type : "FETCH_SUCCESS " , payload : result.data})

        //    }
        //    catch(error){
        //     dispatch({type : "FETCH_FAIL" , payload : error.message})
        //    }

            setLoading(true)
            try{
                const result = await axios.get("/api/products")
                setProducts(result.data)
                setLoading(false)
            }catch(err){
                setError(err)
            }

        
            


        }
        fetchData()
    },[])
  return (
    <>
        <h1>Featured Products</h1>
        <div className="products">
            {/* conditional rendering */}
        {
         loading ? <div>Loading ...</div> 
        :
        error ? <div>{error}</div>
        :
        <Row>
            {(products.map((product) => (
          <Col key={product.slug} sm={6} md={4} lg={3}>
              <Product product ={product}></Product>
          </Col>
        )))}
        </Row>
        
        }
        </div>
       
    </>
  )
}

export default HomeScreen