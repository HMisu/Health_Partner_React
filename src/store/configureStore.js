import {combineReducers, configureStore} from "@reduxjs/toolkit";
import memberSlice from "../slices/memberSlice";
import storageSession from "redux-persist/lib/storage/session";
import {persistReducer} from "redux-persist";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import todoSlice from "../slices/todoSlice";
import foodSlice from "../slices/foodSlice";
import waterSlice from "../slices/waterSlice";
import batchSlice from "../slices/batchSlice";

const reducers = combineReducers({
    member: memberSlice,
    todo: todoSlice,
    food: foodSlice,
    water: waterSlice,
    batch: batchSlice
});

const persistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ['member', 'todo', 'food', 'water', 'batch']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        })
});

export default store;
