import React from 'react';
import './user-account-page.styles.scss';
import UserProfile from '../../components/user-profile/user-profile.component';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFavoritesStart, fetchOrdersStart } from '../../redux/user/user.actions';
import Orders from '../../components/orders/orders.component';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import FavoriteList from '../../components/favorite-list/favorite-list.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { fetchShopDataStart } from '../../redux/shop/shop.actions';

const OrdersWithSpinner = WithSpinner(Orders);
const FavoriteListWithSpinner = WithSpinner(FavoriteList);

const UserAccountPage = ({ 
    fetchOrders, 
    fetchShopData,
    fetchFavorites,
    user, 
    orders, 
    shopCollections, 
    userFavorites, 
    isFetchingOrders,
    isFetchingFavorites 
}) => {
    
    useEffect(() => {
        if (user) {
            fetchOrders(user.email);   
        }     
    }, [user, fetchOrders]);

    useEffect(() => {
        if (!shopCollections) {
            fetchShopData();
        }
    }, [shopCollections, fetchShopData]);

    useEffect(() => { 
        fetchFavorites(user.id);
    }, [fetchFavorites, user, shopCollections]);

    const { path } = useRouteMatch();
    return (
    <div className="user-account-page">
        <UserProfile user={user} />
        <Switch>
            <Route exact path={path}>
                <OrdersWithSpinner isLoading={isFetchingOrders} orders={orders} />
            </Route>
            <Route exact path={`${path}/orders`}>
                <OrdersWithSpinner isLoading={isFetchingOrders} orders={orders} />
            </Route>
            <Route exact path={`${path}/favorites`}>
                <FavoriteListWithSpinner isLoading={isFetchingFavorites} 
                                        favoritedItemIds={userFavorites} 
                                        collections={shopCollections} />
            </Route>
        </Switch>
    </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    fetchOrders: (email) => dispatch(fetchOrdersStart(email)),
    fetchShopData: () => dispatch(fetchShopDataStart()),
    fetchFavorites: (userId) => dispatch(fetchFavoritesStart(userId))
});

const mapStateToProps = (state) => ({
    user: state.user.currentUser,
    orders: state.user.orders,
    shopCollections: state.shop.collections,
    userFavorites: state.user.favorites,
    isFetchingOrders: state.user.isFetchingOrders,
    isFetchingFavorites: state.user.isFetchingFavorites
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAccountPage);