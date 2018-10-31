<!-- [fallow_btn_component]   @Author: 郑君婵   @DateTime: 2017-07-04 -->
<template>
  <div class="fallow_btn_component" :class="`status${fallowedCode < 3 ? fallowedCode : 0}`" v-text="status[fallowedCode < 3 ? fallowedCode : 0]" @click.stop="download">
  </div>
</template>

<script type="text/javascript">
import { RouterUtil } from '@/utils';

export default {
    props: {
        fallowedCode: {
            type: Number,
            default: 0
        },  // 0未关注，1关注，2互相关注
        userId: Number
    },
    data() {
        return {
            status: ['+关注', '已关注', '相互关注']
        };
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
