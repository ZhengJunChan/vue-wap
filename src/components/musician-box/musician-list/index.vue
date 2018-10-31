<!-- [musician_list_component]   @Author: 郑君婵   @DateTime: 2017-09-26 -->

<template>
<div class="musician_list_component">
    <musician-item class="item" :info="item" v-for="(item, index) in list" :key="item.id" v-if="!maxNum || (maxNum && index < maxNum)"></musician-item>
</div>
</template>

<script type="text/javascript">
import MusicianItem from './../musician-item';

export default {
    components: {
        MusicianItem
    },
    props: {
        list: Array,
        maxNum: Number
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
