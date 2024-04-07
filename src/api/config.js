import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/'
})

axiosInstance.interceptors.request.use(function (config) {

    console.log(config)
    config.headers['Accept-Language'] = 'ar'
    // if(localStorage.getItem('access_token')){
    //     config.headers['Authorization'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEyNDExMjUyLCJpYXQiOjE3MTI0MDc2NTIsImp0aSI6ImFjOTAyYmIzYjZmMDRlOWU5OTlkODAyODNlNDk5NzdlIiwidXNlcl9pZCI6Mn0.xa2mxwhPnZ6Jk8CbQADEI-lgRqOpxIsRaR6ip8NVwvA'
    // }
    // config.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEyNDQzMzcyLCJpYXQiOjE3MTI0Mzk3NzIsImp0aSI6ImVlNWQyYzI2MDk5MzQ5YTRhZDQ4ODlmZDBhODg4MGZjIiwidXNlcl9pZCI6Mn0.4bZJBBouLOF0EDWvxk1-6sZsN69x-lh37hJJKsOwqf8'
    return config;
}, function (error) {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {

    return response;
}, function (error) {

    return Promise.reject(error);
});
