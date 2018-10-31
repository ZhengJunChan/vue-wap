/**
 * 微信相关api
 * @Author   郑君婵
 * @DateTime 2017-09-25
 */

import store from '@/vuex';
import ApiUtil from '@/utils/api-util.js';

export default {
    /**
     * [register 注册微信]
     * @Author   郑君婵
     * @DateTime 2017-12-04
     */
    register(params) {
        return ApiUtil.get('/v2/api/ajax/wechat', params);
    },
    thirdLogin(options) {
        let params = {
            type: 'wx',
            logat: '5',
            version: store.state.app.version,
            returnUrl: window.location.href
        };

        window.location.replace(`/v2/api/member.connect/login?type=${params.type}&logat=${params.logat}&version=${params.version}&returnUrl=${params.returnUrl}&device_token=${store.getters.getDeviceToken}&reg_from=${params.reg_from}`);
    }
};
