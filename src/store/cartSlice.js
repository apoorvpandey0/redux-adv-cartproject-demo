import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";

const initialCartState = {
  items: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          description: newItem.description,
          quantity: 1,
          totalPrice: newItem.totalPrice,
          price: newItem.price,
        });
      } else {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
        console.log(existingItem.totalPrice);
      }
    },
    removeItem(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          existingItem.quantity -= 1;
          existingItem.totalPrice -= existingItem.price;
        }
      }
    },
    createCart(state, action) {
      state.items = action.payload.items;
    },
  },
});

// This is a thunk
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "Pending",
        title: "Updating",
        message: "",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-adv-demo-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Failed sending data to db");
      }
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Data update successful",
        })
      );
    };
    try {
      await sendRequest();
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Data update Failed",
        })
      );
    }
  };
};
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "Pending",
          title: "Fetching",
          message: "",
        })
      );
      const response = await fetch(
        "https://redux-adv-demo-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
      );
      if (!response.ok) {
        throw new Error("Could not fetch cart data");
      }
      const data = await response.json();
      console.log(data);
      return data;
    };
    try {
      const data = await fetchData();
      dispatch(cartActions.createCart(data));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Data fetch Failed",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
