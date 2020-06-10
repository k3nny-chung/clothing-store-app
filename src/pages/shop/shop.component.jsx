import React from 'react';
import './shop.styles.scss';
import { Route } from 'react-router-dom';
import CollectionsOverview from '../collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

const ShopPage = ({ match }) => (
   <div className="shop-page">
       <Route exact path={match.path} component={CollectionsOverview} />
       <Route path={`${match.path}/:category`} component={CollectionPage} />
   </div>
)

export default ShopPage;