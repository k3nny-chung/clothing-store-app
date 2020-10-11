import React from 'react';
import './search.styles.scss';
import CollectionItem from '../collection-item/collection-item.component';

const Search = ({ searchText, collections }) => {
    let result = [];
    if (searchText !== '') {
        const searchTextCaps = searchText.toUpperCase();
        for (let collection in collections) {
            const items = collections[collection].items;
            if (collection.toUpperCase().includes(searchTextCaps)) {
                result.push(...items);
            } else {
                items.forEach(item => {
                    if (item.name.toUpperCase().includes(searchTextCaps)) {
                        result.push(item);
                    }
                });
            }
        }
    }
    
    return (
        <div className="search-result">
            { searchText.length > 0 && <div className="number-items">{ result.length } items found</div> }
            
            <div className="search-result-grid">
                { result.map( item => <CollectionItem key={item.id} item={item} />)}
            </div>
        </div>
    );
};

export default Search;