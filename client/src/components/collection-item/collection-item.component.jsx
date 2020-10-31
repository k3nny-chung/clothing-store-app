import React from 'react';
import './collection-item.styles.scss';
import { connect } from 'react-redux';
import { addItem, toggleCartDropdown } from '../../redux/cart/cart.actions';
import {ReactComponent as HeartIcon} from '../../assets/favorite-24px.svg';
import { saveFavorite, removeFavorite } from '../../redux/user/user.actions';
import { withRouter } from 'react-router-dom';

const CollectionItem = ({ 
    item, 
    addItemToCart, 
    user, 
    userFavorites, 
    favorite, 
    unfavorite, 
    history,
    location 
}) => {
    const { name, price, imageUrl } = item;

    let isFavorited = false;
    if (userFavorites) {
        isFavorited = userFavorites.includes(item.id);
    }
    
    return (
        <div className="collection-item">
            <HeartIcon title="Add to Favorites" className={`heart-icon ${isFavorited ? 'favorited' : ''}`} onClick={() => { 
                if (user) {
                    isFavorited ? unfavorite(user.id, item.id) : favorite(user.id, item.id);
                } else {
                    history.push({
                        pathname: '/signin',
                        state: { 
                            from: location.pathname,
                            x: window.scrollX,
                            y: window.scrollY  
                        }
                    });
                }
             }} />
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

const mapStateToProps = (state) => ({
    user: state.user.currentUser,
    userFavorites: state.user.favorites
});

const mapDispatchToProps = (dispatch) => ({
    addItemToCart: (item) => { 
        dispatch(addItem(item));
        dispatch(toggleCartDropdown());
    },
    favorite: (userId, itemId) => dispatch(saveFavorite({ userId, itemId })),
    unfavorite: (userId, itemId) => dispatch(removeFavorite({ userId, itemId }))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CollectionItem));