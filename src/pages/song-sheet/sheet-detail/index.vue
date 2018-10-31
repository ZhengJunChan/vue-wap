<!-- [sheet_detail_page]   @Author: 郑君婵   @DateTime: 2017-09-28 -->
<template>
  <div class="sheet_detail_page">
    <music-header :info="songSheetInfos" no-doughnut type="sheet"></music-header>

    <tag-box :list="songSheetInfos.tags" title="歌单标签"></tag-box>

    <div class="body">
        <div class="music_list">
            <h2 class="title">歌曲列表（共{{songSheetInfos.total}}首）</h2>

            <music-list class="list_box" :list="songSheetInfos.music" type="detail" @on-clicked="addPlayCount"></music-list>
        </div>

        <div class="sheet">
            <h2 class="title">推荐的歌单</h2>

            <song-sheet-list :list="songSheetInfos.recommend" type="list" :max-num="6"></song-sheet-list>
        </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';
import titles from '@/pages/title.js';
import SongSheetApi from './../song-sheet-api.js';

import TagBox from '@/components/tag/tag-box';
import BoxTitle from '@/components/box-title';
import MusicHeader from '@/components/music-header';
import MusicList from '@/components/music-box/music-list';
import SongSheetList from '@/components/song-sheet/song-sheet-list';

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
                total: 0,
                counts: 0,
                music: []
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
                // this.$store.commit('setTitle', this.songSheetInfos.title);
                this.$share({
                    imgUrl: res.data.imgpic_info.link,
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
            let count = Number(this.songSheetInfos.counts_text);

            if (!isNaN(count)) {
                this.songSheetInfos.counts_text = ++count;
            }
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
