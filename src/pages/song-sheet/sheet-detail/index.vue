<!-- [sheet_detail_page]   @Author: 郑君婵   @DateTime: 2017-09-28 -->
<template>
  <div class="sheet_detail_page">
    <music-header :info="songSheetInfos" no-doughnut type="sheet" @play="play" :playing="playing"></music-header>

    <tag-box :list="songSheetInfos.tags" :title="titles.tag.sheet" :icon="titles.tag.icon"></tag-box>

    <div class="body">
        <div class="music_list">
            <box-title class="list_title icon" :title="titles.musicList.sheet" :icon="titles.musicList.icon"></box-title>

            <music-list class="list_box" :list="songSheetInfos.music" type="detail"></music-list>
        </div>

        <div class="sheet">
            <box-title class="icon" :title="titles.sheet.sheet" :icon="titles.sheet.icon"></box-title>

            <song-sheet-list :list="songSheetInfos.recommend" type="list" :max-num="6"></song-sheet-list>
        </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';
import titles from '@/pages/title.js';
import SongSheetApi from './../song-sheet-api.js';

import { MusicHeader, TagBox, SongSheetList, BoxTitle, MusicList } from '@/components';

export default {
    components: {
        MusicHeader,
        TagBox,
        SongSheetList,
        BoxTitle,
        MusicList
    },
    data() {
        return {
            titles,
            songSheetId: this.$route.params.id, // 歌单id
            songSheetInfos: {
                tags: [],
                counts: 0
            } // 歌单信息
        };
    },
    watch: {
        '$route.params.id': function (id) {
            this.songSheetId = id;

            this.init();
        }
    },
    computed: {
        ...mapState({
            playingId: state => !state.player.playing.song.pause && state.player.playing.song.song_id
        }),
        playing() {
            return this.playingId === this.songSheetInfos.id;
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.getSongSheetDetail();
        },
        getSongSheetDetail() {
            let params = {
                id: this.songSheetId
            };

            SongSheetApi.getSongSheetDetail(params).then((res) => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.songSheetInfos = res.data;      // 轮播列表
                this.$parent.title = this.songSheetInfos.title;
                this.$share({
                    imgUrl: res.data.imgpic_link,
                    desc: res.data.remark,
                    title: res.data.title
                });
            }, (error) => {
                this.$toast.error(error.msg || '获取数据失败');
            });
        },
        play() {
            let params = {
                songSheet: this.songSheetInfos,
                addPlayCount: this.addPlayCount
            };

            this.$store.dispatch('playSongSheet', params);
        },
        addPlayCount() {
            this.songSheetInfos.counts++;
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
