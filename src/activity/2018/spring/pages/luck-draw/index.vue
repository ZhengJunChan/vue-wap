<template>
  <div class="prize_page" ref="pageWindow">
    <div class="content" :class="isRoll ? 'roll' : 'cover'">
        <img class="title_img" src="./../../imgs/img_title_choujiang.png">
        <div class="choujiang_desc">
            <img src="./../../imgs/img_spring_choujiang2.png">
        </div>

        <div class="center">
            <div class="pannel">
                
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
                            <td class="item run_btn"  @click="getPrize">
                                    <img class="pre" src="./../../imgs/img_chou_pre.png">
                                    <img class="chou" src="./../../imgs/img_chou.png">
                                    <p class="count_tip">（{{prizeBtn.count}}次机会）</p>
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

            <div class="btn_label">
                <btn class="btn" text="查看我的中奖纪录" width="3rem" item-color="#ff99cc" @on-click="goPrizePage"></btn>
                <btn class="btn" text="抽奖活动规则" width="2.4rem" @on-click="goPrizeRulePage"></btn>
            </div>

            <div class="notice_box" id="slide">
                <div id="slide1">
                    <p v-for="user in prizeUsers">恭喜  {{user.nickname}}  通过抽奖获得了  {{user.title}}  </p>
                </div>
                <div id="slide2"></div>
            </div>


        </div>

        <div class="bottom">
            <p class="ios_intro" v-show="isFromIosApp">本次活动与苹果公司无关</p>
        </div>
    </div>

    <!--   /  抽奖弹框  -->
    <alert-panel :title="panel.title"  v-model="panel.isOpen" :btn-text="panel.btnText" :content="panel.content" @sureClick="panel.btnClicked"></alert-panel>
  </div>
</template>
<script type="text/javascript">
import Btn from './../../components/btn';
import { mapState } from 'vuex';
import SpringApi from './../../spring-api.js';
import { BrowserUtil, CommonUtil } from '@/utils';

import { Flexbox, FlexboxItem } from 'vux';
import AlertPanel from './../../components/alert-panel';

export default {
    components: {
        Btn,
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
                btnClicked() {}
            },
            prizeList: [],
            // 被抽中的奖品
            luckPrize: {
                accepting: false,
                playcounts: 0,
                sharenum: 0
            },
            prizeUsers: []
        };
    },
    computed: {
        ...mapState({
            isLogined: state => state.user.isLogined
        }),
        isFromIosApp: () => BrowserUtil.isFromIosApp()
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            // 获取屏幕奖品列表
            this.getScreenPrize();
            // 获取抽奖次数
            this.searchPrizeCount();
            // 获取所有中奖用户
            this.getPrizeUsers();
        },
        /**
         * [getScreenPrize 获取屏幕奖品列表]
         * @Author   郑君婵
         * @DateTime 2018-01-05
         */
        getScreenPrize() {
            SpringApi.getScreenPrize().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.prizeList = res.data;
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        getPrizeUsers() {
            SpringApi.getPrizeUsers().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.prizeUsers = res.data;
                this.scrolleList();
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        scrolleList() {
            var speed = 40;
            var slide = document.getElementById('slide');
            var slide2 = document.getElementById('slide2');
            var slide1 = document.getElementById('slide1');
            slide2.innerHTML = slide1.innerHTML;

            function Marquee() {
                if (slide2.offsetTop - slide.scrollTop <= 0) {
                    slide.scrollTop -= slide1.offsetHeight;
                } else {
                    slide.scrollTop++;
                }
            }

            var MyMar = setInterval(Marquee, speed);
            slide.onmouseover = () => {
                clearInterval(MyMar);
            };
            slide.onmouseout = () => {
                MyMar = setInterval(Marquee, speed);
            };
        },
        /**
         * [requirePrizeCount 查询用户剩余抽奖次数]
         * @Author   郑君婵
         * @DateTime 2018-01-04
         */
        searchPrizeCount() {
            SpringApi.searchPrizeCount().then(res => {
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
        // 抽奖
        getPrize() {
            if (this.luckDraw.running) {
                return;
            }

            this.luckDraw.running = true;

            let params = {
                chance_id: ''
            };

            SpringApi.getScreenWinningPrize(params).then(res => {
                this.luckPrize = res.data;
                this.run();
                this.searchPrizeCount();
            }, error => {
                this.luckDraw.running = false;

                if (error.code === 400) {
                    this.shareEmptyTip(error.data.share_can_get);
                    return;
                }

                this.$toast.error(error.msg);
            });
        },
        // 不可抽奖提示弹框
        shareEmptyTip(count) {
            this.panel.isOpen = true;
            this.panel.title = '已经没有抽奖机会了';
            this.panel.content = count ? `看你这么可爱，只要在APP分享活动或歌曲就可再获得${count}次抽奖机会哟~` : `明天再来哟~灰灰~`;
            this.panel.btnText = '好的';
            this.panel.btnClicked = this.closeAlert;
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

            this.luckDraw.prize = -1;
            this.luckDraw.times = 0;
            this.luckDraw.running = false;
            this.prizeBtn.count && this.prizeBtn.count--;

            setTimeout(() => {
                this.setAlert();
            }, 1000);
        },
        // 设置弹框
        setAlert() {
            let type = Number(this.luckPrize.type);
            this.panel.isOpen = true;
            if (type < 4) {
                this.panel.title = '恭喜中奖';
                this.panel.btnText = '立即领取';
            }

            // 抽到虚拟奖品或实际奖品
            if (type === 1 || type === 2) {
                this.panel.btnClicked = this.goInputAddrPage;

                this.panel.content = `您抽到了${this.luckPrize.title}<br>赶紧填写资料领取`;
            }

            // 抽到甜甜圈
            if (type === 3) {
                this.panel.content = `哇欧皇诞生！<br>恭喜中得甜甜圈${this.luckPrize.t_number}个`;
                this.panel.btnClicked = () => {
                    this.acceptTianTianQuan(this.luckPrize);
                };
            }

            // 未中奖
            if (type === 4) {
                this.panel.title = '什么都没有';
                this.panel.content = this.luckPrize.remark || '别灰心，换个姿势手气更好';
                this.panel.btnText = '好的';
                this.panel.btnClicked = this.closeAlert;
            }
        },
        closeAlert() {
            this.panel.isOpen = false;
        },
        goInputAddrPage() {
            this.$parent.goInputAddrPage(this.luckPrize);
        },
        goPrizeRulePage() {
            if (this.luckDraw.running) {
                return;
            }

            let param = {
                url: `${this.$parent.activity.baseUrl}/rule/prize`,
                title: '抽奖规则'
            };

            this.$parent.goPage(param);
        },
        goPrizePage() {
            if (this.luckDraw.running) {
                return;
            }

            let param = {
                url: `${this.$parent.activity.baseUrl}/prize`,
                title: '中奖记录'
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
