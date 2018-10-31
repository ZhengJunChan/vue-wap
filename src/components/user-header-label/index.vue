<!-- [user_header_label_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->
<template>
    <div class="user_header_label_component">
      <header-img class="header" :size="88" :vip="info.is_music == 3" :header-img="info.head_info ? info.head_info.link : ''" :header-id="info.uid"></header-img>

      <div class="name text_nowrap_ellipsis">
        <div class="text">
          <p class="text_nowrap_ellipsis" v-text="info.nickname" @click="goMusicianDetail(info.uid)"></p>
          <p class="handle_name" v-show="info.source == 3">分享了</p>
        </div>
        <span class="time" v-text="info.update_time || info.create_time"></span>
      </div>

      <icon-fallow-btn class="fallow_btn" />
    </div>
</template>

<script type="text/javascript">
import { RouterUtil } from '@/utils';

import HeaderImg from './../header-img';
import IconFallowBtn from './../icon/fallow-btn';

export default {
    components: {
        HeaderImg,
        IconFallowBtn
    },
    props: {
        info: {
            type: Object,
            required: true
        }
    },
    methods: {
        goMusicianDetail(id) {
            RouterUtil.go(`/singer/${id}`, this.$router);
        }
    }
};
</script>

<style lang="less">
@import './main.less';
</style>
