import  axios  from "axios";

const API_URL = "https://dummyjson.com/auth/";

export const loginServices = (username, password) => {
  return new Promise((resolve, reject) => {
    axios.post(API_URL + "login", {
      username,
      password,
    })
      .then((response) => {
        // if (response.data.accessToken) {
        //     localStorage.setItem("user", JSON.stringify(response.data));
        // }
        return resolve(response.data);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};