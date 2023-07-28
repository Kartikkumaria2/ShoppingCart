import { styled } from "styled-components"
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import carter from "/src/assets/cart.png";

const Div = styled.div`
display:grid;
grid-template-columns:1fr 1fr 1fr;
grid-template-rows:repeat(auto-fit,16em);
padding:1em;
height:100%;
width:100%;
row-gap:1em;
column-gap:1em;

`
const Card2 = styled.div`
height:auto;
width:100%;
display:flex;
flex-direction:column;
justify-content:centre;

background-color:white;

`
function Card({data,cart,setCart}){

    const [length,setLength] = useState([])
    function filler() {
        const occurrences = {};
        cart.forEach((element) => {
          data.forEach((ele) => {
            if (ele["id"] == element) {
              occurrences[ele["id"]] = cart.filter((item) => item === element).length;
            }
          });
        });
        
        return occurrences;
      }
      
    useEffect(()=>{
        let occurences = filler() ;
        setLength(occurences);
    },[cart])
    

    const plusClick = function (e) {
        e.preventDefault();
        setCart((prevCart) => [...prevCart, e.target.getAttribute('attri')]);
        
      };
      
    const minusClick = function(e){
        e.preventDefault();
        let id =  e.target.getAttribute('attri');
        const itemIndex = cart.findIndex((item) => item === id);
  
  // If the item exists, decrement its count or remove it if count becomes zero
  if (itemIndex !== -1) {
    const updatedCart = [...cart];

    if (updatedCart.filter((item) => item === id).length > 1) {
      // If the item count is greater than 1, decrement its count
      const indexOfId = updatedCart.indexOf(id);
      updatedCart.splice(indexOfId, 1);
    } else {
      // If the item count is 1, remove the item from the cart
      updatedCart.splice(itemIndex, 1);
    }

    // Update the cart state
    setCart(updatedCart);
  }
        

    }
    

return (
    <Div>
        {
            data.map((element)=>(
                <Card2 className="pt-2 text-black" key ={element["id"]}>
                    <img className="self-center" src = {`${element["image"]}`} style = {{height:'50%',width:'50%'}}></img>
                    <h5 >{`${element["title"]}`}</h5>
                    <h5 >{`Price: ₹${element["price"]}`}</h5>
                    <div className = "flex justify-between relative bottom-0 mt-auto">
                        <h5>{`Rating: ★${element["rating"]["rate"]}`}</h5>
                        <div className="flex mr-2">
                            <img src = {carter} className="w-5 mr-4"></img>
                            
                            <button className = "bg-green-500 w-1/2" attri = {element["id"]} onClick={plusClick}>+</button>

                           <p >{length[element["id"]]?length[element["id"]]:0}</p>

                            <button className = "bg-green-500 w-1/2 text-xl" onClick={minusClick} attri = {element["id"]}>- </button>

                        </div>
                    </div>
                </Card2>
            ))
        }
    </Div>
)
}

Card.propTypes = {
    data:PropTypes.array,
    cart:PropTypes.array,
    setCart:PropTypes.func
}
export default Card