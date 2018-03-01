import Vue from 'vue';
import { BrowserUtil } from '@/utils';

import share from './share.js';
import callAppFunction from './callAppFunction.js';

export default function () {
  /**
   * [callAppFunction 调用APP公共接口]
   * @Author   郑君婵
   * @DateTime 2017-06-05
   * @param    {string}   funName [要调用的函数名称]
   * @param    {object}   params  [参数对象]
   */
    Vue.prototype.callAppFunction = callAppFunction;

    Vue.prototype.$toast = {
        error: function (text) {
            if (BrowserUtil.isFormApp()) {
                callAppFunction('toast', {
                    type: 'fail',
                    text: text
                });
            } else {
                Vue.$vux.toast.show({
                    type: 'text',
                    text: text,
                    width: '5rem',
                    position: 'bottom'
                });
            }
        },
        success: function (text) {
            if (BrowserUtil.isFormApp()) {
                callAppFunction('toast', {
                    type: 'success',
                    text: text
                });
            } else {
                Vue.$vux.toast.show({
                    type: 'text',
                    text: text,
                    width: '5rem',
                    position: 'bottom'
                });
            }
        },
        tip: function (text) {
            if (BrowserUtil.isFormApp()) {
                callAppFunction('toast', {
                    type: 'tip',
                    text: text
                });
            } else {
                Vue.$vux.toast.show({
                    type: 'text',
                    text: text,
                    width: '5rem',
                    position: 'bottom'
                });
            }
        }
    };

    Vue.prototype.$share = share;

    Vue.prototype.textToHtml = function (value, obool) {
        value = Boolean(value) === true ? value : '';
        value = value.replace(/\\n/g, '</br>').replace(/\n/g, '</br>').replace(/\[:(.+?)\]/g, '');
        obool ? value : value.replace(/ /g, '&nbsp;');
        return value;
    };
};
