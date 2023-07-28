import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import './Display.css'
import { Link } from 'react-router-dom';

const card1 = keyframes`
  0%{
    height:100%;
    width:20vw;
  }
  100%{
    height:110%;
    width:25vw;
  }
`;

const Display = styled.div`
    display:flex;
    justify-content:space-between;
    width:80%;
    height:50%;
    gap:2em;
    `
    const Card1 = styled.div`
  width: 20vw;
  color: black;
  height: 100%;
  background-color: beige;

  &:hover {
    animation: ${card1} 0.5s ease-in-out forwards;
  }
`;

function ProductDisplay({data}){
    
    
    return(
        <Display>
  {data.map((element) =>
    element !== 'jewelery' ? (
     <Link to ={`/${element}`} key = {element}><Card1 key={element}>
        <h3>{element}</h3>
        <img src={`./src/assets/${element}.jpeg`} style={{ height: '100%' }} alt={element} />
      </Card1></Link> 
    ) : null
  )}
</Display>

    )
}

ProductDisplay.propTypes={
    data:PropTypes.array
}
export default ProductDisplay;