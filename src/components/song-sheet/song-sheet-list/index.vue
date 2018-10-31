<!-- [song_sheet_list_component]   @Author: 郑君婵   @DateTime: 2017-09-26 -->

<template>
<div class="song_sheet_list_component">
    <div class="list" v-if="type === 'list'">
        <song-sheet-item class="item" v-for="(item, index) in list"
                         :key="item.id" v-if="!listMaxNum || (listMaxNum && index < listMaxNum)"
                         :info="item" type="list" :like="like"></song-sheet-item>
    </div>

    <div class="detail" v-if="type === 'detail'">
        <song-sheet-detail-item class="item" v-for="(item, index) in list"
        :key="item.id" :info="item" :total-count="totalCount"
        v-if="!listMaxNum || (listMaxNum && index < listMaxNum)"></song-sheet-detail-item>
    </div>
</div>
</template>

<script type="text/javascript">
import SongSheetItem from './../song-sheet-item';
import SongSheetDetailItem from './../song-sheet-detail-item';

export default {
    components: {
        SongSheetItem,
        SongSheetDetailItem
    },
    props: {
        like: Object,
        list: Array,
        maxNum: Number,
        type: String,
        totalCount: [Number, String]
    },
    computed: {
        listMaxNum() {
            if (!this.maxNum) {
                return 0;
            }

            if (this.like) {
                return this.maxNum - 1;
            }

            return this.maxNum;
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
