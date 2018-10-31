/**
 * http请求拦截器
 * Created by 郑君婵 on 2017-05-25
 */

import store from '@/vuex';
import AndroidApp from '@/utils/android-app.js';
// import ApiUtil from '@/utils/api-util.js';
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
 * [logingSetting 重构分页数据]
 * @Author   郑君婵
 * @DateTime 2017-06-01
 * @param    {object}   response [response]
 */
function logingSetting(response) {
    let uid = response.headers && response.headers['x_end_user'] || 0;

    if (Number(uid) && !store.state.user.isLogined) {
        store.dispatch('requireUserInfos');
    }
}

/**
 * [rebiuldResponse 重构数据]
 * @Author   郑君婵
 * @DateTime 2017-06-01
 */
function rebiuldResponse(response) {
    logingSetting(response);
    rebiuldPaginationResponse(response);
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
        AndroidApp.runAdroidApi(appParams);
    }
}

export default function (vue) {
    // request 拦截器
    vue.http.interceptors.request.use(
        config => {
            config.headers.version = store.state.app.version;

            // wap的logat
            config.headers.logat = 4;

            store.commit('setLoginToken');
            config.headers.logintoken = store.state.user.infos.logintoken || '';

            return config;
        },
        err => {
            return Promise.reject(err);
        }
    );

    // response 拦截器
    vue.http.interceptors.response.use(
        response => {
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
                    // requireToken();
                    break;
                case 412:
                    // 用户已登录（比如第三方登录），未绑定手机号，需要绑定手机号或邮箱才能愉快地进行当前操作
                    store.commit('bindMobile');
                    break;
                }
            }

            // 返回接口返回的错误信息
            return Promise.reject(error.response.data);
        }
    );
};
