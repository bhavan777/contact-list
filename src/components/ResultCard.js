import React from 'react';
import '../styles/resultcard.css';

const ResultCard = ({name, address, items, pincode}) =>(
  <div className='result'>
    <div className='card'>
      <div className='header'>
        <h3>{name}</h3>
      </div>
      <div className='body'>
        <p><span className='title'>Address:</span> <span className='small'>{address+', '+pincode}</span></p>
        <p>
        <span className='title'>Orders:</span>
        <span className='smaller'>{items.join(', ')}</span>
        </p>
      </div>  
    </div>  
  </div>  
);

export default ResultCard;