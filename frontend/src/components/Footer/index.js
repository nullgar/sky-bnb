import React, { useState } from 'react';
import './Footer.css'
function Footer() {



  return (
    <div className='footer'>
        <div className='devFooter'>
            <p>Developed by Jonatan Aguilar</p>
        </div>
        <div className='techFooter'>
            <ul className='footerUl' >Technologies Used
                <li className='footerLi' >React</li>
                <li className='footerLi' >Redux</li>
                <li className='footerLi' >PostgreSQL</li>
                <li className='footerLi' >NodeJs</li>
            </ul>
        </div>
        <div className='devLinks'>
            <a className='footerLink' href='https://github.com/nullgar/sky-bnb'>Github</a>
        </div>

    </div>
  );
}

export default Footer;
