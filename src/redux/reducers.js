import { combineReducers } from "redux";

import { GET_LIST } from "./action_types";

const initialState = {
  orderList: []
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST:
      const { orderList } = action.payload;
      return {
        ...state,
        orderList
      };

    default:
      return state;
  }
};

export default combineReducers({ ordersReducer });
