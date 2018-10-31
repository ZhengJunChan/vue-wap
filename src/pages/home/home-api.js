import ApiUtil from '@/utils/api-util.js';

export default {
    getHomeData() {
        return ApiUtil.get('/v2/api/home/app');
    },
    /**
     * [获取今日推荐]
     *
     * @author 郑君婵
     * @email    zhengjunchan@qq.com
     * @DateTime 2018-08-11T09:32:22+0800
     * @return   {[type]}
     */
    getToday() {
        return ApiUtil.get('/v2/api/home/today_recommends');
    },
    getHotTopic() {
        return ApiUtil.get('/v2/api/home/topic');
    }
};
