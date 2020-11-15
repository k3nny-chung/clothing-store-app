import React from 'react';
import './collection.styles.scss';
import { selectCollection } from '../../redux/shop/shop.selectors';
import CollectionItem from '../../components/collection-item/collection-item.component';
import { connect } from 'react-redux';

const CollectionPage = ({ collection }) => {

    if (!collection) 
        return (<div className="collection-page"></div>);

    return (
    <div className="collection-page">
        <h1 className="title">{ collection.title }</h1>
        <div className="items">
            { 
                collection.items.map(item => 
                    <CollectionItem key={item.id} item={item} />) 
            }
        </div>
    </div>
    );
}

const mapStateToProps = (state, props) => ({
    collection: selectCollection(props.match.params.category)(state)
})

export default connect(mapStateToProps)(CollectionPage);