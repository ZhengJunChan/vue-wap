import ApiUtil from '@/utils/api-util.js';

const activityId = '2017chuanyin';

export default {
    /**
     * [enroll 报名接口]
     * @Author   郑君婵
     * @DateTime 2017-08-18
     */
    enroll(params) {
        params.alias = activityId;
        return ApiUtil.post('/v2/api/school/save', params);
    },
    /**
     * [getActivityTime 获取活动时间]
     * @Author   郑君婵
     * @DateTime 2017-08-18
     */
    getActivityTime() {
        return ApiUtil.get(`/v2/api/school/read/${activityId}`);
    }
};
