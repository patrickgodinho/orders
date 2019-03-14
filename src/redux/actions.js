import { GET_LIST } from "./action_types";
import axios from "axios";

const URL = "https://5c89c22a41fb3f001434be28.mockapi.io/orders";

export const getList = (page = 1, companyName, sort, limit = 10) => {
  return dispatch => {
    axios
      .get(
        `${URL}?page=${page}&limit=${limit}&sortBy=orderDate&order=${sort}&${
          companyName ? `search=${companyName}` : ""
        }`
      )
      .then(response => {
        dispatch({
          type: GET_LIST,
          payload: {
            orderList: response.data
          }
        });
      });
  };
};
