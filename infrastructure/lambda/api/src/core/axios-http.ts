import axios from "axios";

const axiosHttp = axios.create({
  baseURL: "https://api.polygon.io/v2",
});

export { axiosHttp };
