import React from 'react';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';
import './collections-overview.styles.scss';
import { connect } from 'react-redux';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

const CollectionsOverviewPage = ({ collections }) => (

    <div className="collections-overview">
        { 
            collections.map( ({ id, ...otherCollectionProps }) => (
                <CollectionPreview key={id} {...otherCollectionProps} />
            ))
        }
    </div>
);

const mapStateToProps = (state) => ({
    collections: selectCollectionsForPreview(state)
});

export default connect(mapStateToProps)(CollectionsOverviewPage) ;