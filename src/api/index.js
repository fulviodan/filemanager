import axios from "axios";

export function getEnv() {
  return axios.get(process.env.API_ROOT);
}

export function listFiles({ env, path = "/" }) {
  return axios.get(`${process.env.API_ROOT}${env.data.base}/content`, {
    params: {
      path
    }
  });
}
