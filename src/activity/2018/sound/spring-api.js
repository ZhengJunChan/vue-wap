import ApiUtil from '@/utils/api-util.js';
import SongSheetApi from '@/pages/song-sheet/song-sheet-api.js';
import CommonApi from '@/pages/common/common-api.js';

const activityId = 'sound';

export default {
    alias: activityId,
    /**
     * [getActivityInfo 获取活动信息]
     * @Author   郑君婵
     * @DateTime 2017-08-18
     */
    getActivityInfo() {
        return ApiUtil.get(`/v2/api/activity/read/${activityId}`);
    },
    /**
     * [getEntries 获取参赛作品]
     * @Author   郑君婵
     * @DateTime 2017-08-18
     */
    getEntries(params) {
        return ApiUtil.get(`/v2/api/activity.${activityId}/get_works`, params);
    },
    /**
     * [discuss 告白]
     * @Author   郑君婵
     * @DateTime 2017-08-18
     */
    discuss(params) {
        return ApiUtil.post(`/v2/api/activity.${activityId}/comment_works`, params);
    },
    /**
     * [vote 投票]
     * @Author   郑君婵
     * @DateTime 2017-11-19
     * @return   {[type]}   [description]
     */
    vote(params) {
        return ApiUtil.post(`/v2/api/activity.${activityId}/vote`, params);
    },
    /**
     * [release 发布作品]
     * @Author   郑君婵
     * @DateTime 2017-11-19
     * @return   {[type]}   [description]
     */
    release(params) {
        return ApiUtil.post(`/v2/api/activity.${activityId}/pub`, params);
    },
    /**
     * [getSearchParams 获取投票赛选项]
     * @Author   郑君婵
     * @DateTime 2018-04-04
     */
    getDetail(params) {
        return ApiUtil.get(`/v2/api/activity.${activityId}/works_info`, params);
    },
    /**
     * [getSearchParams 获取投票赛选项]
     * @Author   郑君婵
     * @DateTime 2018-04-04
     */
    getSoundDiscuss(params) {
        return ApiUtil.get(`/v2/api/activity.${activityId}/works_comment`, params);
    },
    /**
     * [searchPrizeCount 查询兑奖及抽奖情况]
     * @Author   郑君婵
     * @DateTime 2017-08-18
     */
    searchPrizeCount() {
        let params = {
            alias: activityId
        };

        return ApiUtil.get(`/v2/api/member.lottery/getcount`, params);
    },
    /**
     * [getMySound 获取用户发布的作品]
     * @Author   郑君婵
     * @DateTime 2017-08-18
     */
    getMySound() {
        return ApiUtil.get(`/v2/api/activity.${activityId}/get_my_works`);
    },
    /**
     * [getWinning 投票]
     * @Author   郑君婵
     * @DateTime 2017-11-19
     * @return   {[type]}   [description]
     */
    getWinning() {
        return ApiUtil.post(`/v2/api/activity.${activityId}/winner_works`);
    },
    // ************
    /**
     * [getPrizeTicket 获取剩余抽奖次数]
     * @Author   郑君婵
     * @DateTime 2017-08-18
     */
    getPrizeTicket() {
        let params = {
            alias: activityId
        };

        return ApiUtil.get(`/v2/api/member.activity/getticketcount`, params);
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
        let params = {
            alias: activityId
        };

        return ApiUtil.post(`/v2/api/member.lottery/getmyrecord`, params);
    },
    /**
     * [getScreenWinningPrize 获取抽奖中奖结果]
     * @Author   郑君婵
     * @DateTime 2017-11-19
     * @return   {[type]}   [description]
     */
    getScreenWinningPrize(params) {
        params.alias = activityId;

        return ApiUtil.get(`/v2/api/member.lottery/letsgo`, params);
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
    },
    /**
     * [sendCode 发送验证码]
     * @Author   郑君婵
     * @DateTime 2017-11-19
     * @return   {[type]}   [description]
     */
    sendCode(params) {
        return ApiUtil.post(`/v2/api/code/sendcode`, params);
    },
    /**
     * [sendCode 发送验证码]
     * @Author   郑君婵
     * @DateTime 2017-11-19
     * @return   {[type]}   [description]
     */
    fastLogin: CommonApi.fastLogin,
    /**
     * [getWinning 投票]
     * @Author   郑君婵
     * @DateTime 2017-11-19
     * @return   {[type]}   [description]
     */
    getPrizeUsers() {
        return ApiUtil.post(`/v2/api/lottery/getallwinnerlist`, {alias: activityId});
    },
    /**
     * [acceptPrize 收下奖品]
     * @Author   郑君婵
     * @DateTime 2017-11-19
     * @return   {[type]}   [description]
     */
    getMusicDetail: SongSheetApi.getMusicDetail,
    bindMobile: CommonApi.bindMobile,
    sendCodeForBind: CommonApi.sendCodeForBind
};
