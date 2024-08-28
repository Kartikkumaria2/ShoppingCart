import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function Card2({ cart, setCart }) {
  const [data, setData] = useState([]);
  const [displayed, setDisplayed] = useState({});
  const [length, setLength] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function getProductDataAndCalculateTotal() {
      const fetchData = async (element) => {
        const response = await fetch(`https://fakestoreapi.com/products/${element}`);
        return response.json();
      };

      const promises = cart.map(fetchData);

      try {
        const productData = await Promise.all(promises);
        setData(productData);

        // Calculate the total price within the same hook
        const total = productData.reduce((acc, item) => {
          const count = cart.filter((id) => id === item.id.toString()).length;
          return acc + item.price * count;
        }, 0);
        setTotalPrice(total);

        // Update displayed items and lengths
        const occurrences = {};
        const lengthOccurrences = {};

        cart.forEach((element) => {
          productData.forEach((ele) => {
            if (ele.id === parseInt(element)) {
              occurrences[ele.id] = {
                image: ele.image,
                title: ele.title,
              };
              lengthOccurrences[ele.id] = cart.filter((item) => item === element).length;
            }
          });
        });

        setDisplayed(occurrences);
        setLength(lengthOccurrences);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    }

    getProductDataAndCalculateTotal();
  }, [cart]);

  const plusClick = function (e) {
    e.preventDefault();
    setCart((prevCart) => [...prevCart, e.target.getAttribute('attri')]);
  };

  const minusClick = function (e) {
    e.preventDefault();
    let id = e.target.getAttribute('attri');
    const itemIndex = cart.findIndex((item) => item === id);

    if (itemIndex !== -1) {
      const updatedCart = [...cart];

      if (updatedCart.filter((item) => item === id).length > 1) {
        const indexOfId = updatedCart.indexOf(id);
        updatedCart.splice(indexOfId, 1);
      } else {
        updatedCart.splice(itemIndex, 1);
      }

      setCart(updatedCart);
    }
  };

  return (
    <>
      {data.length !== 0 ? (
        Object.keys(displayed).map((element) => (
          <div key={element} className="flex flex-col h-60 mt-4 mb-4">
            <img src={displayed[element]["image"]} className="h-40" alt={`Product ${element}`} />
            <h5>{displayed[element]["title"]}</h5>
            <div className="flex">
              <button className="bg-green-500 w-1/2" attri={element} onClick={plusClick}>+</button>
              <p>{length[element] ? length[element] : 0}</p>
              <button className="bg-green-500 w-1/2 text-xl" onClick={minusClick} attri={element}>-</button>
            </div>
          </div>
        ))
      ) : (
        <h3>Oops! Cart is empty</h3>
      )}
      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
    </>
  );
}

Card2.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
};

export default Card2;
