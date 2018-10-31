import ApiUtil from '@/utils/api-util.js';

const activityId = '2018newyear';

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
     * [getWinningRecords 获取中奖纪录]
     * @Author   郑君婵
     * @DateTime 2017-08-18
     */
    getWinningRecords() {
        return ApiUtil.get(` /v2/api/lottery/getuseraward/${activityId}`);
    },
    /**
     * [getScreenWinningPrize 获取抽奖中奖结果]
     * @Author   郑君婵
     * @DateTime 2017-11-19
     * @return   {[type]}   [description]
     */
    getScreenWinningPrize() {
        return ApiUtil.get(`/v2/api/member.lottery/letsgo/${activityId}`);
    },
    /**
     * [searchPrizeCount 查询兑奖及抽奖情况]
     * @Author   郑君婵
     * @DateTime 2017-08-18
     */
    searchPrizeCount() {
        return ApiUtil.get(`/v2/api/lottery/getcount/${activityId}`);
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
