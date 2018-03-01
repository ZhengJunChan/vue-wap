/**
 * 封装公共接口
 * Created by 郑君婵 on 2017-07-15
 */

export default {
    /**
     * [deepCopy 深复制]
     *
     * @Author   郑君婵
     * @DateTime 2017-07-15
     *
     * @param    {[type]}   data [被复制的变量]
     *
     * @return   {[type]}        [被复制的变量的值]
     */
    deepCopy(data) {
        if (typeof data === 'object') {
            return JSON.parse(JSON.stringify(data));
        }

        return data;
    },
    /**
      * [getRandom 获取随机整数(包括min和max)]
     *
     * @Author   郑君婵
     * @DateTime 2017-07-19
     *
     * @param    {[int]}   max [最大值]
     * @param    {[int]}   min [最小值]
     *
     * @return   {[int]}       [随机数]
     */
    getRandom(min, max) {
        let differ = max - min - 1;
        let num = Math.random() * differ + min;

        return Math.round(num);
    },
    /**
     * [computeStringLength 计算字符长度，中文算2个字符，英文算1个字符]
     *
     * @Author   郑君婵
     * @DateTime 2017-08-02
     *
     * @param    {[string]}   str [需要计算的字符串]
     *
     * @return   {[string]}       [字符长度]
     */
    computeStringLength(str) {
        return str.replace(/[\u0391-\uFFE5]/g, 'aa ').length;
    }
};
