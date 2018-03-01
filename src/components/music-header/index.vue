<!-- [music_header_component]   @Author: 郑君婵   @DateTime: 2017-09-28 -->

<template>
<div class="music_header_component" :class="{'like': type === 'like'}">
  <blur :blur-amount=20 :url="info.imgpic_link+'/220/220'">
    <div class="content">
        <div class="cover_img" :style="{backgroundImage: `url(${info.imgpic_link}/220/220)`}"></div>

        <h2 class="title" v-text="type === 'like' ? info.nickname+'喜欢的歌曲' : info.title"></h2>

        <div class="singer_info" v-if="type !== 'like'">
      	  <header-img class="fl" :size="60" :header-img="info.head_link" :header-id="info.uid" :vip="info.member_type==2"></header-img>
          <span class="singer_name text_nowrap_ellipsis" @click="goMusicianDetail(info.uid)">
            {{info.nickname}}
          </span>
        </div>

        <span class="play play_btn" v-if="type === 'like'" v-text="formatNumber(info.counts)"
        :style="{backgroundImage: `url(${playing ? icons.pause : icons.play})`}"  @click.stop="play"></span>

        <flexbox :gutter="0" class="icons" v-if="type !== 'like'">
          <flexbox-item class="item">
            <span class="disscuss" v-text="formatNumber(info.comment)" @click="getDownloadPage()"></span>
          </flexbox-item>
          <flexbox-item class="item">
            <span class="collect" v-text="getCollectionCount()" @click="getDownloadPage()"></span>
          </flexbox-item>
          <flexbox-item class="item" v-if="!noDoughnut">
            <span class="doughnut" v-text="formatNumber(info.coin)" @click="getDownloadPage()"></span>
          </flexbox-item>
          <flexbox-item class="item" v-if="!noZan">
            <span class="zan" v-text="formatNumber(info.agrees)" @click="getDownloadPage()"></span>
          </flexbox-item>
          <flexbox-item class="item">
            <span class="play" v-text="formatNumber(info.counts)" @click.stop="play"
            :style="{backgroundImage: `url(${playing ? icons.pause : icons.play})`}"></span>
          </flexbox-item>
        </flexbox>
    </div>
  </blur>
</div>
</template>

<script type="text/javascript">
import icons from './icons.js';
import { RouterUtil } from '@/utils';
import { formatNumber } from '@/filters';

import HeaderImg from './../header-img';
import { Blur, Flexbox, FlexboxItem } from 'vux';

export default {
    components: {
        HeaderImg,
        Blur,
        Flexbox,
        FlexboxItem
    },
    props: {
        playing: {
            type: Boolean,
            default: false
        },
        type: String,
        info: Object,
        noDoughnut: {
            type: Boolean,
            default: false
        },
        noZan: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            icons
        };
    },
    methods: {
        getCollectionCount() {
            if (this.type === 'like' || this.type === 'sheet') {
                return this.formatNumber(this.info.collection);
            }

            if (this.type === 'music') {
                return this.formatNumber(this.info.collects);
            }
        },
        goMusicianDetail(id) {
            this.go(`/singer/${id}`);
        },
        go(link) {
            RouterUtil.go(link, this.$router);
        },
        getDownloadPage() {
            RouterUtil.getDownloadPage(this.$router);
        },
        play() {
            this.$emit('play');
        },
        formatNumber
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
