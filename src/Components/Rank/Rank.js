import React from 'react';

const Rank = ({ name , entries}) => {
    return(
        <div className='ma1'>
            <div className='white f2 ma0 mb4' style={{position:'relative', top:'-2rem'}}>
                AI Deepfake Detection System
            </div>
            <div className='white f3'>
                {`${name}, The Total Number of Detected Deepfakes is...`}
            </div>
            <div className='white f2'>
                {entries}
            </div>
        </div>
    );
}

export default Rank;