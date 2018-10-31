<template>
  <div class="sound_activity">
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';
import { UserApi } from '@/api';
import Api from './spring-api.js';
import { BrowserUtil, RouterUtil } from '@/utils';

export default {
    data() {
        return {
            shareInfos: {
                title: '源音塘2周年  为音乐发声',
                sinaDescription: '@源音塘音乐，我在参加#源音塘2周年  我为音乐发声#话题活动,快来参与活动抽大奖吧！',
                type: 6,
                alias: Api.alias, // 活动别名
                inputText: '@源音塘音乐，我在参加#源音塘2周年 我为音乐发声#话题活动,快来参与活动抽大奖吧！', // 分享时，填充的话语。如：分享至微博，用户可输入的输入框中默认文字
                link: `${window.location.origin}/activity/${Api.alias}`, // 分享链接
                imgUrl: `${window.location.origin}/static/imgs/activity/2018/${Api.alias}.jpg`, // 分享图标
                desc: '参与活动为音乐人点赞吧，琥珀虚颜二次元智能机器人、beats耳机、YSL口红、源音塘大礼包...等你来领，100%中奖~' // 分享描述
            },
            discussAlert: {},
            activity: {
                isEnd: false,
                isEndVote: false,
                rule_list: [],
                rule: {
                    explain: '', // 活动详情
                    mode: '', // 参赛方式
                    selection: '' // 活动规则
                },
                date: {
                    activeTime: '',
                    collectTime: '',
                    voteTime: '',
                    prizeTime: ''
                },
                baseUrl: `/activity/${Api.alias}`,
                lottery_info: {
                    lottery_remark: '',
                    reward_list: []
                }
            }
        };
    },
    computed: {
        ...mapState({
            user: state => state.user.infos,
            isLogined: state => state.user.isLogined
        })
    },
    created() {
        if (this.isLogined && !this.user.count) {
            UserApi.getUserInfos().then(res => {
                this.$store.dispatch('setUserInfo', res.data);
            });
        }
        // 获取活动信息
        this.getActivityInfo();
        this.$share(this.shareInfos);
    },
    methods: {
        getActivityInfo() {
            Api.getActivityInfo().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }
                // this.isEnd = Date.parse(new Date()) > Date.parse(new Date(res.data.publish_date));

                this.activity.rule_list = res.data.rule_list;
                this.activity.lottery_info = res.data.lottery_info;
                this.initDate(res.data);
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        initDate(date) {
            this.activity.date = {
                activeTime: this.getDateRange(date.active_start_date, date.active_end_date), // 活动开始时间
                collectTime: this.getDateRange(date.vote_start_date, date.vote_end_date, true), // 活动投稿时间
                voteTime: this.getDateRange(date.vote_start_date, date.vote_end_date, true), // 活动投票时间
                prizeTime: this.getDateRange(date.publish_date, date.publish_date, true) // 结果公布时间
            };

            this.activity.isEndVote = Date.parse(new Date()) > Date.parse(new Date(date.vote_end_date));
        },
        getDateRange(start, end, noYear) {
            end = this.getDate(end, noYear);
            start = this.getDate(start, noYear);

            if (start === end) {
                return start;
            }

            return start + '-' + end;
        },
        getDate(date, noYear) {
            if (!date) {
                return '';
            }

            let time = date.split(' ')[0];

            if (noYear) {
                time = time.substring(5, time.length);
            }

            return time.replace(/-/g, '.');
        },
        goInputAddrPage(prize) {
            let type = Number(prize.type);
            let param = {
                url: `${this.activity.baseUrl}/addr/${type === 1 ? 'material' : type === 2 ? 'virtual' : ''}?prizeId=${prize.win_id || prize.id}&url=${this.$route.path}`
            };

            if (type === 1) {
                // 实体物品
                param.title = '填写实体地址';
            } else if (type === 2) {
                // 虚拟物品
                param.title = '填写领取信息';
            }

            if (BrowserUtil.isFromIosApp()) {
                param.url = window.location.origin + param.url;
                param.headerType = 'share';
                param.activity = 'activity';

                this.callAppFunction('go', param);
            } else {
                RouterUtil.go(param.url, this.$router);
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

            Api.acceptPrize(prize.win_id || prize.id).then(res => {
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
        },
        gaobai() {

        }
    }
};
</script>
