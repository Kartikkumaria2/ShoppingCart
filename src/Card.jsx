import { styled } from "styled-components";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import carter from "/src/assets/cart.png";

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(auto-fit, 16em);
  padding: 1em;
  height: 100%;
  width: 100%;
  row-gap: 1em;
  column-gap: 1em;
`;

const Card2 = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
`;

function Card({ data, cart, setCart }) {
  const [length, setLength] = useState([]);

  function filler() {
    const occurrences = {};
    cart.forEach((cartItem) => {
      data.forEach((item) => {
        if (item["id"] === cartItem["id"]) {
          occurrences[item["id"]] = cart.filter((cartItem) => cartItem["id"] === item["id"]).length;
        }
      });
    });
    return occurrences;
  }

  useEffect(() => {
    let occurrences = filler();
    setLength(occurrences);
  }, [cart]);

  const plusClick = function (e) {
    e.preventDefault();
    const itemId = e.target.getAttribute('attri');
    const item = data.find(item => item.id === Number(itemId));
    if (item) {
      setCart((prevCart) => [...prevCart, item]);
    }
  };

  const minusClick = function (e) {
    e.preventDefault();
    const itemId = e.target.getAttribute('attri');
    const itemIndex = cart.findIndex((item) => item.id === Number(itemId));

    if (itemIndex !== -1) {
      const updatedCart = [...cart];

      if (updatedCart.filter((item) => item.id === Number(itemId)).length > 1) {
        const indexOfId = updatedCart.findIndex((item) => item.id === Number(itemId));
        updatedCart.splice(indexOfId, 1);
      } else {
        updatedCart.splice(itemIndex, 1);
      }

      setCart(updatedCart);
    }
  };

  return (
    <Div>
      {data.map((item) => (
        <Card2 className="pt-2 text-black" key={item["id"]}>
          <img className="self-center" src={item["image"]} style={{ height: '50%', width: '50%' }} alt={item["title"]} />
          <h5>{item["title"]}</h5>
          <h5>{`Price: ₹${item["price"]}`}</h5>
          <div className="flex justify-between relative bottom-0 mt-auto">
            <h5>{`Rating: ★${item["rating"]["rate"]}`}</h5>
            <div className="flex mr-2">
              <img src={carter} className="w-5 mr-4" alt="cart icon" />
              <button className="bg-green-500 w-1/2" attri={item["id"]} onClick={plusClick}>+</button>
              <p>{length[item["id"]] ? length[item["id"]] : 0}</p>
              <button className="bg-green-500 w-1/2 text-xl" onClick={minusClick} attri={item["id"]}>-</button>
            </div>
          </div>
        </Card2>
      ))}
    </Div>
  );
}

Card.propTypes = {
  data: PropTypes.array,
  cart: PropTypes.array,
  setCart: PropTypes.func
};

export default Card;
