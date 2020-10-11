import React from 'react';
import './search-page.styles.scss';
import { useState } from 'react';
import { connect } from 'react-redux';
import { fetchShopDataStart } from '../../redux/shop/shop.actions';
import { useEffect } from 'react';
import Search from '../../components/search/search.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const SearchWithSpinner = WithSpinner(Search);

const SearchPage = ({ collections, fetchShopData, isShopDataLoading }) => {
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        if (!collections) {
            fetchShopData();
        }
    }, [collections, fetchShopData]);

    const inputOnChange = (event) => setSearchText(event.target.value);
    
    return (
        <div className="search-page">
            <div className="form-group">
                <input 
                    className="form-input" 
                    placeholder="search by typing keywords..." 
                    onChange={inputOnChange} 
                    value={searchText}
                    maxLength="100" 
                    autoFocus
                />
            </div>
            <div>
                <SearchWithSpinner 
                    isLoading={isShopDataLoading} 
                    searchText={searchText} 
                    collections={collections} /> 
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    collections: state.shop.collections,
    isShopDataLoading: state.shop.isFetching
});

const mapDispatchToProps = (dispatch) => ({
    fetchShopData: () => dispatch(fetchShopDataStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);