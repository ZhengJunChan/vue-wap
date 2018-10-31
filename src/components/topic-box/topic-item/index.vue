<!-- [topic_item_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->

<template>
  <div class="topic_item_component"
  :class="{'more_img': info.imglist_info && info.imglist_info.length > 1 }">
    <user-header-label :info="info" />

    <div class="content">
      <span v-html="info.content" @click="goTopicDetail(info.id)"></span>
    </div>

    <div class="img_box" :class="[`img${info.imglist_info && info.imglist_info.length}`,{'more_img_tip': info.imglist_info && info.imglist_info.length>3}]" v-if="info.imglist_info && info.imglist_info.length" @click="goTopicDetail(info.id)">
      <div class="img" :style="{backgroundImage: `url(${$fixImg(img.link, 'w=200&h=200')})`}" v-for="(img, index) in info.imglist_info" v-if="index < 3"></div>
      <div class="more_tip">+{{info.imglist_info ? (info.imglist_info.length-3) : 0}}</div>
    </div>

    <music-label class="music_label" :type="getLabelType(info.item_type)" :info="info.item_info" v-if="info.item_info && Object.keys(info.item_info).length" :default-cover="info.share_default_img_info"></music-label>

    <location v-if="info.place_desc" class="location" :addr="info.place_desc" />

    <div class="icon_label">
      <icon-share class="icon" :count="info.share_counts_text" />
      <icon-discuss class="icon" :count="info.thcount_text" />
      <icon-zan class="zan icon" :id="info.id" type="5" v-model="info.agrees_text" :selected="!!info.is_agree" />
    </div>
  </div>
</template>

<script type="text/javascript">

import Location from './../../location';
import HeaderImg from './../../header-img';
import MusicLabel from './../../music-label';
import IconDiscuss from './../../icon/discuss';
import IconZan from './../../icon/zan';
import IconShare from './../../icon/share';
import IconFallowBtn from './../../icon/fallow-btn';
import UserHeaderLabel from './../../user-header-label';

import icons from './../icon.js';
import { RouterUtil } from '@/utils';

export default {
    components: {
        Location,
        HeaderImg,
        MusicLabel,
        IconZan,
        IconShare,
        IconDiscuss,
        IconFallowBtn,
        UserHeaderLabel
    },
    props: {
        info: Object
    },
    data() {
        return {
            icons,
            playing: false,
            labelObj: {
                id: ''
            }
        };
    },
    methods: {
        getLabelType(type) {
            switch (Number(type)) {
            case 1: type = 'music'; break;
            case 2: type = 'song'; break;
            case 3: type = 'topic'; break;
            case 4: type = 'mv'; break;
            }

            return type;
        },
        goTopicDetail(id) {
            this.go(`/topic/detail?id=${id}`);
        },
        goMusicianDetail(id) {
            this.go(`/singer/${id}`);
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
