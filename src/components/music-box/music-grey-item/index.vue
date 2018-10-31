<!-- [music_item_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->

<template>
  <div class="music_item_component" @click.stop="play(info)">
    <div class="cover_img" :style="{backgroundImage: `url(${$fixImg(info.imgpic_info.link, 'w=150&h=150')})`}">
        <span class="type" v-if="info.music_type == 1">原创</span>
    </div>
    <div class="info_box" :class="{playing}">
      <p class="music_name text_nowrap_ellipsis" :class="info.mv && 'mv_tag'">
       <span v-html="info.title"></span>
       <icon-mv class="mv_icon" />
      </p>
      <p class="singer_name text_nowrap_ellipsis">
        <span v-html="info.nickname"></span>
      </p>
      <span class="count play_count" v-text="info.counts"></span>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';
import icons from './../icon.js';
import { RouterUtil } from '@/utils';
import { IconMv } from './../../icon';

export default {
    components: {
        IconMv
    },
    props: {
        info: Object
    },
    data() {
        return {
            icons
        };
    },
    computed: {
        ...mapState({
            playingId: state => !state.player.playing.song.pause && state.player.playing.song.id
        }),
        playing() {
            return this.playingId === this.info.id;
        }
    },
    methods: {
        play(music) {
            let params = {
                music,
                addPlayCount: this.addPlayCount
            };

            this.$store.dispatch('playSong', params);
        },
        addPlayCount() {
            this.info.counts++;
        },
        goMusicDetail(id) {
            this.go(`/music/${id}`);
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
