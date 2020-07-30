import AxiosInstance, { AxiosStatic, AxiosPromise, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

// import { message } from 'antd';
// import store from '../store/index';
// import LocalStore from '../utils/LocalStore';



type requestFn = (url: string, params?: Object, data?: Object | null) => AxiosPromise;


class Http {
    private axios: AxiosStatic | any = AxiosInstance
    /**
     * 请求失败间隔的时间
     */
    private retryDelay: number = 1000;
    /**
     * 请求失败 重试的次数
     */
    private retry: number = Number(process.env.REACT_APP_RETRY) || 4;

    constructor() {
        const { axios } = this;

        axios.defaults.timeout = 10000;
        axios.defaults.baseURL = process.env.REACT_APP_API_URL;
        axios.defaults.headers = {
            "Content-Type": "application/json;charset=UTF-8"
        }
        this.useInterceptResponse();

        this.useInterceptRequest()
    }
    /**
     * 相应拦截器
     */
    useInterceptResponse() {
        /**
         * 响应拦截器的封装
         */
        this.axios.interceptors.response.use(
            (res: AxiosResponse) => {
                if (res.data.status === "500") {
                    // message.error('服务器错误')
                }
                if (res.data.status !== 0) {
                    // message.error(res.data.message || "服务器异常")
                }
                return Promise.resolve(res.data)
            },
            (error: AxiosError) => {
                const { config } = error
                let retryCont = config.headers["axios-retry"] || 0;
                if (retryCont >= this.retry) {
                    // store.dispatch(setRetryTip(true))
                    return Promise.reject(error)
                }
                retryCont += 1
                const backoff = new Promise((resolve) => {
                    setTimeout(() => {
                        resolve()
                    }, this.retryDelay || 1)
                })

                config.headers["axios-retry"] = retryCont
                return backoff.then(() => {
                    this.axios(config)
                })
            }
        )

    };
    /**
     * 请求拦截器
     */
    useInterceptRequest() {

        this.axios.interceptors.request.use(
            async (config: AxiosRequestConfig) => {

                const newConfig = config;
                const token = '12123123'
                if (token) {
                    newConfig.headers.authtoken = token
                }
                return newConfig
            },
            (error: AxiosError) => Promise.reject(error)
        )
    }

    /**
     *
     *
     * @private
     * @param {string} type 请求方式
     * @param {string} url 请求地址
     * @param {Object} [options] 请求的参数
     * @param {boolean} [isComplex] 是否平铺 参
     * 数 为true是 啊=1&b=2
     * @memberof Http
     */
    private fetchData(type: string, url: string, options?: Object, isComplex?: boolean) {
        if (isComplex) {
            return this.axios[type](url, null, options)
        }
        return this.axios[type](url, options)
    }

    /**
     *
     *
     * @type {requestFn} get请求
     * @memberof Http
     */
    public get: requestFn = (url, params,) => {
        if (!params) {
            return this.fetchData('get', url)
        }
        const newParams = Object.assign(params, {
            [`yzy${new Date().getTime()}`]: 1
        })
        return this.fetchData('get', url, { params: newParams })
    }

    /**
     *
     *
     * @private 封装公用的 请求方法
     * @memberof Http
     */
    private commonRequest = (type: string, url: string, params?: Object, data?: Object | null): AxiosPromise => {
        let options: Object = {
            params,
            data
        }

        if (params && data === undefined) {
            options = {
                data: params
            }
        }

        if (data === null) {
            options = {
                params
            }
        }
        return this.fetchData(type, url, options, true)
    }

    /**
     *
     *
     * @type {requestFn} post请求
     * params 请求的url上添加参数
     * @memberof Http
     */
    public post: requestFn = (url, params, data) => {
        return this.commonRequest('post', url, params, data)
    }
    /**
     *
     *
     * @type {requestFn} put请求封装
     * @memberof Http
     */
    public put: requestFn = (url, params, data) => {
        return this.commonRequest('put', url, params, data)
    }
    /**
     *
     *
     * @type {requestFn} path请求
     * @memberof Http
     */
    public path: requestFn = (url, params, data) => {
        return this.commonRequest('path', url, params, data)
    }
    /**
     *
     *
     * @type {requestFn} delete 请求
     * @memberof Http
     */
    public delete: requestFn = (url, params, data) => {
        return this.commonRequest('delete', url, params, data)
    }
}


export default new Http();