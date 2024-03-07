import {combineReducers, configureStore} from "@reduxjs/toolkit";
import signSlice from "../slices/signSlice";
import storageSession from "redux-persist/lib/storage/session";
import {persistReducer} from "redux-persist";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";

const reducers = combineReducers({
    member: signSlice.reducer
});

const persistConfig = {
    key: 'root',
    storage: storageSession
};

const persistreducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistreducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

export default store;