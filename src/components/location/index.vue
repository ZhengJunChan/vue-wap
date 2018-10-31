<!-- [location_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->
<template>
    <div class="location_component" v-text="addr">
    </div>
</template>

<script type="text/javascript">
export default {
    props: {
        addr: String
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
