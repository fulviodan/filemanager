import axios from "axios";

export function getEnv() {
  return axios.get(process.env.API_ROOT);
}
