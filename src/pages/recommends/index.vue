<!-- @Author: 郑君婵   @DateTime: 2017-09-29 -->
<template>
  <div class="page">
  	<div class="today header" v-if="$route.query.type === 'today'"
  	:style="{backgroundImage: `url(${recommends.cate_img.imgpic_info && recommends.cate_img.imgpic_info.link})`}">
      <div class="text">
        <div class="month" v-text="month"></div>
        <p class="piont">今日推荐（每日12点更新）</p>
        <p>诸君，你喜欢的音乐都被我承包了❥(^_-)</p>
  		</div>
  	</div>
  	<div class="new_song header" v-if="$route.query.type === 'new-song'">
  		<div class="text">根据你的听歌品味，为你每天推荐{{recommends.musics.length}}首</div>
  	</div>
  	<div class="title">歌曲列表（共{{recommends.musics.length}}首）</div>
  	<music-list :list="recommends.musics" type="detail"></music-list>
  </div>
</template>

<script type="text/javascript">
import { MusicList } from '@/components';
import { SongSheetApi } from '@/api';

export default {
    components: {
        MusicList
    },
    data() {
        return {
            recommends: {
                cate_img: {
                    imgpic_info: {
                        link: ''
                    }
                },
                musics: []
            },
            month: 0
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            if (this.$route.query.type === 'today') {
                this.getToday();
                this.initMonth();
            }

            if (this.$route.query.type === 'new-song') {
                this.getNewSong();
            }
        },
        initMonth(month) {
            month = month || ((new Date()).getMonth() + 1);

            this.month = month > 10 ? month : ('0' + month);
        },
        getNewSong() {
            SongSheetApi.getRecommendNewSong().then(res => {
                if (res.code !== 200) {
                    return;
                }

                this.recommends.musics = res.data.list;
            }).catch(error => {
                this.$toast.error(error.msg || '获取数据失败');
            });
        },
        getToday() {
            SongSheetApi.getToday().then(res => {
                if (res.code !== 200) {
                    return;
                }

                this.recommends = res.data;
                this.initMonth(this.recommends.cate_img.month);
            }).catch(error => {
                this.$toast.error(error.msg || '获取数据失败');
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
