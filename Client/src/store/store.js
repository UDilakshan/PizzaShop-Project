// src/store/store.js
import { createStore } from 'redux';
import rootReducer from '../reducers'; // Assuming your rootReducer is in the reducers directory

// Create the Redux store with the root reducer
const store = createStore(rootReducer);

export default store;
