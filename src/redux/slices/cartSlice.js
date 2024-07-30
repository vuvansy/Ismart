import { createSlice, payLoadAction } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartItems: (state, action) => {
            state.items = action.payload;
        },
        addToCart: (state, action) => {
            const existingItem = state.items.find(
                //action.payload đề cập đến dữ liệu được gửi kèm với action khi nó được dispatch.
                (item) => item._id === action.payload.item._id
            );

            if (existingItem) {
                existingItem.quantity =
                    Number(existingItem.quantity) +
                    Number(action.payload.quantity);
            } else {
                state.items.push({
                    ...action.payload.item,
                    quantity: action.payload.quantity,
                });
            }
            // Lưu giỏ hàng vào local storage
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                (item) => item._id !== action.payload
            );
            // Cập nhật lại giỏ hàng trong local storage
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },

        updateCartItemQuantity: (state, action) => {
            const item = state.items.find(
                (item) => item._id === action.payload._id
            );

            if (item) {
                item.quantity = action.payload.quantity;
            }

            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },

        incrementQuantity: (state, action) => {
            const item = state.items.find(
                (item) => item._id === action.payload
            );
            if (item && item.quantity < 10) {
                item.quantity++;
            }

            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
        decrementQuantity: (state, action) => {
            const item = state.items.find(
                (item) => item._id === action.payload
            );
            if (item && item.quantity > 1) {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    state.items = state.items.filter(
                        (item) => item._id !== action.payload
                    );
                }
            }

            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },

        clearCart: (state) => {
            state.items = [];
            // Xóa giỏ hàng trong local storage
            localStorage.removeItem("cartItems");
        },
    },
});

export const {
    setCartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    incrementQuantity,
    decrementQuantity,
} = cartSlice.actions;

export default cartSlice;
