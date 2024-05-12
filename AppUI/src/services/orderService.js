import axios from "axios";
const getOrderByUserId = (user_id, jwt_token) => {
  return axios.get(`http://localhost:3001/order/get-order/${user_id}`, {
    headers: {
      authorization: `Bearer ${jwt_token}`,
    },
  });
};
const addOrder = (user_id, sub_total, phone_no, jwt_token) => {
  return axios.post(
    "http://localhost:3001/order/add-order",
    {
      userid: user_id,
      subtotal: sub_total,
      phoneno: phone_no,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  );
};
const orderService = { getOrderByUserId, addOrder };
export default orderService;
