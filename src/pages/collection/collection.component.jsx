import React from 'react';
import './collection.styles.scss';
import { selectCollection } from '../../redux/shop/shop.selectors';
import CollectionItem from '../../components/collection-item/collection-item.component';
import { connect } from 'react-redux';

const CollectionPage = ({ collection }) => (
    <div className="collection-page">
        <h2 className="title">{ collection.title }</h2>
        <div className="items">
            { 
                collection.items.map(item => 
                    <CollectionItem key={item.id} item={item} />) 
            }
        </div>
    </div>
);

const mapStateToProps = (state, props) => ({
    collection: selectCollection(props.match.params.category)(state)
});

export default connect(mapStateToProps)(CollectionPage);