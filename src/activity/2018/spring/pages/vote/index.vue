<template>
  <div class="vote_page" :class="{'app_page': BrowserUtil.isFormApp()}" ref="pageWindow">
    <div class="content">
        <header-img class="header" :size="120" :header-img="music.head_info && music.head_info.link" :headerId="music.uid"></header-img>

        <p class="nikname">
            <router-link :to="`/singer/${music.uid}`" v-text="music.nickname"></router-link>
        </p>
        <p>我正在参加源音塘</p>
        <h1 class="title">“春日狂想”原唱翻唱大赛</h1>
        <p>快来帮我投个票吧</p>

        <div class="music_info">
            <img src="./../../imgs/bg_jianjie_top.png">
            <div>
                <div class="music_item" :style="{backgroundImage: `url(${$fixImg(music.imgpic_info.link, 'w=260&h=200')})`}" @click="goMusicDetail">
                    <img class="play_btn" @click.stop="play(music)" :src="playingId === music.id ? icons.pause : icons.play">
                    <p class="number">NO.{{music.id}}</p>
                </div>

                <p class="music_name">
                    <router-link :to="`/music/${music.id}`" v-text="music.title"></router-link>
                </p>

                <button class="vote_btn" @click="vote">+1 票</button>

                <p class="count">当前:{{music.count}}票</p>

                <p class="tip">每天都可以投5票哟~</p>
            </div>
            <img src="./../../imgs/bg_jianjie_bottom.png">
        </div>
    </div>

    <!--   /  抽奖弹框  -->
    <alert-panel :title="panel.title" v-model="panel.isOpen" :btn-text="panel.btnText" :content="panel.content" :show-close-btn="true" @sureClick="panel.btnClicked">
        <group class="mobile_box" v-if="panel.type === 'login'">
            <x-input mask="999 9999 9999" v-model="mobile" :max="13" is-type="china-mobile" placeholder="手机号码" required placeholder-align="center" text-align="center" :show-clear="false"></x-input>
        </group>
        <div class="code_box" v-else-if="panel.type === 'sendCode'">
            <p class="tip">我们已对{{mobile}}发送了验证码请注意查收并输入</p>
            <div class="code">
                <input type="tel fl" v-model="code.val">
                <button class="timer fr" :class="!code.sending && 'resend'" v-text="code.tip" @click="resendCode"></button>
            </div>
        </div>
    </alert-panel>
  </div>
</template>
<script type="text/javascript">
import { mapState } from 'vuex';
import icons from './../../icon.js';
import SpringApi from './../../spring-api.js';
import { BrowserUtil, RouterUtil } from '@/utils';
import AlertPanel from './../../components/alert-panel';

import { HeaderImg } from '@/components';
import { XInput, Group } from 'vux';

export default {
    components: {
        Group,
        XInput,
        AlertPanel,
        HeaderImg
    },
    data() {
        return {
            timer: null,
            icons,
            BrowserUtil,
            mobile: '',
            panel: {
                type: 'login',
                title: '',
                isOpen: false,
                btnText: '',
                content: '',
                btnClicked: this.initPanelCallback
            },
            prizeBtn: {
                isFromAPP: BrowserUtil.isFormApp(),
                count: 0
            },
            music: {
                id: this.$route.query.id,
                count: 0,
                head_info: {
                    link: ''
                },
                imgpic_info: {
                    link: ''
                },
                title: '',
                video_info: {},
                uid: ''
            },
            code: {
                val: '',
                error: '',
                sending: false,
                tip: '获取验证码'
            },
            shareInfos: {
                title: '【春日狂想】帮我投票iPad等你抽！',
                sinaDescription: '我正在参加@源音塘音乐#春日狂想原创翻唱大赛#，帮我投票iPad豪礼等你抽！猛戳>>',
                type: 6,
                alias: SpringApi.alias, // 活动别名
                inputText: '', // 分享时，填充的话语。如：分享至微博，用户可输入的输入框中默认文字
                link: window.location.href, // 分享链接
                imgUrl: '', // 分享图标
                desc: '我正在参加【春日狂想·原创翻唱大赛】，强烈求支持！惊喜福利也在等你领取！' // 分享描述
            }
        };
    },
    computed: {
        ...mapState({
            isLogined: state => state.user.isLogined,
            playingId: state => !state.player.playing.song.pause && state.player.playing.song.id
        }),
        isFromIosApp: () => BrowserUtil.isFromIosApp(),
        fixMobile() {
            return this.mobile.split(' ').join('');
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            if (!this.music.id) {
                RouterUtil.go('/', this.$router);
                return;
            }

            this.getMusicDetail();
        },
        /**
         * [requirePrizeCount 查询用户剩余抽奖次数]
         * @Author   郑君婵
         * @DateTime 2018-01-04
         */
        getMusicDetail() {
            let params = {
                id: this.music.id
            };

            SpringApi.getMusicDetail(params).then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.music.count = res.data.activity_count;
                this.music.head_info = res.data.head_info;
                this.music.nickname = res.data.nickname;
                this.music.title = res.data.title;
                this.music.imgpic_info = res.data.imgpic_info;
                this.music.video_info = res.data.video_info;
                this.music.uid = res.data.uid;

                this.shareInfos.imgUrl = res.data.imgpic_info.link;

                this.$share(this.shareInfos);
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        /**
         * [requirePrizeCount 查询用户剩余抽奖次数]
         * @Author   郑君婵
         * @DateTime 2018-01-04
         */
        initPanelCallback() {
            if (this.isLogined) {
                return this.closePanel;
            } else {
                this.login;
            }
        },
        play(music) {
            let params = {
                music
            };

            this.$store.dispatch('playSong', params);
        },
        vote() {
            if (this.$parent.isEnd) {
                this.$toast.error('活动投票已结束');
                return;
            }

            if (!this.isLogined) {
                this.login();
                return;
            }

            if (this.voting) {
                this.$toast.error('您的操作次数过快');
                return;
            }

            this.voting = true;

            let params = {
                log_at: 4,
                item_id: this.music.id
            };

            SpringApi.vote(params).then(res => {
                this.voting = false;

                if (res.code === 0) {
                    this.mobileLogin();
                    return;
                }

                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                let status = Number(res.data.status);

                // 投票成功
                if (status === 1) {
                    this.music.count++;
                    this.panel.isOpen = true;
                    this.panel.title = '投票成功';
                    this.panel.content = `投票成功，您当前还剩余${res.data.data.web_counts}票`;
                    this.panel.btnText = '好的';
                    this.panel.btnClicked = this.closePanel;

                    return;
                }

                // 当前投票端口没有票数
                if (status === 0) {
                    let appCount = res.data.data.app_can_get + res.data.data.app_counts;
                    this.panel.isOpen = true;

                    if (appCount > 0) {
                        this.panel.content = `下载APP每天还可以多投${appCount}票哦`;
                    } else {
                        this.panel.content = `今天的票投完了，明天再来吧`;
                    }

                    this.panel.btnText = '好的';
                    this.panel.title = '下载APP抽奖';
                    this.panel.btnClicked = () => {
                        RouterUtil.download(this.$router, this.$route, `${window.location.origin}/activity/spring2018`);
                    };

                    return;
                }

                this.toastError(res.msg);

                // if (Number(res.data.status) !== 1) {
                //     this.toastError(res.msg);
                //     return;
                // }

                // this.music.count++;
                // this.panel.isOpen = true;
                // let appCount = res.data.data.app_can_get + res.data.data.app_counts;

                // if (res.data.data.web_counts > 0) {
                //     this.panel.btnText = '好的';
                //     this.panel.title = '投票成功';
                //     this.panel.content = `投票成功，您当前还剩余${res.data.data.web_counts}票`;
                //     this.panel.btnClicked = this.closePanel;
                //     return;
                // } else if (appCount > 0) {
                //     this.panel.content = `下载APP每天还可以多投${appCount}票哦`;
                // } else {
                //     this.panel.content = `今天的票投完了，明天再来吧`;
                // }

                // this.panel.btnText = '好的';
                // this.panel.title = '下载APP抽奖';
                // this.panel.btnClicked = () => {
                //     RouterUtil.download(this.$router, this.$route, `${window.location.origin}/activity/spring2018`);
                // };
            }, error => {
                this.voting = false;
                this.$toast.error(error.msg);
            });
        },
        // 关闭alert弹框
        toastError(errMsg) {
            this.panel.btnText = '好的';
            this.panel.content = errMsg;
            this.panel.title = '';
            this.panel.btnClicked = this.closePanel;
        },
        // 关闭alert弹框
        closePanel() {
            this.panel.isOpen = false;
        },
        // 登录
        login() {
            if (BrowserUtil.isFormWeiXin()) {
                this.$store.dispatch('wxLogin');
            } else {
                this.mobileLogin();
            }
        },
        // 登录
        mobileLogin() {
            this.panel.btnText = '去投票';
            this.panel.title = '立即投票';
            this.panel.isOpen = true;
            this.panel.content = '';
            this.panel.btnClicked = this.sendCode;
        },
        // 发送验证码
        sendCode() {
            if (!this.fixMobile) {
                return;
            }

            this.setTimer();
            this.panel.btnText = '投票';
            this.panel.type = 'sendCode';
            this.panel.btnClicked = this.fastLogin;

            this.checkSendCode().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        // 发送验证码
        checkSendCode() {
            let params = null;
            let sendPrimse = null;

            if (BrowserUtil.isFormWeiXin()) {
                params = {
                    key: this.fixMobile,
                    type: 'addbind'
                };

                sendPrimse = SpringApi.sendCodeForBind(params);
            } else {
                params = {
                    name: this.fixMobile,
                    type: 'fast_log'
                };

                sendPrimse = SpringApi.sendCode(params);
            }

            return sendPrimse;
        },
        // 发送验证码
        resendCode() {
            if (!this.fixMobile || this.code.sending) {
                return;
            }

            this.setTimer();

            this.sendCode().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        setTimer() {
            let time = 59;

            this.code.sending = true;
            this.code.tip = time + 's';

            this.timer = setInterval(() => {
                time--;
                this.code.tip = time + 's';

                if (time === 0) {
                    this.clearTimer();
                    this.code.tip = '重新发送';
                    this.code.sending = false;
                }
            }, 1000);
        },
        clearTimer() {
            clearInterval(this.timer);
        },
        fastLogin() {
            if (!this.code.val) {
                return;
            }

            this.checkLogin().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                !BrowserUtil.isFormWeiXin() && this.$store.dispatch('setUserInfo', res.data);
                this.clearTimer();
                this.vote();
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        checkLogin() {
            let params = null;
            let loginPrimse = null;

            if (BrowserUtil.isFormWeiXin()) {
                params = {
                    key: this.fixMobile,
                    code: this.code.val
                };

                loginPrimse = SpringApi.bindMobile(params);
            } else {
                params = {
                    mobile: this.fixMobile,
                    reg_at: 'wap',
                    thirdcode: this.code.val
                };

                loginPrimse = SpringApi.fastLogin(params);
            }

            return loginPrimse;
        },
        goMusicDetail() {
            RouterUtil.go(`/music/${this.music.id}`, this.$router);
        }
    }
};
</script>

<style type="text/css" lang="less" scoped>
  @import './main.less';
</style>
<style type="text/css" lang="less">
  .spring_activity{
    .vux-no-group-title{
        background-color: #f0f0f0;
        border-radius: 10/100rem;
        color: #1a1717;
    }
    .weui-cell{
        padding: 10/100rem 0;
    }
  }
</style>
