import {takeLatest, put} from 'redux-saga/effects'; 
import { fetchShopDataSuccess, fetchShopDataFailure } from './shop.actions';
import {firestore} from '../../firebase/firebase.utils';

function* fetchShopDataAsync() {
    try {
        const querySnapshot = yield firestore.collection('storeCollections').get();
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

        yield put(fetchShopDataSuccess(transformedData));
        
    } catch (error) {
        yield put(fetchShopDataFailure(error.message));
    }
}

export function* fetchShopData() {
    yield takeLatest('FETCH_SHOP_DATA_START', fetchShopDataAsync);
} 