import ApiUtil from '@/utils/api-util.js';
let v = '/v2/api';
export default {
    /* 获取剩余票数 */
    getTicket: function (params) {
        return ApiUtil.get(v + '/activity/getTicket/' + params.alias);
    },
    /* 搜索借口 */
    searchList: function (params) {
        return ApiUtil.get(v + '/activity/musics', params);
    },
    /* 活动列表 */
    activityList: function (params) {
        return ApiUtil.get(v + '/activity/read/' + params.alias);
    },
    /* 结果公布 */
    activityResult: function (params) {
        return ApiUtil.get(v + '/activity/getPrize', params);
    },
    /* 活动分类 */
    activityVotes: function (params) {
        return ApiUtil.get(v + '/activity/vote', params);
    },
    /**
     * [thirdLogin 第三方登录]
     * @Author   郑君婵
     * @DateTime 2017-08-18
     * @return   {[type]}   [description]
     */
    thirdLogin(params) {
        return ApiUtil.get('/v2/api/member/connect/login', params);
    }
};
