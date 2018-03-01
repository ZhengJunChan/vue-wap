<template>
  <div class="new_day_activity">
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
import NewDayApi from './new-day-api.js';
import { BrowserUtil, RouterUtil } from '@/utils';

export default {
    data() {
        return {
            shareInfos: {
                type: 5, // 5:抽奖活动,6:投票活动
                alias: NewDayApi.alias,
                title: '新年听歌抽福袋', // 分享标题
                link: window.location.origin + '/2018_new_day', // 分享链接
                imgUrl: window.location.origin + '/static/imgs/activity/2018/new_day.png', // 分享图标
                desc: '纳尼？这个APP听歌就能抽奖，SSR是IphoneX！快来看看新一年的运气如何~'
            },
            activity: {
                ruleIntro: ''
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
            NewDayApi.getActivityInfo().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.activity.ruleIntro = res.data.role;
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        goInputAddrPage(prize) {
            let param = {
                url: `/2018_new_day/addr?prizeId=${prize.win_id || prize.id}&addr=${prize.type === 1 ? 'material' : prize.type === 2 ? 'virtual' : ''}&url=${this.$route.path}`,
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

            NewDayApi.acceptPrize(prize.win_id || prize.id).then(res => {
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
