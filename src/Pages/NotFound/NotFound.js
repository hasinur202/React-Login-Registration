import React from 'react';
import { Link } from 'react-router-dom';
import notfound from '../../images/404.png'
const NotFound = () => {
    return (
        <div>
            <Link style={{ position: "absolute", top: "30px" }} to="/"><button className='btn btn-info px-4'>Go Back</button></Link>
            <img style={{ width: '100%', height: 'auto', display: "block" }} src={notfound} alt="" />
        </div>
    );
};

export default NotFound;