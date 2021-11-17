import React from 'react';
import './ImageLinkForm.css';



const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return(
        <div >
            <p className='f4 white'>
                {'This AI computer will detect faces in your pictures. Find out the Deepfake!'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center ba b--white' type='text' onChange={onInputChange}></input>
                    <button 
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple ba b--light-purple'
                        onClick={onButtonSubmit}    
                    >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;