<!-- [music_detail_page]   @Author: 郑君婵   @DateTime: 2017-09-28 -->
<template>
  <div class="music_detail_page">
    <music-header :info="musicInfos" no-zan @play="play" :playing="playing" type="music"></music-header>

    <tag-box :list="musicInfos.tags" :title="titles.tag.music" :icon="titles.tag.icon"></tag-box>

    <div class="body">

        <div class="intro">
            <box-title :title="titles.intro.music" :icon="titles.intro.icon"></box-title>

            <p class="content" :class="!isShowMoreIntro&&'five_lines'" v-html="musicInfos.intro || '暂无简介'" ref="content"></p>

            <div class="more_text" v-if="isOverContent">
                <p @click="tiggerMore" v-if="isShowMoreIntro">
                    <img src="./../../../imgs/common/icon_music_zhankai.png">
                </p>

                <p @click="tiggerMore" v-else>
                    <img src="./../../../imgs/common/icon_music_zhankai2.png">
                </p>
            </div>
        </div>

        <div v-if="musicInfos.song_all.length">
            <box-title :title="titles.sheet.music" :icon="titles.sheet.icon"></box-title>

            <song-sheet-list :list="musicInfos.song_all" type="list" :max-num="3"></song-sheet-list>
        </div>

        <div>
            <box-title :title="titles.guessLike.music" :icon="titles.guessLike.icon"></box-title>

            <music-list :list="musicInfos.likes" type="list" :max-num="6"></music-list>
        </div>

        <div v-if="musicInfos.topic.length">
            <box-title class="title" :title="titles.topic.music" :icon="titles.topic.icon"></box-title>
        </div>
    </div>

    <div class="topic" v-if="musicInfos.topic.length">
        <topic-list :list="musicInfos.topic" :max-num="page.perPage"></topic-list>

        <more-btn class="more_btn" text="查看更多"></more-btn>
    </div>

  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';
import titles from '@/pages/title.js';
import SongSheetApi from './../song-sheet-api.js';

import { MusicHeader, TagBox, BoxTitle, SongSheetList, MusicList, TopicList, MoreBtn } from '@/components';

export default {
    components: {
        MusicHeader,
        TagBox,
        BoxTitle,
        SongSheetList,
        MusicList,
        TopicList,
        MoreBtn
    },
    data() {
        return {
            titles,
            musicId: this.$route.params.id, // 歌单id
            musicInfos: {
                tags: [],
                song_all: [],
                likes: [],
                topic: [],
                intro: ''
            },
            page: {
                perPage: 5
            },
            isOverContent: true,
            isShowMoreIntro: true
        };
    },
    watch: {
        '$route.params.id': function (id) {
            this.musicId = id;

            this.init();
        }
    },
    computed: {
        ...mapState({
            playingId: state => !state.player.playing.song.pause && state.player.playing.song.id
        }),
        playing() {
            return this.playingId === Number(this.musicId);
        }
    },
    created() {
        this.init();
    },
//    mounted() {
//        this.setOverContent();
//    },
    methods: {
        init() {
            this.getMusicDetail();
        },
        setOverContent() {
            this.isOverContent = this.$refs.content.offsetHeight > 216 * parseFloat(document.documentElement.style.fontSize) / 100;
            this.isShowMoreIntro = false;
        },
        tiggerMore() {
            this.isShowMoreIntro = !this.isShowMoreIntro;
        },
        getMusicDetail() {
            let params = {
                id: this.musicId
            };

            SongSheetApi.getMusicDetail(params).then((res) => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.musicInfos = res.data;      // 轮播列表
                this.$nextTick(() => {
                    this.setOverContent();
                });

                this.$parent.title = res.data.title;

                this.$share({
                    imgUrl: this.musicInfos.imgpic_link,
                    desc: this.musicInfos.intro,
                    title: this.musicInfos.title
                });
            }, (error) => {
                this.$toast.error(error.msg || '获取数据失败');
            });
        },
        play() {
            let params = {
                music: this.musicInfos,
                addPlayCount: this.addPlayCount
            };
            this.$store.dispatch('playSong', params);
        },
        addPlayCount() {
            this.musicInfos.counts++;
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
