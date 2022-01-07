"use strict";

import { NuxtAxiosInstance } from "@nuxtjs/axios";
import axios, { AxiosResponse } from "axios";

// const hostname = window.location.hostname
// let baseURL = String(process.env.VUE_APP_API_BASE_URL || '')

// if (hostname.startsWith('localhost') || hostname.startsWith('192.168')) {
//   baseURL = 'http://localhost:9000/api'
// }

// axios.defaults.

// const config = {
//   baseURL: process.client ? 'http://localhost:9000/api' : 'http://backend:9000/api'
// }

const _axios = axios.create();

if (process.client) {
  // _axios.interceptors.request.use(
  //   function(config) {
  //     const token = localStorage.getItem("access_token");
  //     if (token && config.headers) {
  //       config.headers.Authorization = `Bearer ${token}`;
  //     }
  //     return config;
  //   },
  
  //   function(error) {
  //     localStorage.clear()
  //     return Promise.reject(error);
  //   }
  // );

  // Add a response interceptor
  // _axios.interceptors.response.use(
  //   function(response) {
  //     // Do something with response data
  //     return response;
  //   },
    
  //   function(error) {
  //     const originalRequest = error.config;
  //     if (error.response && error.response.status === 401) {
  //       localStorage.removeItem('access_token');
  //       localStorage.removeItem('refresh_token')
  
  //       // eslint-disable-next-line prefer-promise-reject-errors
  //       return Promise.reject("Credenciales expiradas");
  //     }
  
  //     if (error.response && error.response.status === 401 && !originalRequest._retry) {
  //       originalRequest._retry = true;
  //       const refreshToken = localStorage.getItem("refresh_token");
  
  //       return axios.post("auth/token/", {
  //         grant_type:'refresh_token',
  //         client_id: process.env.API_CLIENT_ID,
  //         client_secret: process.env.API_CLIENT_SECRET,
  //         refresh_token: refreshToken
  //       }).then(response => {
  //         // if (response.status === 201) {
  //           localStorage.setItem("access_token", response.data.access_token);
  //           if (axios.defaults.headers) {
  //             axios.defaults.headers.common.Authorization = `Bearer ${ response.data.access_token }`;
  //           }
  //           return axios(originalRequest);
  //         // }
  //       });
  //     }

  //     return Promise.reject(error);
  //   }
  // );
}

export default function({ $axios }: { $axios: NuxtAxiosInstance }) {
  $axios.onRequest((config) => {
    const token = localStorage.getItem("access_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  })

  $axios.onResponseError((error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token')

      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject("Credenciales expiradas");
    }

    if (error.response && error.response.status === 401 && !originalRequest["axios-retry"]) {
      // originalRequest["axios-retry"] = true;
      const refreshToken = localStorage.getItem("refresh_token");

      return axios.post("auth/token/", {
        grant_type:'refresh_token',
        client_id: process.env.API_CLIENT_ID,
        client_secret: process.env.API_CLIENT_SECRET,
        refresh_token: refreshToken
      }).then(response => {
        // if (response.status === 201) {
          localStorage.setItem("access_token", response.data.access_token);
          if (axios.defaults.headers) {
            axios.defaults.headers.common.Authorization = `Bearer ${ response.data.access_token }`;
          }
          return axios(originalRequest);
        // }
      });
    }

    return Promise.reject(error);
  })
}