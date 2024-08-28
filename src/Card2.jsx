import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function Card2({ cart, setCart }) {
  const [displayed, setDisplayed] = useState({});
  const [length, setLength] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate the total price and update displayed items and lengths
    const occurrences = {};
    const lengthOccurrences = {};

    const total = cart.reduce((acc, item) => {
      const id = item.id;
      const count = cart.filter((cartItem) => cartItem.id === id).length;

      occurrences[id] = {
        image: item.image,
        title: item.title,
      };

      lengthOccurrences[id] = count;

      return acc + item.price * count;
    }, 0);

    setTotalPrice(total);
    setDisplayed(occurrences);
    setLength(lengthOccurrences);

  }, [cart]);

  const plusClick = function (e) {
    e.preventDefault();
    const itemId = e.target.getAttribute('attri');
    const itemToAdd = cart.find(item => item.id.toString() === itemId);

    setCart((prevCart) => [...prevCart, itemToAdd]);
  };

  const minusClick = function (e) {
    e.preventDefault();
    const itemId = e.target.getAttribute('attri');
    const itemIndex = cart.findIndex((item) => item.id.toString() === itemId);

    if (itemIndex !== -1) {
      const updatedCart = [...cart];

      if (updatedCart.filter((item) => item.id.toString() === itemId).length > 1) {
        const indexOfId = updatedCart.findIndex(item => item.id.toString() === itemId);
        updatedCart.splice(indexOfId, 1);
      } else {
        updatedCart.splice(itemIndex, 1);
      }

      setCart(updatedCart);
    }
  };

  return (
    <>
      {cart.length !== 0 ? (
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
