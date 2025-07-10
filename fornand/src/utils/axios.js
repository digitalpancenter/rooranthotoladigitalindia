import axios from "axios";

const instance = axios.create({
  baseURL: "https://rooranthotoladigitalindia.onrender.com/api", // 🔥 Direct backend URL
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
