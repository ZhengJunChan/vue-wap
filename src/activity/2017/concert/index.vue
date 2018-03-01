<template>
  <div class="concert_activity">
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
export default {
    data() {
        return {
            shareInfos: {
                title: '我关注的源音塘次元音乐会开始啦，一起来玩吧！', // 分享标题
                link: window.location.origin + '/ciyuan2017', // 分享链接
                imgUrl: window.location.origin + '/static/imgs/activity/2017/concert.png', // 分享图标
                desc: '源音塘次元音乐会现场嘉宾有伦桑、奇然、小魂、Assen捷、柏凝、竹桑、冥月、白荏等，还将赠送伴手礼和抽奖福利，精彩不容错过哦！'
            }
        };
    },
    created() {
        this.$share(this.shareInfos);
    }
};
</script>
