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
    /* 活动分类 */
    activityClass: function (params) {
        return ApiUtil.get(v + '/activity/actclass', params);
    },
    /* 活动分类 */
    activityVotes: function (params) {
        return ApiUtil.get(v + '/activity/vote', params);
    }
};
