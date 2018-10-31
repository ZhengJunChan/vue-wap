<!-- [cell_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->
<template>
    <div class="share_tip" @click="close">
        <img src="./../../../imgs/common/img_share.png" onclick="return false">
    </div>
</template>

<script type="text/javascript">

export default {
    methods: {
        close() {
            this.$store.dispatch('close');
        }
    }
};
</script>
<style lang="less" scoped>
    @import './main.less';
</style>
