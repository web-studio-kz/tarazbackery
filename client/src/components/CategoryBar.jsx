import React from 'react';

const CategoryBar = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
            {/* Кнопка для сброса фильтра */}
            <button
                onClick={() => onSelectCategory(null)}
                style={{ fontWeight: selectedCategory === null ? 'bold' : 'normal' }}
            >
                Все
            </button>
            {categories.map(category => (
                <button
                    key={category.id}
                    onClick={() => onSelectCategory(category)}
                    style={{ fontWeight: selectedCategory?.id === category.id ? 'bold' : 'normal' }}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
};

export default CategoryBar;