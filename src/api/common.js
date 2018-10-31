import ApiUtil from '@/utils/api-util.js';

export default {
    /**
     * [获取筛选条件]
     * @Author   郑君婵
     * @DateTime 2017-08-18
     */
    getNavs(params) {
        return ApiUtil.get('/v2/api/com/get_where', params);
    }
};
