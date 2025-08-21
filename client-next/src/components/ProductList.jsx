import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products }) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {products.map(product => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;