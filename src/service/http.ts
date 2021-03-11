import axios from "axios";
import base from "./base";
import qs from "querystring";
// import history from './history';

const instance = axios.create({
    timeout: 10000
})
// 携带cookie
// axios.defaults.headers["Token"] = getCookie("Token") ? getCookie("Token") : '';
// axios.defaults.headers["Token-Id"] = getCookie("User-Id") ? getCookie("User-Id") : '';
// axios.defaults.headers["Platform"] = getCookie("Platform")?getCookie("Platform"):'H5';


instance.interceptors.request.use(function (config) {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data)
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(
    // 响应包含以下信息data,status,statusText,headers,config
    (res) => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    (err) => {
        console.log(err)
        const { response } = err;
        // console.log(response)
        if (response) {
            errorHandle(response.status, response.data);
            return Promise.reject(response);
        } else {
            console.log('请求失败')
        }
    }
);

const errorHandle = (status: number, other: string) => {
    switch (status) {
        case 400:
            console.log("信息校验失败");
            break;
        case 401:
            console.log("认证失败");
            break;
        case 403:
            console.log("token校验失败");
            break;
        case 404:
            console.log("请求的资源不存在");
            break;
        default:
            console.log(other);
            break;
    }
}

const get = async (url:string, param?: object) => {
    try {
        const res = await instance({
            method: 'get',
            url: base.baseUrl + url,
            data: {},
            params: param
        })
        return res.data
    }
    catch(err) {
        console.log(err)
    }
}

const post = async (url:string, param?: object) => {
    try {
        const res = await instance({
            method: 'get',
            url: base.baseUrl + url,
            data: param,
        })
        return res.data
    }
    catch(err) {
        console.log(err)
    }
}

export default {
    get,
    post
}