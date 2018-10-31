import ApiUtil from '@/utils/api-util.js';

export default {
    /**
     * [submitComment 提交评论消息]
     * @Author   郑君婵
     * @DateTime 2017-08-18
     */
    submitComment(params) {
        return ApiUtil.post('/v2/api/member/comment', params);
    },
    /**
     * ！！！！注意啦！！！
     * ！！！此接口不可获取 池塘 评论列表！！！若有不服，找后端小哥哥！！！
     * ******************************************************************************
     * [getComment 获取评论列表]
     * @Author   郑君婵
     * @DateTime 2017-08-18
     * params: {
     *     type: 1,     // 1音乐/mv，2歌单，3，动态，5活动
     *     item_id: id,
     *     order: 'agrees-desc', // 热门排序：agrees-desc； 时间排序：create_time-desc
     *     p: this.pagination.currentPage,
     *     row: this.pagination.perPage
     * }
     */
    getCommentList(params) {
        return ApiUtil.get('/v2/api/comment', params);
    }
};
