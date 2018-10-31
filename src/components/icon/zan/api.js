/**
 * [点赞相关接口]
 * @Author   郑君婵
 * @DateTime 2018-05-16
 */

import store from '@/vuex';
import { ApiUtil } from '@/utils';

export default {
    /**
     * [changeStatus 改变点赞状态]
     * @Author   郑君婵
     * @DateTime 2018-05-16
     * @params   item_id: 项目的ID
     *           type: 1音乐 2歌单 3动态 4.评论 5池塘的一级评论 6池塘的回复
     *           device_finger: 设备指纹,未登录点赞必须
     */
    changeStatus(params) {
        params.device_finger = store.getters.getDeviceToken;

        return ApiUtil.post('/v2/api/agree/add', params);
    }
};
