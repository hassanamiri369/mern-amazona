import React , {useContext} from "react"
import {BrowserRouter , Link, Route , Routes} from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen";

import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import {LinkContainer} from "react-router-bootstrap"
import { Badge, Nav } from 'react-bootstrap';
import { Store } from './Store';

function App() {
  // const {state : {cart}} = useContext(Store)
  const {state } = useContext(Store)
  const {cart} = state;

  
  return (
   <>
      <BrowserRouter>
      <div className='site-container d-flex flex-column '>
      <header>
        <Navbar bg="dark" variant='dark'>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>amazona</Navbar.Brand>
            </LinkContainer>

            <Nav to="/cart" className='nav-link'>
              Cart {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">{cart.cartItems.length}</Badge>
              )}
            </Nav>
          </Container>
        </Navbar>
        
      </header>
        
      <main>
      <Container>
        <Routes>
            <Route path="/product/:slug" element={<ProductScreen/>}/>
            <Route path="/" element={<HomeScreen/>}/>
        </Routes>  
      </Container>  
      </main>

      <footer>
        <div className='text-center'>All rights reserved</div>
      </footer>
    </div>
      </BrowserRouter>
   </>
  );
}

export default App;
