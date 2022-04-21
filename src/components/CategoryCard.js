import React from 'react';

import { Link } from 'react-router-dom';

export default function CategoryCard({ category: {name, image } }) {
    return(
        <div>
            <p>{name}</p>
            
        </div>
    )
}