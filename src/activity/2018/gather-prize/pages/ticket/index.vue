<template>
    <div class="gather-page-ticket">
      <div class="ticket-img" :style="{'backgroundImage': `url(${info.imgpic_link?info.imgpic_link+'/584/823':''})`}" @click="viewBigFn(info.imgpic_link)">

      </div>
      <div class="button-warp">
        <button type="button" class="save" @click="setShareImg(info.imgpic_link,1)">保存图片</button>
        <button type="button" class="share" @click="setShareImg(info.imgpic_link,0)">分享祝福</button>
      </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        props: {
            info: {
                type: Object
            }
        },
        methods: {
            setShareImg(url, o) {
                let a = {
                    base64: '',
                    imgUrl: url,
                    shareInfo: {
                        alias: '2018chinayear ',
                        type: 5,
                        title: '神兽做护法，源音塘新年豪奖开抢啦！',
                        desc: '集齐神兽碎片就能换#源音塘#豪华大福袋，超赞！还有男神女神的撩人语音祝福，旺年人生赢家就是我！'
                    },
                    isSave: o
                };
                url && this.callAppFunction('save_share_Pic', Object.assign({}, a));
            },
            viewBigFn(url) {
                url && this.callAppFunction('previewer', {list: [{src: url}], index: 0});
            }
        }
    };
</script>
<style lang="less" scoped>
    @import 'index.less';
</style>
