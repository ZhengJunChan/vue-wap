<!-- [singer_header_component]   @Author: 郑君婵   @DateTime: 2017-09-28 -->

<template>
<div class="singer_header_component">
    <div class="blur_bg" :style="{backgroundImage: `url(${$fixImg(info.head_info && info.head_info.link, `w=140&h=140`)})`}"></div>
    <div class="content">
      <header-img :size="140" :header-img="info.head_info && info.head_info.link" :header-id="info.id" :vip="info.is_music == 3"></header-img>

      <h2>
        <span class="name">
            {{info.nickname}}
            <i :class="info.sex ? 'boy' : 'gilr'"></i>
        </span>
      </h2>

      <div class="flow">
        <div class="item" v-text="'关注' + attentionNum"></div>
        <div class="split_line"></div>
        <div class="item" v-text="'粉丝' + fansNum"></div>
      </div>

      <div class="tab" @click="getDownloadPage()">
          <span>关注</span>
      </div>
    </div>
  <!-- </blur> -->
</div>
</template>

<script type="text/javascript">
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
        info: {
            type: Object,
            default() {
                return {
                    attention_num: 0,
                    fans_num: 0,
                    ips_num: 0
                };
            }
        }
    },
    data() {
        return {
            attentionNum: 0,
            fansNum: 0,
            ipsNum: 0
        };
    },
    watch: {
        info(data) {
            this.attentionNum = this.formatNumber(data.attention_num);
            this.fansNum = this.formatNumber(data.fans_num);
            this.ipsNum = this.formatNumber(data.ips_num);
        }
    },
    methods: {
        formatNumber,
        getDownloadPage() {
            RouterUtil.getDownloadPage(this.router);
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
