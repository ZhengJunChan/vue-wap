<template>
  <div class="app_container">
    <router-view></router-view>
    <!-- <login-alert v-model="$store.state.user.loginAlert.isOpen" @login-success="$store.state.user.loginAlert.successCallback" /> -->
    <message-alert @on-success="$store.state.user.messageAlert.submitCallback" v-if="$store.state.user.messageAlert.isOpen"/>
    <alert-box v-show="alertPanel.type" :type="alertPanel.type" :options="alertPanel.options" />
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';
import { AlertBox, MessageAlert } from '@/components';

import store from '@/vuex';

export default {
    components: {
        AlertBox,
        MessageAlert
    },
    store,
    computed: {
        ...mapState({
            isLoading: state => state.vux.isLoading,
            alertPanel: state => state.alert
        })
    },
    created() {
        this.$store.commit('setLoginStatus');
        // 移除一开始为白屏添加的等待效果
        this.removeClass(document.getElementsByTagName('body')[0], 'loading');
    },
    methods: {
        removeClass(obj, className) {
            if (this.hasClass(obj, className)) {
                var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
                obj.className = obj.className.replace(reg, ' ');
            }
        },
        hasClass(obj, className) {
            return obj.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        }
    }
};
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './utils/response-style/base.less';

.app_container{
    /**
     * 解决vue2，返回上一页白屏问题
     * form: 郑君婵
     * date: 2018-05-02
     */
    height: 100%;
    overflow-y: auto;
    /* / 解决vue2，返回上一页白屏问题 */

    /**
     * 解决滑动时卡顿问题
     * form: 郑君婵
     * date: 2018-05-02
     */
    -webkit-overflow-scrolling: touch;
    /* / 解决滑动时卡顿问题 */
}
</style>
