<!-- [ads_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->
<template>
    <div class="ads_component">
        <div class="music_lry">
            <div class="text text_nowrap_ellipsis">{{notice}}</div>
        </div>

        <div class="great_sheet text_nowrap_ellipsis" @click="goPage"
        :style="{backgroundImage: `url(${_ads.imgpic_info ? $fixImg(_ads.imgpic_info.link, 'w=690&h=210') : ''})`}">
            <div class="shadow"></div>
            <div class="text_label">
                <span class="type">{{_ads.place}}</span>
                <span>{{_ads.title}}</span>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import { RouterUtil } from '@/utils';

export default {
    props: {
        notice: String,
        ads: Object
    },
    computed: {
        _ads() {
            return Object.assign({
                place: '',
                title: '',
                imgpic_info: {
                    link: ''
                }
            }, this.ads);
        }
    },
    methods: {
        goPage() {
            this._ads.url && RouterUtil.go(this._ads.url, this.$router);
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
