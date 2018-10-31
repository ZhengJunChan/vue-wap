<!-- [music_list_component]   @Author: 郑君婵   @DateTime: 2017-09-26 -->

<template>
<div class="music_list_component">
    <div class="detail" v-if="type === 'detail'">
        <music-detail-item class="item" v-for="(item, index) in list" :key="item.id" :info="item"
        :index="index + 1 + fromNum" @on-clicked="onClicked"
        v-if="!maxNum || (maxNum && index < maxNum)" />
    </div>

    <div class="list clear_float" v-if="type === 'list'">
        <music-item class="item fl" v-for="(item, index) in list" :key="item.id" v-if="!maxNum || (maxNum && index < maxNum)" :info="item"></music-item>
    </div>

	<div class="grey" v-if="type === 'grey'">
        <music-grey-item class="item" :info="item" v-for="(item, index) in list" :key="item.id" v-if="!maxNum || (maxNum && index < maxNum)"></music-grey-item>
    </div>
</div>
</template>

<script type="text/javascript">

import { Scroller, Flexbox, FlexboxItem } from 'vux';
import MusicItem from './../music-item';
import MusicGreyItem from './../music-grey-item';
import MusicDetailItem from './../music-detail-item';

export default {
    components: {
        Scroller,
        Flexbox,
        FlexboxItem,
        MusicItem,
        MusicGreyItem,
        MusicDetailItem
    },
    props: {
        list: Array,
        maxNum: Number,
        type: String,
        fromNum: {
            type: Number,
            default: 0
        }
    },
    methods: {
        onClicked() {
            this.$emit('on-clicked');
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
