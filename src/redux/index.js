import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import RootReducer from './Reducers';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';

const Store = configureStore({
  reducer: RootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

let Persistor = persistStore(Store);

export { Store, Persistor };
