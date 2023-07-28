import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useState } from 'react';

function Card2({ cart, setCart }) {
    let response =null;
    const [data,setData] = useState([])
    
    const [displayed,setDisplayed] = useState([]);
    useEffect(() => {
        async function getProductData() {
          const fetchData = async (element) => {
            const response = await fetch(`https://fakestoreapi.com/products/${element}`);
            return response.json();
          };
    
          const promises = cart.map(fetchData);
    
          try {
            const productData = await Promise.all(promises);
            setData(productData);
          } catch (error) {
            console.error('Error fetching product data:', error);
          }
        }
        
        getProductData();
        
        
        

      }, [cart]);
      
     function filler2(){
        const occurrences = {};
        cart.forEach((element) => {
          data.forEach((ele) => {
            if (ele["id"] == element) {
              occurrences[ele["id"]] = {
                image:ele["image"],
                title:ele["title"]
              };
                
            }
          });
        });
        
        return occurrences;
      }
     
     
     
      useEffect(() => {
        async function updatedData() {
          let occurences = filler2();
          setDisplayed(occurences);
        console.log(typeof displayed)
        }
      
        updatedData();
        console.log(displayed);
      }, [data]);
      

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
    },[data])
    

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

  // Card2 component doesn't render any content, so we return null
  return (
    <>
    
    {data.length!==0?Object.keys(displayed).map((element) => (
  <div key={element} className="flex flex-col h-60 mt-4 mb-4">
    <img src={displayed[element]["image"]} className="h-40" alt={`Product ${element}`} />
    <h5>{displayed[element]["title"]}</h5>
    <div className='flex'>
      <button className="bg-green-500 w-1/2" attri={element} onClick={plusClick}>+</button>
      <p>{length[element] ? length[element] : 0}</p>
      <button className="bg-green-500 w-1/2 text-xl" onClick={minusClick} attri={element}>-</button>
    </div>
  </div>
)):(<h3>Oops!Cart is empty</h3>)}
    </>
  )
}

Card2.propTypes = {
  cart: PropTypes.array,
  setCart: PropTypes.func,
};

export default Card2;
