import React from 'react';
import './shop.styles.scss';
import { Route } from 'react-router-dom';
import CollectionsOverview from '../collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { connect } from 'react-redux';
import { fetchShopDataStart } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);


class ShopPage extends React.Component {
       
    componentDidMount() {
        this.props.fetchShopData();
    }

    componentWillUpdate() {
        const { location } = this.props;
        if (location.state) {
            window.scroll({
                top: location.state.y || 0, 
                left: location.state.x || 0,
                behavior: 'smooth'
            });
        }
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
    fetchShopData: () => dispatch(fetchShopDataStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);