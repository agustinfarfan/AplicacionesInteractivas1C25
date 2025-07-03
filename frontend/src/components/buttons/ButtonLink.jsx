import React from 'react'
import { Link } from 'react-router-dom';

const ButtonLink = ({ href, nombre }) => {
    return (
        <Link to={href} className="w-full text-nowrap bg-indigo-600 px-4 py-2 rounded-md text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {nombre}
        </Link>
    )
}

export default ButtonLink