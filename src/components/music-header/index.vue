<!-- [music_header_component]   @Author: 郑君婵   @DateTime: 2017-09-28 -->

<template>
<div class="music_header_component" :class="{'like': type === 'like'}">
    <div class="blur_bg" :style="{backgroundImage: `url(${info.imgpic_info ? $fixImg(info.imgpic_info.link, 'w=300&h=300') : ''})`}"></div>
    <div class="content" :class="type">
        <div class="cover_img" :style="{backgroundImage: `url(${info.imgpic_info && $fixImg(info.imgpic_info.link, 'w=300&h=300')})`}">
            <div class="count" v-text="info.counts_text"></div>
        </div>

        <h2 class="title">
            <span class="music_type yuanchang" v-if="info.music_type == 1">原创</span>
            <span class="music_type fanchang" v-else>翻创</span>
            {{type === 'like' ? info.nickname+'喜欢的歌曲' : info.title}}
        </h2>

        <div class="singer_info" v-if="type !== 'like'">
            <div class="fl">
      	         <header-img :size="48" :header-img="info.head_info ? info.head_info.link : ''" :header-id="info.uid" :vip="info.is_music == 3"></header-img>
            </div>
          <span class="singer_name text_nowrap_ellipsis" @click="goMusicianDetail(info.uid)">
            {{info.nickname}}
          </span>
        </div>

        <div class="icons" v-if="type !== 'like'">
            <div class="item">
                <span class="collect" v-text="getCollectionCount()" @click="getDownloadPage()"></span>
            </div>

            <div class="item" :style="{textAlign: noZan ? 'left' : 'center'}">
                <span class="disscuss" v-text="info.comment_text" @click="getDownloadPage()"></span>
            </div>

            <div class="item" v-if="!noZan">
                <span class="zan" :class="{selected: info.is_agree}" v-text="info.agrees_text || 0" @click="changeAgree()"></span>
            </div>
        </div>

        <div class="play_btn" :class="playing ? 'pause' : 'play'" @click.stop="play"
        v-if="type === 'music'"></div>
    </div>
</div>
</template>

<script type="text/javascript">
import icons from './icons.js';
import { RouterUtil } from '@/utils';

import HeaderImg from './../header-img';
import IconZan from './../icon/zan';
import ZanApi from './../icon/zan/api.js';
import { Blur, Flexbox, FlexboxItem } from 'vux';

export default {
    components: {
        HeaderImg,
        Blur,
        IconZan,
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
                return this.info.collection_text;
            }

            if (this.type === 'music') {
                return this.info.collects_text;
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
        changeAgree() {
            let params = {
                item_id: this.info.id,
                type: 2
            };

            ZanApi.changeStatus(params).then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                }

                this.info.is_agree = Number(res.data) > 0;
                let count = Number(this.info.agrees_text);

                if (!isNaN(count)) {
                    this.info.agrees_text = count + Number(res.data);
                }
            }, error => {
                this.isSelected = true;
                this.$toast.error(error.msg);
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
