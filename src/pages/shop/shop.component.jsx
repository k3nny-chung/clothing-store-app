import React from 'react';
import './shop.styles.scss';
import { Route } from 'react-router-dom';
import CollectionsOverview from '../collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { connect } from 'react-redux';
import { updateShopData } from '../../redux/shop/shop.actions';
import { fetchShopData } from '../../firebase/firebase.utils';

class ShopPage extends React.Component {
    state = { loading: true }
    
    componentDidMount() {
        const { updateShopData } = this.props;
        fetchShopData().then( shopData => {
            updateShopData(shopData);
            this.setState({ loading: false });
        });
        
    }

    render() {
        const { match } = this.props;
        return (
            <div className="shop-page">
                <Route exact path={match.path} isShopDataLoading={this.state.loading} component={CollectionsOverview} />
                <Route path={`${match.path}/:category`} isShopDataLoading={this.state.loading} component={CollectionPage} />
            </div>
         );
    }
}

const mapDispatchToProps = dispatch => ({
    updateShopData: shopData => dispatch(updateShopData(shopData))
});

export default connect(null, mapDispatchToProps)(ShopPage);