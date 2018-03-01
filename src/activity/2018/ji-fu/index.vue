<template>
  <div class="ji_fu_activity">
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
import JiFuApi from './ji-fu-api.js';
import { BrowserUtil, RouterUtil } from '@/utils';

export default {
    data() {
        return {
            shareInfos: {
                type: 5, // 5:抽奖活动,6:投票活动
                alias: JiFuApi.alias,
                title: '神兽做护法，源音塘新年豪奖开抢啦！', // 分享标题
                link: window.location.origin + '/activity/2018_ji_fu', // 分享链接
                imgUrl: window.location.origin + '/static/imgs/activity/2018/img_newyear_share.png', // 分享图标
                desc: '传说中的男神女神蜜汁语音条正在等你点开哦',
                inputText: '集齐神兽碎片就能换#源音塘#豪华大福袋，超赞！还有男神女神的撩人语音祝福，旺年人生赢家就是我！'
            },
            activity: {
                remark: '',
                ruleIntro: '',
                timeRange: ''
            }
        };
    },
    created() {
        // 获取活动信息
        this.getActivityInfo();
        this.$share(this.shareInfos);
    },
    methods: {
        getActivityInfo() {
            JiFuApi.getActivityInfo().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.activity.remark = res.data.remark;
                this.activity.ruleIntro = res.data.role;
                this.rebuildTimeRange(res.data);
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        rebuildTimeRange(data) {
            let startTimes = data.start_time.split(' ')[0].split('-');
            let start = startTimes.join('.');

            let endTimes = data.end_time.split(' ')[0].split('-');
            let end = endTimes.join('.');

            this.activity.timeRange = start + '-' + end;
        },
        goInputAddrPage(prize) {
            let param = {
                url: `/activity/2018_ji_fu/addr?prizeId=${prize.win_id}&addr=material&url=${this.$route.path}`,
                title: '填写兑奖信息'
            };

            if (BrowserUtil.isFromAndroidApp()) {
                RouterUtil.go(param.url, this.$router);
            } else {
                this.goPage(param);
            }
        },
        goPage(param) {
            if (BrowserUtil.isFormApp()) {
                param.url = window.location.origin + param.url;
                param.headerType = 'share';
                param.activity = 'activity';

                this.callAppFunction('go', param);
            } else {
                RouterUtil.go(param.url, this.$router);
            }
        },
        acceptTianTianQuan(prize, succussCallback) {
            if (prize.accepting) {
                return;
            }

            prize.accepting = true;

            JiFuApi.acceptPrize(prize.win_id || prize.id).then(res => {
                prize.accepting = false;

                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.$toast.success('领取成功，甜甜圈将于 12h 内到账');
                succussCallback && succussCallback();
            }, error => {
                prize.accepting = false;
                this.$toast.error(error.msg);
            });
        }
    }
};
</script>
