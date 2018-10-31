<!-- [share_component]   @Author: 郑君婵   @DateTime: 2017-07-04 -->
<template>
  <div class="share_component">
    <span class="animation_img" @click.stop="download" v-text="count == 0 ? '分享' : count"></span>
  </div>
</template>

<script>
import { RouterUtil } from '@/utils';

export default {
    props: {
        count: {
            type: [Number, String],
            default: 0
        }
    },
    methods: {
        download() {
            RouterUtil.download(this.$router);
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
