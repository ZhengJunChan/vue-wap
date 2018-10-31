export default {
    /**
     * [close 关闭弹框]
     * @Author   郑君婵
     * @DateTime 2017-12-04
     */
    close({ commit }) {
        commit('reset');
    },
    /**
     * [showAlert description]
     * [description]
     *
     * @author 郑君婵
     * @email    zhengjunchan@qq.com
     * @DateTime 2018-10-19
     * @param    {[type]}                 state  [description]
     * @param    {[type]}                 options.type [弹框需要的类型]
     * @param    {[type]}                 options.data [弹框需要的数据]
     */
    showAlert({ state }, options) {
        Object.assign(state, options);
    }
};
