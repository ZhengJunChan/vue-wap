<!-- [box_title_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->

<template>
  <h3 class="box_title_component" v-text="title" :style="{backgroundImage: `url(${icon})`}"></h3>
</template>

<script type="text/javascript">

export default {
    props: {
        title: String,
        icon: String
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
