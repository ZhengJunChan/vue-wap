<template>
  <div class="spring_activity">
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
import Api from './api.js';
import { BrowserUtil, RouterUtil } from '@/utils';

export default {
    data() {
        return {
            shareInfos: {
                title: '源音塘·半世界之旅翻唱、CV大赛火热进行中，快来参与抽大奖！',
                sinaDescription: `#源音塘音乐#快来参加#半世界之旅#翻唱、CV大赛，用声音开启奇迹！>>${window.location.href}`,
                type: 6,
                alias: Api.alias, // 活动别名
                inputText: '', // 分享时，填充的话语。如：分享至微博，用户可输入的输入框中默认文字
                link: window.location.origin + '/activity/' + Api.alias, // 分享链接
                imgUrl: window.location.origin + '/static/imgs/activity/2018/halfworld.jpg', // 分享图标
                desc: '【投票分享，福利满满！源音塘携手超精美乙女向手游《半世界之旅》，等你用声音开启奇迹】' // 分享描述
            },
            activity: {
                isEnd: false,
                id: 0,
                rule: {
                    explain: '', // 活动详情
                    mode: '', // 参赛方式
                    selection: '' // 活动规则
                },
                app_cast_ticket: 1,
                web_cast_ticket: 1,
                date: {
                    activeTime: {
                        start: '',
                        end: ''
                    },
                    collectTime: {
                        start: '',
                        end: ''
                    },
                    voteTime: {
                        start: '',
                        end: ''
                    },
                    prizeTime: ''
                },
                baseUrl: '/activity/' + Api.alias,
                lottery_info: {
                    lottery_remark: ''
                }
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
            Api.getActivityInfo().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }
                this.isEnd = Date.parse(new Date()) > Date.parse(new Date(res.data.publish_end_date));

                this.activity.id = res.data.id;
                this.activity.app_cast_ticket = res.data.app_cast_ticket;
                this.activity.web_cast_ticket = res.data.web_cast_ticket;
                this.activity.lottery_info = res.data.lottery_info;
                this.initDate(res.data);
                this.initRule(res.data.rule_list);
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        initDate(date) {
            this.activity.date = {
                // 征稿时间
                activeTime: {
                    start: this.getDate(date.score_start_date),
                    end: this.getDate(date.score_end_date)
                },
                // 活动投稿时间
                collectTime: {
                    start: this.getDate(date.c_start_date),
                    end: this.getDate(date.c_end_date)
                },
                // 用户投票时间
                voteTime: {
                    start: this.getDate(date.vote_start_date),
                    end: this.getDate(date.vote_end_date)
                },
                // 结果公布时间
                prizeTime: this.getDate(date.publish_start_date)
            };
        },
        getDate(date, noYear) {
            if (!date) {
                return '';
            }

            let time = date.split(' ')[0];
            time = time.substring(5, time.length);

            let dateArr = time.split('-');

            return dateArr[0] + '月' + dateArr[1] + '日';
        },
        initRule(list) {
            for (let item of list) {
                this.$set(this.activity.rule, item.alias, item);
            }
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
        }
    }
};
</script>
