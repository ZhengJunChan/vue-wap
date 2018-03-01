import ApiUtil from '@/utils/api-util.js';

export default {
    getHomeData() {
        let params = {
            app: 'wap'
        };

        return ApiUtil.get('/v2/api/home', params);
    },
    getHotTopic() {
        return ApiUtil.get('/v2/api/home/topic');
    }
};
