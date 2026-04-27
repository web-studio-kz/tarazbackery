import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import styles from './ProductList.module.css'; 

const ProductList = ({ products }) => {
    return (
        <div className={styles.list}>
            {products.map((product, index) => (
                <ProductItem key={product.id} product={product} index={index}/>
            ))}
        </div>
    );
};

export default ProductList;