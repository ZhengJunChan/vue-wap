<template>
<div class="finish_page">
    <div class="tip">
        <p>快来为我疯狂打call吧！</p>

        <p>更多比赛信息及福利<br>
        请关注官方微博@源音塘音乐<br>
        官方微信YYTangMusic</p>
    </div>
    <p class="time">时间：{{timeRange}}</p>
</div>
</template>

<script type="text/javascript">
import DreamApi from './../dream-api.js';

export default {
    data() {
        return {
            timeRange: ''
        };
    },
    created() {
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
