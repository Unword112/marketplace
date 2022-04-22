import React from 'react';

import { Link } from 'react-router-dom';

export default function CategoryCard({ category: {name, image } }) {
    return(
        <div>
            <p>{name}</p>
            <Link to={`/category/${name}`} className='text-base text-blue-500'>
                <img 
                    src={image}
                    alt={name}
                    classNmae='w-48 h-48 my-4 lg:my-6 mx-auto'
                />
                <p>Shop now</p>
            </Link>
        </div>
    )
}