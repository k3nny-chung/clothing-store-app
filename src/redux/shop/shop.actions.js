import { firestore } from '../../firebase/firebase.utils';

export const fetchShopDataStart = () => ({
    type: 'FETCH_SHOP_DATA_START'
});

export const fetchShopDataSuccess = (collections) => ({
    type: 'FETCH_SHOP_DATA_SUCCESS',
    payload: collections
});

export const fetchShopDataFailure = (error) => ({
    type: 'FETCH_SHOP_DATA_ERROR',
    payload: error
});

export const fetchShopDataAsync = () => {
    return async (dispatch) => {
        dispatch(fetchShopDataStart());
        
        try {
            const querySnapshot = await firestore.collection('storeCollections').get();
            let transformedData = querySnapshot.docs.map( doc => {
                const { title, items } = doc.data();
                return {
                    id: doc.id,
                    title,
                    items,
                    routeName: encodeURI(title).toLowerCase()
                };
            });

            transformedData = transformedData.reduce( (hashTable, current) => {
                hashTable[current.title.toLowerCase()] = current;
                return hashTable;
            }, {});

            dispatch(fetchShopDataSuccess(transformedData));
            
        } catch (error) {
            dispatch(fetchShopDataFailure(error.message));
        }
        
    }
};