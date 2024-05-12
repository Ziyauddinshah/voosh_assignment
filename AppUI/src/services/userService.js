import axios from "axios";
const getAllUserService = (jwt_token) => {
  return axios.get("http://localhost:3001/user/get-all", {
    headers: {
      authorization: "Bearer " + jwt_token,
    },
  });
};
const loginService = (phone_no, password) => {
  return axios.post("http://localhost:3001/user/login-user", {
    phoneno: phone_no,
    password: password,
  });
};

const registerService = (user_name, phone_no, password) => {
  return axios.post("http://localhost:3001/user/add-user", {
    user_name: user_name,
    phone_no: phone_no,
    password: password,
  });
};

const userService = { getAllUserService, loginService, registerService };
export default userService;
