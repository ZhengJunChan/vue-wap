<template>
  <div class="prize_page" ref="pageWindow">
    <div class="content" :class="isRoll ? 'roll' : 'cover'">
        <div class="top">
            <img src="./../../imgs/img_title@3x.png">
        </div>

        <div class="center">
            <div class="rule_tip" @click="goRulePage"></div>
            <div class="prize_box" @click="getPrizeBox"></div>

            <table class="luck_draw">
                <tbody>
                    <tr>
                        <td class="item" :class="{'active': luckDraw.index === 0}">
                            <div>
                                <div class="img_box">
                                    <img :src="`${prizeList[0] && prizeList[0].imgpic_link}/105/80`">
                                </div>
                                <p class="text_nowrap_ellipsis" v-text="prizeList[0] && prizeList[0].title"></p>
                            </div>
                        </td>
                        <td class="item" :class="{'active': luckDraw.index === 1}">
                            <div>
                                <div class="img_box">
                                    <img :src="`${prizeList[1] && prizeList[1].imgpic_link}/105/80`">
                                </div>
                                <p class="text_nowrap_ellipsis" v-text="prizeList[1] && prizeList[1].title"></p>
                            </div>
                        </td>
                        <td class="item" :class="{'active': luckDraw.index === 2}">
                            <div>
                                <div class="img_box">
                                    <img :src="`${prizeList[2] && prizeList[2].imgpic_link}/105/80`">
                                </div>
                                <p class="text_nowrap_ellipsis" v-text="prizeList[2] && prizeList[2].title"></p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="item" :class="{'active': luckDraw.index === 7}">
                            <div>
                                <div class="img_box">
                                    <img :src="`${prizeList[7] && prizeList[7].imgpic_link}/105/80`">
                                </div>
                                <p class="text_nowrap_ellipsis" v-text="prizeList[7] && prizeList[7].title"></p>
                            </div>
                        </td>
                        <td class="item run_btn"
                        :class="isValidPressBtn ? 'vaild' : 'disabled'"  @click="pressPrizeBtn">
                            <div class="see_you_tomorrow">
                                <p class="prize_btn">明天再来</p>
                                <span class="count_tip">{{prizeBtn.count}}次机会</span>
                            </div>

                            <span class="valid_box" v-if="!prizeBtn.isFromAPP">请打开APP<br>进行操作</span>

                            <span class="valid_box" v-else-if="!isLogined">赶紧登录</span>

                            <div class="valid_box" v-else-if="prizeBtn.count">
                                <p class="prize_btn">立即抽奖</p>
                                <span class="count_tip">{{prizeBtn.count}}次机会</span>
                            </div>
                        </td>
                        <td class="item" :class="{'active': luckDraw.index === 3}">
                            <div>
                                <div class="img_box">
                                    <img :src="`${prizeList[3] && prizeList[3].imgpic_link}/105/80`">
                                </div>
                                <p class="text_nowrap_ellipsis" v-text="prizeList[3] && prizeList[3].title"></p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="item" :class="{'active': luckDraw.index === 6}">
                            <div>
                                <div class="img_box">
                                    <img :src="`${prizeList[6] && prizeList[6].imgpic_link}/105/80`">
                                </div>
                                <p class="text_nowrap_ellipsis" v-text="prizeList[6] && prizeList[6].title"></p>
                            </div>
                        </td>
                        <td class="item" :class="{'active': luckDraw.index === 5}">
                            <div>
                                <div class="img_box">
                                    <img :src="`${prizeList[5] && prizeList[5].imgpic_link}/105/80`">
                                </div>
                                <p class="text_nowrap_ellipsis" v-text="prizeList[5] && prizeList[5].title"></p>
                            </div>
                        </td>
                        <td class="item" :class="{'active': luckDraw.index === 4}">
                            <div>
                                <div class="img_box">
                                    <img :src="`${prizeList[4] && prizeList[4].imgpic_link}/105/80`">
                                </div>
                                <p class="text_nowrap_ellipsis" v-text="prizeList[4] && prizeList[4].title"></p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div class="bottom">
            <p class="ios_intro" v-show="isFromIosApp">本次活动与苹果公司无关</p>
            <img src="./../../imgs/img_awardprovision@3x.png">
        </div>
    </div>

    <!--   /  抽奖弹框  -->
    <alert-panel :title="alertPanelContent.title"  v-model="panel.isOpen" :sure-btn="alertPanelContent.btn" :content="panel.content" @sureClick="panel.btnClicked" :show-close-btn="true">
    </alert-panel>
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';
import { prizeConfig, defualtConfig, disabledConfig } from './alert-config.js';
import NewDayApi from './../../new-day-api.js';
import { BrowserUtil, RouterUtil, CommonUtil } from '@/utils';

import { AlertPanel } from '@/components';
import { Flexbox, FlexboxItem } from 'vux';

export default {
    components: {
        AlertPanel,
        Flexbox,
        FlexboxItem
    },
    data() {
        return {
            // 页面是否滚动显示，true为滚动显示，false为全屏显示
            isRoll: false,
            prizeBtn: {
                isFromAPP: BrowserUtil.isFormApp(),
                count: 0
            },
            luckDraw: {
                running: false, // 正在转动转盘
                index: -1, // 当前转动到哪个位置，起点位置
                count: 8, // 总共有多少个位置
                timer: 0, // setTimeout的ID，用clearTimeout清除
                speed: 20, // 初始转动速度
                times: 0, // 转动次数
                cycle: 50, // 转动基本次数：即至少需要转动多少次再进入抽奖环节
                prize: -1,    // 中奖位置
                roll: this.rollLuckDraw,
                stop: this.stopLuckDraw
            },
            panel: {
                isOpen: false,
                headerImg: '',
                headerColor: '',
                title: '',
                content: '',
                btnText: '',
                btnUrl: '',
                closeColr: '',
                btnClicked() {}
            },
            prizeList: [],
            // 被抽中的奖品
            luckPrize: {
                accepting: false,
                playcounts: 0,
                sharenum: 0
            }
        };
    },
    computed: {
        ...mapState({
            isLogined: state => state.user.isLogined
        }),
        alertPanelContent() {
            return {
                title: {
                    text: this.panel.title,
                    style: {
                        color: this.panel.headerColor,
                        backgroundImage: this.panel.headerImg,
                        backgroundSize: '100% 100%',
                        closeColr: this.panel.closeColr
                    }
                },
                btn: {
                    text: this.panel.btnText,
                    url: '',
                    style: {
                        width: '2.6rem',
                        height: '0.6rem',
                        margin: '0 auto',
                        lineHeight: '0.55rem',
                        backgroundImage: this.panel.btnImg,
                        backgroundSize: '100% 100%'
                    }
                }
            };
        },
        isValidPressBtn() {
            if (this.isLogined && !this.prizeBtn.count) {
                return false;
            }

            return true;
        },
        isFromIosApp: () => BrowserUtil.isFromIosApp()
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            // 初始化页面样式
            this.initClass();
            // 绑定手机旋转事件：手机旋转初始化页面样式
            window.onorientationchange = this.initClass;

            // 获取屏幕奖品列表
            this.getScreenPrize();
        },
        /**
         * [initClass 初始化页面样式：如果超过长度页面有滚动，没有则九宫格居中]
         * @Author   郑君婵
         * @DateTime 2018-01-04
         */
        initClass() {
            this.isRoll = this.$refs.pageWindow.clientWidth > this.$refs.pageWindow.clientHeight && this.$refs.pageWindow.clientHeight < 1005;
        },
        /**
         * [getScreenPrize 获取屏幕奖品列表]
         * @Author   郑君婵
         * @DateTime 2018-01-05
         */
        getScreenPrize() {
            NewDayApi.getScreenPrize().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.initPrizeBtn();
                this.prizeList = res.data;
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        /**
         * [initPrizeBtn 初始化老虎机按钮]
         * @Author   郑君婵
         * @DateTime 2017-11-17
         */
        initPrizeBtn() {
            if (!this.prizeBtn.isFromAPP || !this.isLogined) {
                return;
            }

            this.searchPrizeCount();
        },
        /**
         * [requirePrizeCount 查询用户剩余抽奖次数]
         * @Author   郑君婵
         * @DateTime 2018-01-04
         */
        searchPrizeCount() {
            NewDayApi.searchPrizeCount().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }
                this.prizeBtn.count = res.data.counts || 0;
                this.luckPrize.sharenum = res.data.sharenum || 0;
                this.luckPrize.playcounts = res.data.playcounts || 0;
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        /**
         * [pressPrizeBtn 点击老虎机按钮]
         * @Author   郑君婵
         * @DateTime 2017-11-17
         */
        pressPrizeBtn() {
            if (!this.isValidPressBtn) {
                this.showDisabledAlert();
                return;
            }

            if (!this.prizeBtn.isFromAPP) {
                RouterUtil.download(this.$router, this.$route);
                return;
            }

            if (!this.isLogined) {
                this.login();
                return;
            }

            this.prizeBtn.count && this.getPrize();
        },
        // 不可抽奖提示弹框
        showDisabledAlert() {
            this.panel.isOpen = true;
            this.panel.headerImg = disabledConfig.title.style.backgroundImage;
            this.panel.headerColor = disabledConfig.title.style.color;
            this.panel.title = disabledConfig.title.text;
            this.panel.btnText = '好的';
            this.panel.closeColr = '';
            this.panel.btnImg = disabledConfig.btn.style.backgroundImage;
            this.panel.btnClicked = () => {
                this.panel.isOpen = false;
            };

            this.setDisabledContent();
        },
        // 不可抽奖提示弹框
        setDisabledContent() {
            if (this.luckPrize.playcounts) {
                this.panel.content = `悄悄告诉你，再听${this.luckPrize.playcounts}首歌曲就可获得新的抽奖机会，每天最多5次噢~`;
                return;
            }

            // 分享提示
            if (!this.luckPrize.sharenum) {
                this.panel.content = `看你这么可爱，只要你分享本页面就可再获得1次抽奖机会哟~`;
                return;
            }

            this.panel.content = `明天再来哟~灰灰~`;
        },
        // 登录
        login() {
            let param = { funcName: 'gotoLogin' };

            this.callAppFunction('gotoLogin', param);
        },
        // 抽奖
        getPrize() {
            if (this.luckDraw.running) {
                return;
            }

            this.luckDraw.running = true;

            NewDayApi.getScreenWinningPrize().then(res => {
                this.luckPrize = res.data;
                this.run();
            }, error => {
                this.$toast.error(error.msg);
                this.luckDraw.running = false;
            });
        },
        // 停止转动转盘九宫格
        run() {
            this.luckDraw.speed = 100;
            this.luckDraw.roll();
        },
        // 转动转盘九宫格
        rollLuckDraw() {
            this.luckDraw.times++;
            this.luckDraw.index++;

            if (this.luckDraw.index > this.luckDraw.count - 1) {
                this.luckDraw.index = 0;
            }

            if (this.luckDraw.times > this.luckDraw.cycle + 10 && this.luckDraw.prize === this.luckDraw.index) {
                this.luckDraw.stop();
            } else {
                if (this.luckDraw.times < this.luckDraw.cycle) {
                    this.luckDraw.speed -= 10;
                } else if (this.luckDraw.times === this.luckDraw.cycle) {
                    this.setLuckDraw();
                } else {
                    if (this.luckDraw.times > this.luckDraw.cycle + 10 &&
                        ((this.luckDraw.prize === 0 && this.luckDraw.index === 7) || this.luckDraw.prize === this.luckDraw.index + 1)) {
                        this.luckDraw.speed += 110;
                    } else {
                        this.luckDraw.speed += 20;
                    }
                }

                if (this.luckDraw.speed < 40) {
                    this.luckDraw.speed = 40;
                }

                this.luckDraw.timer = setTimeout(this.rollLuckDraw, this.luckDraw.speed); // 循环调用
            }

            return false;
        },
        // 设置中奖索引
        setLuckDraw() {
            let prizeId = this.luckPrize.id;

            for (let index = 0; index < this.prizeList.length; index++) {
                if (this.prizeList[index].id === prizeId) {
                    this.luckDraw.prize = index;

                    return false;
                }
            }
        },
        // 停止转动转盘九宫格
        stopLuckDraw() {
            clearTimeout(this.luckDraw.timer);

            this.prizeBtn.count--;
            this.luckDraw.prize = -1;
            this.luckDraw.times = 0;
            this.luckDraw.running = false;

            setTimeout(() => {
                this.setAlert();
            }, 1000);
        },
        // 设置弹框
        setAlert() {
            this.panel.isOpen = true;

            if (this.luckPrize.type === 1 || this.luckPrize.type === 2) {
                this.panel.headerImg = prizeConfig.title.style.backgroundImage;
                this.panel.headerColor = prizeConfig.title.style.color;
                this.panel.title = prizeConfig.title.text + this.luckPrize.title;
                this.panel.content = this.luckPrize.remark;
                this.panel.closeColr = prizeConfig.title.style.closeColr;
                this.panel.btnText = '填写地址领取';
                this.panel.btnImg = prizeConfig.btn.style.backgroundImage;
                this.panel.btnClicked = this.goInputAddrPage;
            }

            // 抽到甜甜圈
            if (this.luckPrize.type === 3) {
                this.panel.headerImg = prizeConfig.title.style.backgroundImage;
                this.panel.headerColor = prizeConfig.title.style.color;
                this.panel.title = prizeConfig.title.text + this.luckPrize.title;
                this.panel.content = this.luckPrize.remark;
                this.panel.closeColr = prizeConfig.title.style.closeColr;
                this.panel.btnText = '立即领取';
                this.panel.btnImg = prizeConfig.btn.style.backgroundImage;
                this.panel.btnClicked = () => {
                    this.acceptTianTianQuan(this.luckPrize);
                };
            }

            // 未中奖
            if (this.luckPrize.type === 4) {
                this.panel.headerImg = defualtConfig.title.style.backgroundImage;
                this.panel.headerColor = defualtConfig.title.style.color;
                this.panel.title = defualtConfig.title.text;
                this.panel.closeColr = defualtConfig.title.style.closeColr;
                this.panel.btnText = '好的';
                this.panel.btnImg = prizeConfig.btn.style.backgroundImage;
                this.panel.btnClicked = () => {
                    this.panel.isOpen = false;
                };

                this.setNoPrizeContent();
            }
        },
        goInputAddrPage() {
            this.$parent.goInputAddrPage(this.luckPrize);
        },
        goRulePage() {
            if (this.luckDraw.running) {
                return;
            }

            let param = {
                url: '/2018_new_day/rule',
                title: '规则说明'
            };

            this.$parent.goPage(param);
        },
        getPrizeBox() {
            if (this.luckDraw.running) {
                return;
            }

            let param = {
                url: '/2018_new_day/prize',
                title: '奖品箱'
            };

            this.$parent.goPage(param);
        },
        acceptTianTianQuan(prize) {
            this.$parent.acceptTianTianQuan(prize, () => {
                this.panel.isOpen = false;
            });
        },
        setNoPrizeContent(prize) {
            let contents = this.luckPrize.remark.split('\r\n');

            if (contents.length > 1) {
                this.panel.content = contents[CommonUtil.getRandom(0, contents.length - 1)];
            } else {
                this.panel.content = this.luckPrize.remark;
            }
        }
    }
};
</script>

<style type="text/css" lang="less" scoped>
  @import './main.less';
</style>
