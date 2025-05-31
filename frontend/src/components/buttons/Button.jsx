
import React from 'react'

const Button = ({nombre}) => {
  
  
    return (
        <button className="w-full bg-indigo-600 px-4 py-2 rounded-md text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {nombre}
        </button>
    )
}

export default Button