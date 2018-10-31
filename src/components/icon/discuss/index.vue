<!-- [discuss_component]   @Author: 郑君婵   @DateTime: 2017-07-04 -->
<template>
  <div class="discuss_component">
    <span class="animation_img" v-text="count == 0 ? '评论' : count" @click.stop="download"></span>
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
