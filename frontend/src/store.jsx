import { configureStore } from "@reduxjs/toolkit";
import card from './cardSlice';
const store=configureStore({
    reducer:{
        mycard:card
    }
})

export default store;