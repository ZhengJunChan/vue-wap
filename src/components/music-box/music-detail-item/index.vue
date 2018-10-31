<!-- [music_detail_item_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->

<template>
  <div class="music_detail_item_component" :class="active && 'active'" @click="playMusic(info)">
    <div class="cover_img" :style="{backgroundImage: `url(${info.imgpic_info ? info.imgpic_info.link : info.imgpic_link})`}"></div>
    <div class="info_box" :class="info.mv && 'mv_tag'">
        <div>
          <h2 class="title text_nowrap_ellipsis" v-text="info.title"></h2>
          <p class="singer text_nowrap_ellipsis">
              <span class="type" v-if="info.music_type == 1">原创</span>
              {{info.nickname}}
          </p>
        </div>
        <icon-mv class="mv_icon" />
        <span class="play_btn" :class="{ playing: !pause }"></span>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';
import { RouterUtil } from '@/utils';

import icons from './../icon.js';
import { IconMv } from './../../icon';
import HeaderImg from './../../header-img';

export default {
    components: {
        IconMv,
        HeaderImg
    },
    props: {
        index: Number,
        info: Object
    },
    data() {
        return {
            icons
        };
    },
    computed: {
        ...mapState({
            playingId: state => state.player.playing.song.id,
            pause: state => state.player.playing.song.pause
        }),
        active() {
            return this.playingId === this.info.id && !this.pause;
        }
    },
    methods: {
        goMusicDetail(id) {
            this.go(`/music/${id}`);
        },
        go(link) {
            RouterUtil.go(link, this.$router);
        },
        playMusic(music) {
            let params = {
                music,
                addPlayCount: this.onClick
            };

            this.$store.dispatch('playSong', params);
        },
        onClick() {
            this.$emit('on-clicked');
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
