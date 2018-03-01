<template>
  <div>
    <router-view></router-view>
    <c-loading v-model="isLoading"></c-loading>
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';
import { CLoading } from '@/components';

import store from '@/vuex';

export default {
    components: {
        CLoading
    },
    store,
    computed: {
        ...mapState({
            isLoading: state => state.vux.isLoading
        })
    },
    created() {
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
</style>
