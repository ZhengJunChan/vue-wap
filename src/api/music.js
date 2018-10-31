import ApiUtil from '@/utils/api-util.js';

export default {
    /**
     * [播放MV(增加MV播放次数)]
     *
     * @author 郑君婵
     * @email    zhengjunchan@qq.com
     * @DateTime 2018-08-11T09:32:22+0800
     * @return   {[type]}
     */
    addMvPlayCount(params) {
        return ApiUtil.get('/v2/api/music/play_mv', params);
    }
};
