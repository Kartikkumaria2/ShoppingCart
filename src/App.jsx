import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import './App.css'
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components'
import keyframes from 'styled-components';
import Sidebar from './Sidebar';
import Products from './Products';
import Electronics from './Electronics';
import Men from './Men';
import Women from './Women';
import Card2 from './Card2';
import { Link } from 'react-router-dom';
import left from "/src/assets/left.png";
import back from "/src/assets/back.jpg";
const Container = styled.div`
  display:flex;
  flex-direction:column;
  height:100vh;
  width:100%;
  `
  const Main = styled.div`
  width:100%;
  height:80vh;
  display: flex;
  align-items: ${(props)=>(props.name==="Products"||props.name ===undefined  ? "center":"flex-start")};
  justify-content: ${(props)=>(props.name==="Products"||props.name ===undefined ? "center":"flex-start")};
  background-image: ${(props) =>
    props.name === "Products" || props.name === undefined
      ? `url(${back})`
      : ""};
  background-size: ${(props) =>
    props.name === "Products" || props.name === undefined
      ? "cover"
      : ""};


  `;
  

const Carts = styled.div`
  visibility: ${(props) => (props.show === true ? "visible" : "hidden")};
  position: absolute;
  right: 0;
  margin-left: auto;
  width: 30vw;
  height: 100%;
  background-color: white;
  display:flex;
  flex-direction:column;
  color:black;
  overflow:scroll;
  
  ${(props) =>
    props.show &&
    css`
    animation-name: Ani2;
    animation-duration: 1s;
    animation-iteration-count: 1;
    `}
`;
function App() {
  const { name } = useParams();

  
  const [show,setShow] = useState(false);
  const [cart,setCart] = useState([]);
  
  

  return (
    <>
      <Container >
        <Sidebar cart = {cart} setCart = {setCart} setShow = {setShow}/>
        <Main name = {name}>
          {name===undefined?(
          <div className="lower1">
            <h3 style = {{color:'white'}}>Welcome to this all new exclusive store!</h3>
            <button className='btn'><Link to="/Products" className = "w-18">Shop now</Link></button>
          </div>):name==="Products"?(
            <Products />
          ):name==="electronics"?(
            <>
            
            <Electronics cart = {cart} setCart = {setCart}/>
            </>
          ):name==="men's clothing"?(
            <>
            
            <Men cart = {cart} setCart = {setCart} />
            </>
          ):name==="women's clothing"?(
            <>
            
            <Women cart = {cart} setCart = {setCart} />
            </>
          ):name ==="About"?(
            <div className='flex justify-center h-full w-full items-center'>
            <h1>Coming Soon!</h1>
            </div>
          ):null} 
        </Main>
        <Carts show = {show} className='pt-2 pl-2 pr-2'>
            <div className='flex '>
              <img src = {left} className='h-8 w-8' onClick={()=>setShow(false)}></img>
            <h2 className='text-center mr-auto ml-auto'>Cart items</h2>
            </div>
            <Card2 cart={cart} setCart = {setCart}/>
        </Carts>
        
        </Container>
    </>
  )
}

export default App
