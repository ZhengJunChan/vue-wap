/**
 * 封装token相关接口
 * Created by 郑君婵 on 2017-05-24
 */

// import ApiUtil from '@/utils/api-util.js';
// import { BrowserUtil } from '@/utils';

// app类型
// var app = {
//     ios: 'ios',
//     android: 'android'
// };
var _token = {
    // localStorage中存储的key值
    key: 'token',
    // 向后端请求token时，接口的参数类型
    requireParams: {
        pc: 1,
        ios: 2,
        android: 3,
        wap: 4
    }
};

export default {
    /**
     * [save 存储token]
     * @Author   郑君婵
     * @DateTime 2017-06-19
     * @param    {[string]}   token [需要被存储的token]
     */
    save: function (token, callback) {
        // if (token) {
        //     window.localStorage.setItem(_token.key, token);

        //     callback && callback(token);
        //     return;
        // }

        // let params = {
        //     log_at: 0,
        //     devicekey: window.localStorage.getItem('fingerprint')
        // };
        // let querys = BrowserUtil.getQuerys();

        // // 判断网页环境
        // if (BrowserUtil.isFormApp()) {
        //     // 在app中打开
        //     params.log_at = querys.app === app.ios ? _token.requireParams.ios : _token.requireParams.android;
        // } else if (BrowserUtil.isMobile()) {
        //     // 在移动端中打开
        //     params.log_at = _token.requireParams.wap;
        // } else {
        //     // 在pc中打开
        //     params.log_at = _token.requireParams.pc;
        // }

        // ApiUtil.get('/v2/api/com/auth', params).then((res) => {
        //     if (res.code !== 200) {
        //         console.log(res.msg);
        //         return;
        //     }

        //     if (!res.data || !res.data.accesstoken) {
        //         console.log('返回了无效token');
        //         return;
        //     }

        //     // 存储token
        //     window.localStorage.setItem(_token.key, res.data.accesstoken);

        //     callback && callback(res.data.accesstoken);
        // });
    },
    /**
     * [get 获取token]
     * @Author   郑君婵
     * @DateTime 2017-06-19
     * @return   {[string]}   [token]
     */
    get: function () {
        return window.localStorage.getItem(_token.key);
    }
};
