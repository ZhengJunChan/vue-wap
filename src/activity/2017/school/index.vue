<template>
  <div class="dream_activity_page" :class="{'baoming_page': $route.fullPath === '/dream/finish'}">
  	<div class="baoming_tip">
  		<img class="baoming" src="./imgs/img_yibaoming.png" height="142" width="314">
  	</div>
    <div class="title">
      <img src="./imgs/img_title.png">
    </div>
    <p class="time">时间：{{timeRange}}</p>
    <img class="people" src="./imgs/img_people.png">

    <transition name="slide-right">
      <router-view class="container"></router-view>
    </transition>
  </div>
</template>

<script type="text/javascript">
import DreamApi from './dream-api.js';

export default {
    data() {
        return {
            timeRange: '',
            share: {
                title: '源音塘校园音乐大赛', // 分享标题
                link: window.location.origin + '/2017school/share', // 分享链接
                imgUrl: window.location.origin + '/static/imgs/activity/2017/school.jpg', // 分享图标
                desc: '500万音乐基金强势助力，让你的音乐梦照进现实，一步踏入娱乐圈！开启音乐之旅，在音乐的旅途中，源音塘与你邂逅！'
            }
        };
    },
    created() {
        this.$share(this.share);

        this.getActivityTime();
    },
    methods: {
        getActivityTime() {
            DreamApi.getActivityTime().then((res) => {
                if (res.code !== 200) {
                    this.timeRange = res.msg;
                    return;
                }

                this.rebuildTimeRange(res.data);
            }, (error) => {
                this.timeRange = error.msg;
            });
        },
        rebuildTimeRange(data) {
            let startTimes = data.start_time.split(' ')[0].split('-');
            let start = startTimes[0] + '年' + startTimes[1] + '月' + startTimes[2] + '日';

            let endTimes = data.end_time.split(' ')[0].split('-');
            let end = endTimes[1] + '月' + endTimes[2] + '日';

            this.timeRange = start + '-' + end;
        }
    }
};
</script>

<style lang="less" scoped>
  @import './main.less';
</style>
