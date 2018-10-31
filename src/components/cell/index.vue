<!-- [cell_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->
<template>
    <div class="cell_component">
        <div class="title" v-text="title" :style="{backgroundImage: `url(${icon})`, paddingLeft: icon ? '0.7rem' : 0}"></div>
        <div class="bg"></div>
    </div>
</template>

<script type="text/javascript">
export default {
    props: {
        title: String,
        icon: String
    }
};
</script>

<style lang="less">
@import './main.less';
</style>
