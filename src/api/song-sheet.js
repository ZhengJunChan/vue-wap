import ApiUtil from '@/utils/api-util.js';

export default {
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
    /**
     * [getRecommendSong 推荐歌单]
     * @Author   郑君婵
     * @DateTime 2017-08-18
     */
    getRecommendSong() {
        return ApiUtil.get('/v2/api/home/recommend_song');
    },
    /**
     * [getRecommendNewSong 新歌速递列表]
     * @Author   郑君婵
     * @DateTime 2017-08-18
     */
    getRecommendNewSong() {
        return ApiUtil.get('/v2/api/home/newest_music');
    }
};
