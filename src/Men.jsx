import { useEffect, useState } from "react";
import Card from "./Card";
import PropTypes from 'prop-types';

function Men({cart,setCart}){
    let response = null;
        const [data,setData] = useState(null);
        const [loading,setloading] = useState(true);
        
    

    useEffect(()=>{
        async function fetcher1(){
            try{
            response =  await fetch("https://fakestoreapi.com/products/category/men's clothing");
            response = await response.json();
            
            await setData(response);
        }
            catch(error){
                console.log(error);
            }
            finally{
                setloading(false);
            }
        }
        
    
        fetcher1();
    },[])

    return(
        <>
        {
            loading===true?(
                <h1>Loading......</h1>
            ):<Card data = {data} cart = {cart} setCart = {setCart}/>
        }
        </>
    )
    

}

Men.propTypes = {
    cart:PropTypes.array,
    setCart:PropTypes.func
}
export default Men;