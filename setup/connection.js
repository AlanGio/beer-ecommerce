import axios from "axios";
import { makeUseAxios } from "axios-hooks";

export const getProducts = makeUseAxios({
  axios: axios.create({ baseURL: "/api/products" }),
});
