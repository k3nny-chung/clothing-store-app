import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';
//import thunk from 'redux-thunk';

const sagaMiddleware = createSagaMiddleware();

const middleWares = [ sagaMiddleware];

// middleWares.push(thunk);

if (process.env.NODE_ENV === 'development') {
    middleWares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middleWares));
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);