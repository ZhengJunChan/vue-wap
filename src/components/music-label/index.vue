<!-- [music_label_component]   @Author: 郑君婵   @DateTime: 2017-10-09 -->

<template>
  <div class="music_label_component" :class="[type, {'no_cover': !info || !info.coverImage}]" v-if="type" @click="go(item[type].url)">
    <div class="cover" :style="{backgroundImage: `url(${coverImage && $fixImg(coverImage.link, 'w=110&h=110')})`}" @click="goMusicDetail(info.id)"></div>
    <div class="info">
        <div class="text_nowrap_ellipsis title_label">
            <span class="type" v-text="item[type].type"></span>
            <span class="title" v-text="info && info.title" @click="goMusicDetail(info.id)"></span>
        </div>
        
        <div class="desc" v-text="info && info.nickname" @click="goSingerDetail(info.uid)"></div>

        <div class="play_btn" @click.stop="play(info.id)">
            <img :src="playing ? icons.puase : icons.play">
        </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import icons from './icon.js';
import { mapState } from 'vuex';
import { RouterUtil } from '@/utils';

export default {
    props: {
        info: Object,
        type: String,
        defaultCover: Object
    },
    data() {
        return {
            icons,
            item: {
                topic: {
                    type: '池塘',
                    url: `/topic/detail?id=${this.info.id}`
                },
                music: {
                    type: '单曲',
                    url: `/music/${this.info.id}`
                },
                song: {
                    type: '歌单',
                    url: `/mlist/${this.info.id}`
                },
                mv: {
                    type: 'MV',
                    url: `/music/${this.info.id}?type=mv`
                }
            }
        };
    },
    computed: {
        ...mapState({
            playingId: state => !state.player.playing.song.pause && state.player.playing.song.id
        }),
        playing() {
            return this.playingId === this.info.id;
        },
        coverImage() {
            return this.info ? (this.info.imgpic_info || ((this.info.imglist_info && this.info.imglist_info.length) ? this.info.imglist_info[0] : this.defaultCover)) : false;
        }
    },
    methods: {
        goMusicDetail(id) {
            this.go(`/music/${id}`);
        },
        goSingerDetail(id) {
            // this.go(`/singer/${id}`);
        },
        go(link) {
            RouterUtil.go(link, this.$router);
        },
        play() {
            let params = {};

            if (this.type === 'music') {
                params = {
                    music: this.info
                };

                this.$store.dispatch('playSong', params);
            }
        }
    }
};
</script>

<style lang="less">
@import './main.less';
</style>
