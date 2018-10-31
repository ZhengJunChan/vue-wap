<!-- [song_sheet_item_component]   @Author: 郑君婵   @DateTime: 2017-09-25 -->

<template>
  <div class="song_sheet_item_component" :class="type">
  	<div class="cover_img_box" @click="goSheetDtail()">
  		<div  class="cover_img" :style="{backgroundImage: `url(${$fixImg(info.imgpic_info.link, 'w=190&h=190')})`}">
      		<p class="sheet_counts">
      			<span v-text="info.counts_text"></span>
      		</p>
            <img class="ctrl_btn like_icon" :src="icons.heart.big">
        </div>
    </div>

	<p class="sheet_name" v-text="type === 'like' ? info.nickname+'喜欢的歌曲' : info.title" @click="goSheetDtail()"></p>
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
        type: {
            type: String,
            default: 'list'  // list、like
        }
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

            this.type !== 'like' && SongSheetApi.getSongSheetDetail(params).then((res) => {
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
            if (this.info.show_type === 1) {
                // 新歌速递
                this.go('/recommends?type=new-song');
            } else if (this.type === 'like') {
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
