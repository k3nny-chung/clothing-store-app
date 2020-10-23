import React from 'react';
import './favorite-list.styles.scss';
import CollectionItem from '../collection-item/collection-item.component';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const FavoriteList = ({ favoritedItemIds, collections }) => {
    let favorites = [];
    for (let collection in collections) {
        const items = collections[collection].items;
        items.forEach( item => {
            if (favoritedItemIds.includes(item.id)) {
                favorites.push(item);
            } 
        });
    }

    return (
        <div className="favorite-list">
            <h2>FAVORITES</h2>
            { favorites.length === 0 && <p>You haven't added anything to your favorites yet.</p> }

            <TransitionGroup className="favorite-grid">
                
                    {favorites.map(favorite => (
                        <CSSTransition key={favorite.id} timeout={500} classNames="favorite-item">
                            <CollectionItem key={favorite.id} item={favorite} />
                        </CSSTransition>
                    ))}
            
            </TransitionGroup>
        </div>
    );
};

export default FavoriteList;