import ActiveApi from './../../../activity-api.js';

const activityId = '2017chuanyinvote';

export default {
    /**
     * [getActityTime 获取活动起止时间]
     * @Author   郑君婵
     * @DateTime 2017-08-31
     */
    getActityTime() {
        return ActiveApi.getActityTime(activityId);
    },
    /**
     * [getPrizeWorks 获取专区获奖作品]
     * @Author   郑君婵
     * @DateTime 2017-08-31
     */
    getPrizeWorks() {
        return ActiveApi.getPrizeWorks(activityId);
    },
    /**
     * [vote 投票]
     * @Author   郑君婵
     * @DateTime 2017-08-31
     */
    vote(params) {
        return ActiveApi.vote(params, activityId);
    },
    /**
     * [getMusicList 获取参赛作品]
     * @Author   郑君婵
     * @DateTime 2017-08-31
     */
    getMusicList(params) {
        return ActiveApi.getMusicList(params, activityId);
    },
    /**
     * [getFrendlyLink 获取友情链接]
     * @Author   郑君婵
     * @DateTime 2017-08-31
     */
    getFrendlyLink() {
        return ActiveApi.getFrendlyLink(activityId);
    },
    /**
     * [thirdLogin 第三方登录]
     * @Author   郑君婵
     * @DateTime 2017-08-31
     */
    thirdLogin(params) {
        return ActiveApi.thirdLogin(params);
    }
};
