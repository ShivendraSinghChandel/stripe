import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

const initialState = {
    card: [],
    totalQuantity: 0
};

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            
            // Check if the item already exists in the cart
            const existingItem = state.card.find(p => p.id === newItem.id);
        
            if (existingItem) {
               message.error("Product already added in the cart");
            } else {
                // If the item doesn't exist, add it to the cart with quantity 1
                state.card.push({ ...newItem, qnty: 1 });
                message.success("Product added to cart!");
            }
        
            // Recalculate the total quantity after the change
            state.totalQuantity = state.card.reduce((acc, item) => acc + item.qnty, 0);
        },
        
        decreaseQuantity: (state, action) => {
            const itemToDecrease = action.payload;
            const itemExists = state.card.find(p => p.id === itemToDecrease.id);
            
            if (itemExists) {
                if (itemExists.qnty === 1) {
                    alert("Cannot decrement quantity less than 1");
                } else {
                    itemExists.qnty--;
                }
            }

            // Recalculate the total quantity after decreasing
            state.totalQuantity = state.card.reduce((acc, item) => acc + item.qnty, 0);
        },

        increaseQuantity: (state, action) => {
            const itemToIncrease = action.payload;
            const itemExists = state.card.find(p => p.id === itemToIncrease.id);
            
            if (itemExists) {
                itemExists.qnty++;
            }

            // Recalculate the total quantity after increasing
            state.totalQuantity = state.card.reduce((acc, item) => acc + item.qnty, 0);
        },

        removeItem: (state, action) => {
            // Remove item by ID
            state.card = state.card.filter(item => item.id !== action.payload);

            // Recalculate total quantity
            state.totalQuantity = state.card.reduce((acc, item) => acc + item.qnty, 0);
        }
    }
});

export default cardSlice.reducer;

export const { addToCart, decreaseQuantity, increaseQuantity, removeItem } = cardSlice.actions;
