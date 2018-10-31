import ApiUtil from '@/utils/api-util.js';

export default {
    /**
     * [getActivityList 获取活动列表]
     * @Author   郑君婵
     * @DateTime 2017-10-11
     */
    getActivityList() {
        return ApiUtil.get(`/v2/api/activity`);
    }
};
