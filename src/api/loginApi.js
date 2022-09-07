import axiosClient, { comicsAPI } from "./axiosClient";
import { comics } from "./tmdbApi";

export const loginApi = {
  getToken: (params) => {
    const url = "/user/login";
    return comicsAPI.post(url, params);
  },
  signUp: (params) => {
    const url = "/user/register";
    return comicsAPI.post(url, params);
  },
  comment: (endpoint, params) => {
    const url = "comment/" + endpoint;
    return comicsAPI.post(url, params);
  },
  edit: (params, config) => {
    const url = "user/";
    return comicsAPI.patch(url, params, config);
  },
  changePassword: (params, config) => {
    const url = "user/change-password";
    return comicsAPI.patch(url, params, config);
  },
};
