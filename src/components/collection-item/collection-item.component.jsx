import React from 'react';
import './collection-item.styles.scss';
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';

const CollectionItem = ({ item, addItemToCart }) => {
    const { name, price, imageUrl } = item;
    return (
        <div className="collection-item">
            <div className="image"
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}>
            </div>
            <div className="collection-footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <button className="add-to-cart" type="button" onClick={() => addItemToCart(item)}>Add to cart</button>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    addItemToCart: (item) => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(CollectionItem);