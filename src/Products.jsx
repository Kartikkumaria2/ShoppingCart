import { useEffect } from "react";
import { useState } from "react";
import ProductDisplay
 from "./ProductDisplay";
 
function Products(){
    let response= null;
    const [loading,setLoading] = useState(true);
    const [data,setData] = useState(null);

    useEffect(()=>{
        async function fetchdata(){
            try{
                response = await fetch('https://fakestoreapi.com/products/categories');
                response = await response.json();
                
                setData(response)
                
            }
            catch(error){
                console.log(error);
            }   
            finally{(setLoading(false))
                
            }
        }
        fetchdata();
        
        
    },[])

    return(
        <>
        {
            loading===true?(
                <h1>Loading.....</h1>
                
            ):(<ProductDisplay data = {data}/>)
          
        }
        </>
    )
}
export default Products;