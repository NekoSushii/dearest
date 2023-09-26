// src/components/NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <div className='navbar'>
      <li className='navitem_float_left'>
          <Link to={'/dearest'} className='navlink'>Home</Link>
      </li>
      <li className='navitem_float_left'>
          <Link to={'/calendar'} className='navlink'>Calendar</Link>
      </li>
    </div> 
  );
}

export default NavigationBar;
