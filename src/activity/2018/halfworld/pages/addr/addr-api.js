import ApiUtil from '@/utils/api-util.js';

export default {
    /**
     * [acceptPrize 收下奖品]
     * @Author   郑君婵
     * @DateTime 2017-11-19
     * @return   {[type]}   [description]
     */
    acceptPrize(params) {
        return ApiUtil.post(`/v2/api/member.lottery/postaddr`, params);
    },
    /**
     * [getLastAddr 获取最近一次收货地址]
     * @Author   郑君婵
     * @DateTime 2017-11-19
     * @return   {[type]}   [description]
     */
    getLastAddr(params) {
        return ApiUtil.post(`/v2/api/member.lottery/getlastaddress`, params);
    }
};
