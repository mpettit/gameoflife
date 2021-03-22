import { createStore } from 'redux';
import rootReducer from './rootReducer';

 //preloaded state or enhancers can go here
const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
