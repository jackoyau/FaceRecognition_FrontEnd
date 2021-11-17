import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.jpeg';
import './Logo.css';

const Logo = () => {
    return(
        <div className='ma4 mt0 mb0'  style={{position: 'relative', top:'-2rem'}}>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: '20%', width: '20%' }} >
                <div className="Tilt-inner pa1"> <img style={{borderRadius:3}} alt='logo' src={brain}/> </div>
            </Tilt>
        </div>
        
    );
}

export default Logo;