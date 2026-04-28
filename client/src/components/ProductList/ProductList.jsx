import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import styles from './ProductList.module.css'; 

const ProductList = ({ products }) => {
    if (!products || products.length === 0) {
        return (
            <div className={styles.list}>
                {[...Array(8)].map((_, index) => (
                    <div key={index} className={styles.skeletonCard}></div>
                ))}
            </div>
        );
    }

    return (
        <div className={styles.list}>
            {products.map((product, index) => (
                <ProductItem key={product.id} product={product} index={index}/>
            ))}
        </div>
    );
};

export default ProductList;