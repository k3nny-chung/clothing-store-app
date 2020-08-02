import React from 'react';
import './shop.styles.scss';
import { Route } from 'react-router-dom';
import CollectionsOverview from '../collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { connect } from 'react-redux';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { fetchShopDataAsync } from '../../redux/shop/shop.actions';


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);


class ShopPage extends React.Component {
       
    componentDidMount() {
        this.props.fetchShopDataAsync();
    }

    render() {
        const { match, isShopDataLoading } = this.props;
        return (
            <div className="shop-page">
                <Route exact path={match.path} 
                    render={ props => <CollectionsOverviewWithSpinner isLoading={isShopDataLoading} {...props} /> } />
                <Route path={`${match.path}/:category`}
                    render={ props => <CollectionsPageWithSpinner isLoading={isShopDataLoading} {...props} /> } />
            </div>
         );
    }
}

const mapStateToProps = (state) => ({
    isShopDataLoading: state.shop.isFetching
});

const mapDispatchToProps = (dispatch) => ({
    fetchShopDataAsync: () => dispatch(fetchShopDataAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);