import ApiUtil from '@/utils/api-util.js';

export default {
    /**
     * [acceptPrize 收下奖品]
     * @Author   郑君婵
     * @DateTime 2017-11-19
     * @return   {[type]}   [description]
     */
    acceptPrize(id, params) {
        if (params) {
            return ApiUtil.post(`/v2/api/lottery/postaddr?id=${id}`, params);
        } else {
            return ApiUtil.post(`/v2/api/lottery/postaddr?id=${id}`);
        }
    }
};
