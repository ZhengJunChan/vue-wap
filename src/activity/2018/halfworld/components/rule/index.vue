<!-- [rule_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->
<template>
    <div class="rule_component">
        <img class="title" :src="titleImg">
        <div class="content" v-html="content"></div>
        <img src="./../../img/rule/img_frame_bottom.png">
    </div>
</template>

<script type="text/javascript">

export default {
    props: {
        titleImg: String,
        titleText: String,
        content: String
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
