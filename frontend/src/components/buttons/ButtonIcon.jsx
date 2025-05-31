import React from 'react'
import { Link } from 'react-router-dom';

const ButtonIcon = ({ href, imgSrc }) => {
    return (
        <Link to={href} className="w-full px-2 py-2 rounded-md text-white text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200">        
            <img className="size-7" src={imgSrc} alt="Logo" />       
        </Link>
    )
}

export default ButtonIcon


