<!-- [song_sheet_item_component]   @Author: 郑君婵   @DateTime: 2017-09-25 -->

<template>
  <div class="song_sheet_detail_item_component" @click="goSheetDtail()">
    <div class="img_box">
        <div :style="{backgroundImage: `url(${info.imgpic_info && $fixImg(info.imgpic_info.link, 'w=190&h=190')})`}"></div>
    </div>
    <div class="infos">
        <p class="title text_nowrap_ellipsis" v-text="info.title"></p>
        <p class="count text_nowrap_ellipsis">{{totalCount}}首，播放{{info.counts_text}}次</p>
    </div>
  </div>
</template>

<script type="text/javascript">
// import { mapState } from 'vuex';
import icons from './../icon.js';
import { RouterUtil } from '@/utils';
import SongSheetApi from './../song-sheet-api.js';

export default {
    props: {
        info: Object,
        totalCount: [Number, String]
    },
    data() {
        return {
            icons
        };
    },
    // computed: {
    //     ...mapState({
    //         playingId: state => !state.player.playing.song.pause && state.player.playing.song.song_id
    //     }),
    //     playing() {
    //         return this.playingId === this.info.id;
    //     }
    // },
    mounted() {
        // this.getMusicList();
    },
    methods: {
        getMusicList() {
            let params = {
                id: this.info.id
            };

            this.type !== 'like' && this.info.id && SongSheetApi.getSongSheetDetail(params).then((res) => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.info.music = res.data;      // 轮播列表
            }, (error) => {
                this.$toast.error(error.msg || '获取数据失败');
            });
        },
        // play(id) {
        //     let params = {
        //         songSheet: this.info.music,
        //         addPlayCount: this.addPlayCount
        //     };

        //     this.$store.dispatch('playSongSheet', params);
        // },
        // addPlayCount() {
        //     this.info.counts++;
        // },
        goSheetDtail() {
            if (this.type === 'like') {
                this.go(`/singer/${this.info.uid}/sheet`);
            } else {
                this.go(`/mlist/${this.info.id}`);
            }
        },
        go(link) {
            RouterUtil.go(link, this.$router);
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
