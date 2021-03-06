import ApiUtil from '@/utils/api-util.js';

export default {
    getDetail(params) {
        return ApiUtil.get(`/v2/api/help/read`, params);
    },
    zan(params) {
        return ApiUtil.post('/v2/api/help/agree', params);
    }
};
