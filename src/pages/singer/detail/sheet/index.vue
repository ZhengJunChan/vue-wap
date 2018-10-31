<!-- [sheet_page]   @Author: 郑君婵   @DateTime: 2017-09-29 -->
<template>
  <div class="sheet_page">
    <div class="list_box" v-if="likeMusics.list.length">
        <h2 class="title">收藏的歌单({{likeMusics.page.totalCount}})</h2>
        <song-sheet-list :list="likeMusics.list" type="detail" :max-num="9" :total-count="likeMusics.page.totalCount"></song-sheet-list>
        <more-btn class="more_btn" text="查看全部歌单" v-if="likeMusics.page.totalCount > likeMusics.page.perPage"></more-btn>
    </div>

    <div class="list_box" v-if="songSheets.list.length">
        <h2 class="title">创建的歌单({{songSheets.page.totalCount}})</h2>
        <song-sheet-list :list="songSheets.list" type="detail" :max-num="9" :total-count="songSheets.page.totalCount"></song-sheet-list>
        <more-btn class="more_btn" text="查看全部歌单" v-if="songSheets.page.totalCount > songSheets.page.perPage"></more-btn>
    </div>

    <empty-tip class="empty_box" v-if="initSingerSheet && !songSheets.list.length && !likeMusics.list.length">
        <p>TA还没有歌单呢</p>
        <p> ╮(๑•́ ₃•̀๑)╭</p>
    </empty-tip>
  </div>
</template>

<script type="text/javascript">
import SingerApi from './../../singer-api.js';

import { SongSheetList, MoreBtn, EmptyTip } from '@/components';

export default {
    components: {
        SongSheetList,
        MoreBtn,
        EmptyTip
    },
    data() {
        return {
            initSingerSheet: false,
            songSheets: {
                list: [],
                page: {
                    perPage: 9,
                    totalCount: 0
                }
            },
            likeMusics: {
                list: [],
                page: {
                    perPage: 9,
                    totalCount: 0
                }
            }
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.getCollectionSongs();
            this.getSingerSheet();
        },
        /**
         * [getCollectionSongs 获取TA的收藏歌单]
         * @Author   郑君婵
         * @DateTime 2017-07-29
         */
        getCollectionSongs() {
            let params = {
                id: this.$parent.singerId
            };

            SingerApi.getGreatSheet(params).then((res) => {
                if (res.code !== 200) {
                    return;
                }

                this.likeMusics.list = res.data;
                this.likeMusics.page = res.page;
            });
        },
        getSingerSheet() {
            let params = {
                row: this.songSheets.page.perPage,
                id: this.$parent.singerId
            };

            SingerApi.getSingerSheet(params).then((res) => {
                this.initSingerSheet = true;

                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.songSheets.list = res.data;      // 轮播列表
                this.songSheets.page = res.page;
            }, (error) => {
                this.initSingerSheet = true;
                this.$toast.error(error.msg || '获取数据失败');
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
