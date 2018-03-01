/**
 * 微信相关api
 * @Author   郑君婵
 * @DateTime 2017-09-25
 */

import ApiUtil from '@/utils/api-util.js';

export default {
    /**
     * [register 注册微信]
     * @Author   郑君婵
     * @DateTime 2017-12-04
     */
    register(params) {
        return ApiUtil.get('/v2/api/ajax/wechat', params);
    }
};
