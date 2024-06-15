import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../reducers/userReducer";
import thunkMiddleware from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () => configureStore({
    reducer: {
      userState: userReducer
    },
    middleware: [thunkMiddleware]
  });
  
export const wrapper = createWrapper(makeStore);