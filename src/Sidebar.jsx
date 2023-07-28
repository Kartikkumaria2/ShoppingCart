import styled, { css } from 'styled-components'
import './Sidebar.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState,useEffect } from 'react';

const Container = styled.div`
width:100%;
height:20vh;
display:grid;
grid-template-columns:100%;
grid-template-rows: 1fr 1fr;
background-color:black;
color:white;
`

function Sidebar({cart,setCart,setShow}){

    const [length,setlength] = useState(cart.length)

    useEffect(()=>{
        let dummy = cart.length;
        setlength(dummy)
    },[cart])

return(
    <>
    <Container>
        <div className="upper1">
            <h1>Kartik's Store</h1>
        </div>
        <div className="upper2">
            <Link to ="/"><h3>Home</h3></Link>
            <Link to="/Products"><h3>Products</h3></Link>
            <Link to = "/About"><h3>About</h3></Link>
            <div className='flex gap-2'>
            <Link><h3 onClick={()=>setShow(true)}>cart</h3></Link>
            <h4 >{length}</h4>
            </div>
        </div>
    </Container>
    </>
)
}

Sidebar.propTypes = {
    cart:PropTypes.array,
    setCart:PropTypes.func,
    setShow:PropTypes.func
}
export default Sidebar