import ApiUtil from '@/utils/api-util.js';

const activityId = '2018chinayear';

export default {
    alias: activityId,
    /**
     * [getActivityInfo 获取活动信息]
     * @Author   郑君婵
     * @DateTime 2017-08-18
     */
    getActivityInfo() {
        return ApiUtil.get(`/v2/api/lottery/${activityId}`);
    },
    /**
     * [getScreenPrize 获取屏幕奖品列表]
     * @Author   郑君婵
     * @DateTime 2017-08-18
     */
    getScreenPrize() {
        return ApiUtil.get(`/v2/api/lottery/getaward/${activityId}`);
    },
    /**
     * [getCardsInfo 获取集卡信息]
     * @Author   郑君婵
     * @DateTime 2018-01-31
     */
    getCardsInfo() {
        return ApiUtil.get(`/v2/api/lottery/getcardsbyalias`);
    },
    /**
     * [groupPrize 合成奖品]
     * @Author   郑君婵
     * @DateTime 2018-01-31
     */
    groupPrize() {
        return ApiUtil.get(`/v2/api/lottery/mergedog`);
    },
    /**
     * [acceptPrize 收下奖品]
     * @Author   郑君婵
     * @DateTime 2017-11-19
     * @return   {[type]}   [description]
     */
    acceptPrize(id, params) {
        if (params) {
            return ApiUtil.post(`/v2/api/member.lottery/postaddr?id=${id}`, params);
        } else {
            return ApiUtil.post(`/v2/api/member.lottery/postaddr?id=${id}`);
        }
    }
};
