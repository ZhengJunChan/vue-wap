<!-- [home_page]   @Author: 郑君婵   @DateTime: 2017-09-25 -->
<template>
  <div class="home_page">
    <div class="banner_box">
        <swiper class="banner" :list="banner" v-if="banner.length"></swiper>
        
        <div class="classify_box clear_float">
            <router-link tag="div" class="item fl today"
            :to="{path: '/recommends', query: { type: 'today' }}"
            :style="{backgroundImage: `url(${today.cate_img.imgpic_info && $fixImg(today.cate_img.imgpic_info.link, 'w=300&h=250')})`}">
                <p class="title">今日推荐</p>
                <p class="desc_text">RECOMMENDED DAILY</p>
                <div class="play_btn"></div>
            </router-link>
            <div class="fr">
                <div class="item music" @click="download">
                    <p class="title">音乐分类</p>
                    <p class="desc_text">MUSIC CATEGORY</p>
                </div>
                <div class="bottom">
                    <router-link tag="div" class="item billboard" to="/download">
                    <!-- <router-link tag="div" class="item billboard" to="/top/navs"> -->
                        <p class="title">排行</p>
                        <p class="desc_text">CHART</p>
                    </router-link>
                    <div class="item near" @click="download">
                        <p class="title">附近</p>
                        <p class="desc_text">NAERBY</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="list_box">

        <!-- 推荐歌单 -->
        <div>
            <div class="title_label song">
                <cell title="推荐歌单" />
            </div>

            <song-sheet-list :list="songSheet.song" type="list" :max-num="6"></song-sheet-list>

            <ads :ads="adsList[0] && adsList[0].ads" :notice="adsList[0] && adsList[0].notice" />
        </div>
        <!-- /  推荐歌单 -->

        <!-- 原创音乐 -->
        <div v-if="musicsList.yuanchuang.length">
            <div class="title_label yuanchgang">
                <cell title="原创音乐" />
            </div>

            <music-list :list="musicsList.yuanchuang" type="grey" :max-num="10"></music-list>

            <ads  :ads="adsList[1] && adsList[1].ads" :notice="adsList[1] && adsList[1].notice" />
        </div>
        <!-- /  原创音乐 -->

        <!-- 原创音乐 -->
        <div v-if="musicsList.fanchang.length">
            <div class="title_label fanchgang">
                <cell title="翻唱音乐" />
            </div>

            <music-list :list="musicsList.fanchang" type="grey" :max-num="10"></music-list>
        </div>
        <!-- /  原创音乐 -->

        <!-- 推荐音乐人 -->
        <div>
            <div class="title_label musician">
                <cell title="热门音乐人" />
            </div>

            <musician-list :list="musicians" :max-num="6"></musician-list>
        </div>
        <!-- /  推荐音乐人 -->
    </div>
  </div>
</template>

<script type="text/javascript">
import { RouterUtil, CommonUtil } from '@/utils';
import HomeApi from './home-api.js';

import Cell from '@/components/cell';
import Ads from '@/components/ads';
import Swiper from '@/components/swiper';
import MusicList from '@/components/music-box/music-list';
import MusicianList from '@/components/musician-box/musician-list';
import SongSheetList from '@/components/song-sheet/song-sheet-list';

export default {
    components: {
        Swiper,
        Ads,
        Cell,
        SongSheetList,
        MusicianList,
        MusicList
    },
    data() {
        return {
            today: {
                cate_img: {
                    imgpic_info: {
                        link: ''
                    }
                }
            },
            songSheet: {
                cate_img: {},
                song: []
            },
            adsList: [],
            banner: [],
            musicians: [],
            musicsList: {
                yuanchuang: [],
                fanchang: []
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
                this.today = res.data.today_recommends;      // 今日推荐
                this.songSheet = res.data.recommend_song || [];      // 轮播列表
                this.musicians = res.data.recommend_musician.musician || [];    // 推荐音乐人
                this.rebuildAds(res.data.yxy_notice, res.data.home_ad);
                this.rebuildMusicList(res.data.type_music);
            }, (error) => {
                this.$toast.error(error.msg || '获取数据失败');
            });
        },
        rebuildAds(notice, ads) {
            let count = 2;
            let index = 0;

            for (; index < count; index++) {
                this.adsList.push({
                    notice: notice[CommonUtil.getRandom(0, notice.length)].title,
                    ads: ads[index]
                });
            }
        },
        rebuildMusicList(typeList) {
            typeList.forEach(item => {
                this.musicsList[item.alias] = item.music;
            });
        },
        download() {
            RouterUtil.download(this.$router);
        }
    }
};
</script>

<style lang="less" scoped>
@import './home.less';
</style>
