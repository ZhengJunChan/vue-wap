/**
 * http请求拦截器
 * Created by 郑君婵 on 2017-05-25
 */

import store from '@/vuex';
import ApiUtil from '@/utils/api-util.js';
import { CheckUtil, BrowserUtil } from '@/utils';

/**
 * [rebiuldResponse 重构分页数据]
 * @Author   郑君婵
 * @DateTime 2017-06-01
 * @param    {object}   response [response]
 */
function rebiuldPaginationResponse(response) {
    var page = {};

    if (response.headers.hasOwnProperty('x-pagination-current-page')) {
        page.currentPage = parseInt(response.headers['x-pagination-current-page']);
    }

    if (response.headers.hasOwnProperty('x-pagination-page-count')) {
        page.pageCount = parseInt(response.headers['x-pagination-page-count']);
    }

    if (response.headers.hasOwnProperty('x-pagination-per-page')) {
        page.perPage = parseInt(response.headers['x-pagination-per-page']);
    }

    if (response.headers.hasOwnProperty('x-pagination-total-count')) {
        page.totalCount = parseInt(response.headers['x-pagination-total-count']);
    }

    if (!CheckUtil.isEmptyObject(page)) {
        response.data.page = page;
    }
}

/**
 * [rebiuldResponse 重构数据]
 * @Author   郑君婵
 * @DateTime 2017-06-01
 */
function rebiuldResponse(response) {
    rebiuldPaginationResponse(response);
}

/**
 * [requireToken token无效时，重新请求]
 * @Author   郑君婵
 * @DateTime 2017-06-05
 */
function requireToken() {
    let params = {
        log_at: '',
        devicekey: window.localStorage.getItem('fingerprint')
    };
    if (BrowserUtil.isFormApp()) {
        params.log_at = Number(window.localStorage.log_at);
    } else if (BrowserUtil.isMobile()) {
        params.log_at = 4;
    } else {
        params.log_at = 1;
    }

    // 注意事项：用户点击退出登录、被挤下线 需要重新获取token的时候 携带一个out=true的参数
    ApiUtil.get('/v2/api/com/auth', params).then((res) => {
        if (res.code !== 200) {
            console.log(res.msg);
            return;
        }

        if (!res.data || !res.data.accesstoken) {
            console.log('返回了无效token');
            return;
        }

        let params = {
            funcName: 'setTokens',
            params: {
                token: res.data.accesstoken
            }
        };

        require('', params);
        BrowserUtil.setQuery('token', res.data.accesstoken);

        window.localStorage.setItem('token', res.data.accesstoken);
    });
}

/**
 * [goLogin 跳转到登录页面]
 * @Author   郑君婵
 * @DateTime 2017-06-05
 */
function goLogin() {
    let appParams = {
        funcName: 'gotoLogin'
    };

    window.localStorage.removeItem('token');

    require(function () {
        window.location.href = 'https://wap.yuanyintang.com/download';
    }, appParams);
}

/**
 * [require 请求]
 * @Author   郑君婵
 * @DateTime 2017-06-05
 * @param    {[type]}   pcParams  [web回调函数]
 * @param    {[type]}   appParams [app请求参数]
 */
function require(pcRequire, appParams) {
    // 不在app打开
    if (!BrowserUtil.isFormApp()) {
        pcRequire && pcRequire();
    }

    // ios app 中打开页面
    if (BrowserUtil.isFromIosApp()) {
        window.callAppFunction(appParams);
    }

    // android app 中打开页面
    if (BrowserUtil.isFromAndroidApp()) {
        window.android.funtionAndroid(JSON.stringify(appParams));
    }
}

export default function (vue) {
    // request 拦截器
    vue.http.interceptors.request.use(
        config => {
            var token = window.localStorage.getItem('token');
            var logintoken = window.localStorage.getItem('logintoken');
            config.headers.version = '2.1.0';
            // config.headers.fingerKey = window.localStorage.getItem('fingerprint');

            // 判断是否存在token，如果存在的话，则每个http header都加上token
            if (token) {
                config.headers.accesstoken = token;
            }
            if (logintoken) {
                config.headers.logintoken = logintoken;
            }

            return config;
        },
        err => {
            return Promise.reject(err);
        }
    );

    // response 拦截器
    vue.http.interceptors.response.use(
        response => {
            store.commit('setLoginStatus', { isLogined: response.headers.x_end_user });
            rebiuldResponse(response);

            return response.data;
        },
        error => {
            if (error.response) {
                switch (error.response.status) {
                case 401:
                    // app在别处登录
                    window.localStorage.removeItem('logintoken');
                    goLogin();
                    break;
                case 402:
                    // token授权失败或者已过期
                    requireToken();
                    break;
                }
            }

            // 返回接口返回的错误信息
            return Promise.reject(error.response.data);
        }
    );
};
