<template>
   <vote-page class="vote_page" :user="music" :class="{'app_page': BrowserUtil.isFormApp()}" ref="pageWindow">
        <div class="content">
            <div class="top">
                <header-img class="header" :size="120" :header-img="music.head_info && music.head_info.link" :headerId="music.uid"></header-img>

                <p class="nikname blue_text">
                    <router-link :to="`/singer/${music.uid}`" v-text="music.nickname"></router-link>
                </p>
                <p>我正在参加源音塘</p>
                <h1 class="title blue_text">《半世界之旅》主题曲翻唱&CV大赛</h1>
                <p>快来帮我投个票吧</p>
            </div>

            <div class="music_info">
                <div class="music_item" :style="{backgroundImage: `url(${$fixImg(music.imgpic_info.link, 'w=260&h=200')})`}" @click="goMusicDetail">
                    <img class="play_btn" @click.stop="play(music)" :src="playingId === music.id ? icons.pause : icons.play">
                    <p class="number">NO.{{music.id}}</p>
                </div>

                <p class="music_name">
                    <router-link :to="`/music/${music.id}`" v-text="music.title"></router-link>
                </p>

                <button class="vote_btn" @click="vote">+1 票</button>

                <p class="count">当前:{{music.count}}票</p>

                <p class="tip">每天都可以投{{prizeBtn.isFromAPP ? $parent.activity.app_cast_ticket : $parent.activity.web_cast_ticket }}票哟~</p>
            </div>
        </div>

        <!--   /  抽奖弹框  -->
        <alert-panel :title="panel.title" v-model="panel.isOpen" :btn-text="panel.btnText" :content="panel.content" :show-close-btn="true" @sureClick="panel.btnClicked">
        </alert-panel>
    </vote-page>
</template>
<script type="text/javascript">
import { mapState } from 'vuex';
import icons from './../../icon.js';
import Api from './../../api.js';
import { BrowserUtil, RouterUtil } from '@/utils';
import AlertPanel from './../../components/alert-panel';
import VotePage from '@/components/vote';

import { HeaderImg, LoginAlert } from '@/components';
import { XInput, Group } from 'vux';

export default {
    components: {
        VotePage,
        Group,
        XInput,
        AlertPanel,
        HeaderImg,
        LoginAlert
    },
    data() {
        return {
            timer: null,
            icons,
            BrowserUtil,
            mobile: '',
            loginPanel: {
                isOpen: false,
                title: '立即投票',
                btnText: '投票'
            },
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
                nickname: '',
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
        },
        shareInfos() {
            return {
                title: `${this.music.nickname}正在参加“《半世界之旅》主题曲翻唱&CV大赛”,来源音塘帮我投票抽大奖吧！`,
                sinaDescription: `${this.music.nickname}正在参加“《半世界之旅》主题曲翻唱&CV大赛”,快来帮我投票抽大奖吧>>（${window.location.href}）#源音塘音乐##半世界之旅#`,
                type: 6,
                alias: Api.alias, // 活动别名
                inputText: '', // 分享时，填充的话语。如：分享至微博，用户可输入的输入框中默认文字
                link: window.location.href, // 分享链接
                imgUrl: '', // 分享图标
                desc: '#源音塘音乐##半世界之旅#，快来帮我投票抽大奖吧！戳>> @源音塘音乐' // 分享描述
            };
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

            Api.getMusicDetail(params).then(res => {
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
            return this.closePanel;
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
                this.$store.dispatch('showAlert', {
                    type: 'login'
                });
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

            Api.vote(params).then(res => {
                this.voting = false;

                let status = Number(res.data.status);

                if (res.code === 0 && status === -5) {
                    this.$store.commit('bindMobile');
                    return;
                }

                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                // 活动未开始
                if (status === -1) {
                    this.$toast.error(res.msg);

                    return;
                }

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
            this.$store.dispatch('showAlert', {
                type: 'login'
            });
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
