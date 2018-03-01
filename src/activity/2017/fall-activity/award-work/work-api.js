import ApiUtil from '@/utils/api-util.js';
let v = '/v2/api';
export default {
    /* 秋日祭获奖作品(专区) */
    getFallWork: function (params) {
        return ApiUtil.get(v + '/activity/autumn/' + params.alias);
    },
    getWeeklWork: function (params) {
        return ApiUtil.get(v + '/activity/autumnweek/' + params.alias);
    }
};
