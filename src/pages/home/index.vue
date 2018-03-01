<!-- [home_page]   @Author: 郑君婵   @DateTime: 2017-09-25 -->
<template>
  <div class="home_page">
    <swiper :list="banner" v-if="banner.length"></swiper>

    <!-- 推荐歌单 -->
    <div>
        <cell class="title_label" :title="songSheet.cate_img.title" :icon="songSheet.cate_img.imgpic_link + ''">
        </cell>

        <song-sheet-list :list="songSheet.song" type="x-scroller" :max-num="6"></song-sheet-list>
    </div>
    <!-- /  推荐歌单 -->

    <!-- 推荐音乐人 -->
    <div>
        <cell class="title_label" :title="musicians.cate_img.title" :icon="musicians.cate_img.imgpic_link + ''">
        </cell>

        <musician-list :list="musicians.musician" :max-num="6"></musician-list>
    </div>
    <!-- /  推荐音乐人 -->

    <!-- 分类音乐 -->
    <div v-for="item in musicsList" v-if="item.music && item.music.length">
        <cell class="title_label" :title="item.title" :icon="item.imgpic_link + ''">
        </cell>

        <music-list :list="item.music" type="x-scroller" :max-num="10"></music-list>
    </div>
    <!-- /  分类音乐 -->

    <div v-if="topics.topic && topics.topic.length">
        <cell class="title_label" :title="topics.cate_img.title" :icon="topics.cate_img.imgpic_link + ''">
        </cell>

        <topic-list :list="topics.topic" :max-num="3"></topic-list>
    </div>
  </div>
</template>

<script type="text/javascript">
import HomeApi from './home-api.js';

// import { Cell } from 'vux';
import { Swiper, SongSheetList, MusicianList, MusicList, TopicList, Cell } from '@/components';

export default {
    components: {
        Swiper,
        Cell,
        SongSheetList,
        MusicianList,
        MusicList,
        TopicList
    },
    data() {
        return {
            banner: [],
            songSheet: {
                cate_img: {},
                song: []
            },
            musicians: {
                cate_img: {},
                musician: []
            },
            musicsList: [],
            topics: {
                cate_img: {},
                musician: []
            }
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            HomeApi.getHomeData().then((res) => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.banner = res.data.shuffling || [];      // 轮播列表
                this.songSheet = res.data.song || [];        // 推荐歌单
                this.musicians = res.data.musician || [];    // 推荐音乐人
                this.musicsList = res.data.catemusic || [];   // 分类音乐
                this.topics = res.data.topic || [];          // 热门话题
            }, (error) => {
                this.$toast.error(error.msg || '获取数据失败');
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import './home.less';
</style>
