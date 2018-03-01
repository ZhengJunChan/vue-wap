<template>
  <div class="prize_page">
  	<div class="content" v-if="activity.isOnline && activity.isInit">
     <div class="title"></div>

     <div class="prize_img">
       <div class="header">
         <div class="screen">
            <div id="screenScroller" :style="{top: `-${screen.top}rem`}">
                 <div class="item clear_float" v-for="(item, index) in screen.list">
                     <img class="fl" :src="`${item.imgpic_link}/260/140`">
                     <p class="fr" v-text="item.title"></p>
                 </div>
            </div>
         </div>
         <p class="counts_tip" v-text="countTip"></p>

         <button class="press_btn" @click.stop="pressPrizeBtn" v-text="prizeBtn.text" :disabled="isDisabledScreenBtn"></button>

         <div class="rocker" :class="rocking && 'rocking'" @click.stop="getPrize">
          <div>
           <img class="ball" src="./../../imgs/img_boll.png">
           <img class="pole" src="./../../imgs/img_pole.png">
          </div>
         </div>
       </div>

       <div class="body">
         <p class="for_addr" v-text="itemId.join(',')" v-if="activity.winningRecords.length"></p>
         <div class="logo" v-if="!activity.winningRecords.length">
           <img src="./../../imgs/logo_slogan.png">
         </div>
         <ul class="got_prize_list" v-else>
             <li v-for="(item, index) in activity.winningRecords">
                <span v-text="`${index+1}、`"></span>
                <span v-html="item.title"></span>
                <span class="to_get fr" v-text="item.accepting ? '领取中' : '领取'" @click="acceptPrize(item)" v-if="!item.is_addr"></span>
                <span class="got fr" v-text="'已领取'" v-else></span>
             </li>
         </ul>
       </div>

       <div class="footer"></div>
     </div>

     <p class="ios_intro" v-show="$route.query.app === 'ios'">本次活动与苹果公司无关</p>

     <div class="rule">
       <div class="rule_title">
       </div>
       <div class="rule_intro" v-html="activity.ruleIntro">
       </div>
     </div>
    </div>

    <!--   /  活动兑奖弹框  -->
    <alert-panel :title="panel.title"  v-model="panel.isOpen" :sure-btn="panel.btn" :content="panel.content" @sureClick="sureClicked" :show-close-btn="panel.type ? false : true">
      <!-- 输入兑换码 -->
      <div class="input_exchange_num" v-if="panel.type === 0">
        <input class="coupon" type="text" v-model="exchangeNum" placeholder="请输入您的兑换码">

        <div class="lead clear_float">
          <img class="fl" src="./../../imgs/img_quan.png">
          <p class="fr">兑换码为您门票上的8位字母或数字</p>
        </div>
      </div>
      <!-- /  输入兑换码 -->

      <!-- 输入兑换抽奖机会 -->
      <div class="get_prize_num" v-if="panel.type > 0">
        <div class="flip_wrap" v-for="(item, index) in exchangePrizeCountData.list" @click="flop(index)"
        :class="{active: prize.index === index, checked: prize.index >= 0, all: prize.all}"><!-- 大容器 -->
          <div class="flip"><!-- 实现翻牌容器 -->
            <div class="side front"><!-- 牌正面 -->
            </div>
            <div class="side back"><!-- 牌背面 -->
              {{item}}
            </div>
          </div>
        </div>

        <p class="prise_tip" v-show="panel.type === 1">任意点击“头像”，抽一个吧~</p>
      </div>
      <!-- /  输入兑换抽奖机会 -->
    </alert-panel>

    <!--   /  抽奖弹框  -->
    <alert-panel :title="chouJiang.title"  v-model="chouJiang.isOpen" :sure-btn="chouJiang.btn" :content="chouJiang.content" @sureClick="chouJiang.btnClicked" :show-close-btn="false">
    </alert-panel>

    <!--   活动未开始提示  -->
    <div class="unstart_box" v-if="!activity.isOnline && activity.isInit">
     <img src="./../../imgs/img_weikaishi.png" class="yxy"> <br>
     <img src="./../../imgs/img_yichang.png" class="text_tip"> <br>
     <router-link to="/ciyuan2017" class="back_btn"></router-link>
     {{activity.isOnline}}
    </div>
  </div>
</template>

<script type="text/javascript">
import $ from 'jquery';
import { mapState } from 'vuex';
import ConcertApi from './../../concert-api.js';
import { BrowserUtil, RouterUtil } from '@/utils';

import { AlertPanel } from '@/components';

export default {
    components: {
        AlertPanel
    },
    data() {
        return {
            activity: {
                ruleIntro: '',
                startTime: '',
                isOnline: '',
                isInit: false,
                winningRecords: []
            },
            exchangePrizeCountData: {
                list: [0, 0, 0, 0, 0, 0], // 兑奖列表
                num: 0   // 中奖数字
            },
            exchangeNum: '',
            screen: {
                list: [], // 奖品列表
                min: 1.25,
                max: 0,
                scrolling: false,
                top: '0rem', // 滚动图片的高度
                speed: 1000, // 滚动速度
                height: 1.5 // 每张图片的高度
            },
            isFromApp: BrowserUtil.isFormApp(),
            countTip: '',
            prizeBtn: {
                submiting: false,
                haveExchangeChance: false,
                text: '',  // 抽奖按钮文字
                status: '', // unlogin:未登录  unexchange:未兑奖  prizes:可抽奖
                prizeCount: 0  // 剩余抽奖次数
            },
            panel: {
                content: '',
                title: '',
                type: 0,
                isOpen: false,
                btn: {
                    text: '',
                    url: ''
                }
            },
            prize: { // 兑奖状态
                index: -1,
                all: false
            },
            rocking: false,
            querys: this.$route.query,
            shareInfos: {
                title: '我关注的源音塘次元音乐会开始啦，一起来玩吧！', // 分享标题
                link: window.location.origin + '/ciyuan2017/prize', // 分享链接
                imgUrl: window.location.origin + '/static/imgs/activity/2017/concert.png', // 分享图标
                desc: '源音塘次元音乐会现场嘉宾有伦桑、奇然、小魂、Assen捷、柏凝、竹桑、冥月、白荏等，还将赠送伴手礼和抽奖福利，精彩不容错过哦！'
            },
            chouJiang: {
                prize: {},
                title: '',
                isOpen: false,
                btn: {
                    text: '',
                    url: ''
                },
                content: '',
                btnClicked: () => {}
            },
            accepting: false,
            itemId: []
        };
    },
    computed: {
        ...mapState({
            isLogined: state => state.user.isLogined
        }),
        isDisabledScreenBtn() {
            return this.$store.state.user.isLogined && this.prizeBtn.status && !this.prizeBtn.prizeCount;
        }
    },
    watch: {
        isLogined(isLogined) {
            // 如果用户没有登录
            if (!isLogined) {
                this.prizeBtn.text = '赶紧登录';
                this.countTip = '请登录查看抽奖机会哟';
                return;
            }

            this.initPrizeBtn();
            this.getWinningRecords();
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            // 获取活动信息
            this.getPrizeInfo();
            // 获取屏幕奖品列表
            this.getScreenPrize();

            // 初始化分享信息
            this.$share(this.shareInfos);

            // 如果用户没有登录
            if (!this.isLogined) {
                this.prizeBtn.text = '赶紧登录';
                this.countTip = '请登录查看抽奖机会哟';
                return;
            }

            this.initPrizeBtn();
            this.getWinningRecords();
        },
        getPrizeInfo() {
            ConcertApi.getPrizeInfo().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.activity.isInit = true;
                this.activity.ruleIntro = res.data.role;
                this.activity.isOnline = res.data.status || 0;
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        getScreenPrize() {
            ConcertApi.getScreenPrize().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.screen.list = res.data;
                this.screen.top = this.screen.min;
                this.screen.max = this.screen.min + this.screen.min * 100 * this.screen.list.length / 100;
                this.screen.list.unshift(this.screen.list[this.screen.list.length - 1]);
                this.screen.list.push(this.screen.list[1]);
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        getWinningRecords() {
            ConcertApi.getWinningRecords().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.activity.winningRecords = res.data;
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
            ConcertApi.searchPrizeCount().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.prizeBtn.status = res.data.status;

                if (this.prizeBtn.status > 0) { // 如果已兑换抽奖机会
                    this.prizeBtn.text = '抽奖';
                    this.prizeBtn.prizeCount = res.data.counts; // 抽奖次数
                    this.countTip = `您当前有${this.prizeBtn.prizeCount}次抽奖机会`;
                } else { // 如果有兑奖机会
                    this.panel.type = 0;
                    this.countTip = '快去兑换抽奖机会';
                    this.prizeBtn.text = '兑换抽奖机会';
                    this.prizeBtn.haveExchangeChance = true; // 兑奖次数
                }
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
            if (!this.isLogined) {
                this.login();
                return;
            }

            // 如果有兑奖机会，进行兑奖
            if (this.prizeBtn.haveExchangeChance) {
                this.exchangeChance();
                return;
            }

            // 如果没有兑奖机会，且有抽奖机会，进行抽奖
            if (!this.prizeBtn.haveExchangeChance && this.prizeBtn.prizeCount) {
                this.getPrize();
                return;
            }
        },
        // 登录
        login() {
            if (this.isFromApp) {
                let param = { funcName: 'gotoLogin' };

                this.callAppFunction('gotoLogin', param);
            } else {
                RouterUtil.download(this.$router, this.$route);
            }
        },
        // 兑奖
        exchangeChance(panel) {
            this.panel.title = '兑换抽奖机会';
            this.panel.isOpen = true;
            this.panel.btn.text = '兑换';
        },
        // 抽奖
        getPrize() {
            if (this.isDisabledScreenBtn) {
                return;
            }

            this.isDisabledScreenBtn = true;

            ConcertApi.getScreenWinningPrize().then(res => {
                this.isDisabledScreenBtn = false;

                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.chouJiang.prize = res.data;
                this.runScroll();

                setTimeout(() => {
                    this.tipPrize(res.data);
                    this.prizeBtn.prizeCount--;
                    this.chouJiang.prize.is_addr = false;
                    this.countTip = `您当前有${this.prizeBtn.prizeCount}次抽奖机会`;

                    if (this.chouJiang.prize.type !== 4) {
                        this.activity.winningRecords.unshift(this.chouJiang.prize);
                    }
                }, 6000);
            }, error => {
                this.$toast.error(error.msg);
                this.isDisabledScreenBtn = false;
            });
        },
        // 拉动摇杆
        tiggerRock() {
            let count = 0;
            let rocker = setInterval(() => {
                this.rocking = !this.rocking;

                if (count) {
                    clearInterval(rocker);
                } else {
                    count++;
                }
            }, 700);
        },
        // 滚动屏幕
        runScroll() {
            if (this.screen.scrolling) {
                return;
            }

            let index = this.getScrollIndex();
            let scrollHeight = this.screen.min + this.screen.height * 100 * (index - 1) / 100;

            this.screen.scrolling = true;

            $('#screenScroller').css({top: `-${this.screen.min}rem`});
            $('#screenScroller').animate({top: `-${this.screen.max}rem`}, 1000, 'linear', () => {
                $('#screenScroller').css({top: `-${this.screen.min}rem`});
                $('#screenScroller').animate({top: `-${this.screen.max}rem`}, 1000, 'linear', () => {
                    $('#screenScroller').css({top: `-${this.screen.min}rem`});
                    $('#screenScroller').animate({top: `-${this.screen.max}rem`}, 1000, 'linear', () => {
                        $('#screenScroller').css({top: `-${this.screen.min}rem`});
                        $('#screenScroller').animate({top: `-${this.screen.max}rem`}, 1000, 'linear', () => {
                            $('#screenScroller').css({top: `-${this.screen.min}rem`});
                            $('#screenScroller').animate({top: `-${scrollHeight}rem`}, 1000, 'linear', () => {
                                this.screen.scrolling = false;
                            });
                        });
                    });
                });
            });
        },
        getScrollIndex() {
            let preizeIndex = -1;
            let prizeId = this.chouJiang.prize.id;

            for (let index = 1; index < this.screen.list.length - 1; index++) {
                if (this.screen.list[index].id === prizeId) {
                    preizeIndex = index;
                }
            }

            return preizeIndex;
        },
        tipPrize(prize) {
            this.chouJiang.isOpen = true;

            if (prize.type === 1 || prize.type === 2) {
                this.chouJiang.title = '恭喜你';
                this.chouJiang.btn.text = '填写地址领取';
                this.chouJiang.content = `原来您就是传说中的欧皇<br/>恭喜您抽中${prize.title}`;
                this.chouJiang.btnClicked = this.inputAddr;
            }

            // 抽到甜甜圈
            if (prize.type === 3) {
                this.chouJiang.title = '恭喜你';
                this.chouJiang.btn.text = '立即领取';
                this.chouJiang.content = `原来您就是传说中的欧皇<br/>恭喜您抽中${prize.t_number}个甜甜圈`;
                this.chouJiang.btnClicked = () => {
                    this.acceptTianTianQuan();
                    this.chouJiang.isOpen = false;
                };
            }

            // 未中奖
            if (prize.type === 4) {
                this.chouJiang.btn.text = '好的';
                this.chouJiang.title = '什么都没有';
                this.chouJiang.content = '别灰心，换个姿势手气更好';
                this.chouJiang.btnClicked = () => {
                    this.chouJiang.isOpen = false;
                };
            }
        },
        acceptPrize(prize) {
            this.chouJiang.prize = prize;

            if (prize.accepting) {
                this.$toast.error(`正在领取${prize.title}`);
            }

            prize.accepting = true;

            if (prize.type === 1 || prize.type === 2) {
                this.inputAddr();
            }

            // 抽到甜甜圈
            if (prize.type === 3) {
                this.acceptTianTianQuan(prize);
            }
        },
        acceptTianTianQuan(prize) {
            if (prize) {
                this.chouJiang.prize = prize;
            } else {
                prize = this.chouJiang.prize;
            }

            ConcertApi.acceptPrize(prize.win_id || prize.id).then(res => {
                if (res.code !== 200) {
                    prize.accepting = false;
                    this.$toast.error(res.msg);
                    return;
                }

                this.chouJiang.isOpen = false;
                this.$toast.success('领取成功，甜甜圈将于 12h 内到账');

                let itemId = 0;
                let checkId = prize.win_id || prize.id;

                for (let index = 0; index < this.activity.winningRecords.length; index++) {
                    itemId = this.activity.winningRecords[index].win_id || this.activity.winningRecords[index].id;

                    this.itemId.push(itemId);

                    if (itemId === checkId) {
                        this.activity.winningRecords[index].is_addr = true;
                    }
                }
            }, error => {
                prize.accepting = false;
                this.$toast.error(error.msg);
            });
        },
        // 点击弹框按钮
        sureClicked() {
            // 点击兑奖
            if (this.panel.type === 0) {
                this.exchangePrizeCount();
                return;
            }

            // 点击抽一下
            if (this.panel.type === 1) {
                return;
            }

            // 点击收下
            if (this.panel.type === 2) {
                this.panel.type++;
                this.prize.all = true;
                this.panel.btn.text = '去抽奖';
                return;
            }

            // 点击去抽奖
            if (this.panel.type === 3) {
                this.panel.isOpen = false;
                this.prizeBtn.text = '抽奖';
                this.countTip = `您当前有${this.prizeBtn.prizeCount}次抽奖机会`;
                return;
            }
        },
        exchangePrizeCount() {
            if (this.prizeBtn.submiting) {
                this.$toast.tip('兑换中...');
                return;
            }

            let params = {
                code: this.exchangeNum
            };

            if (!params.code) {
                this.$toast.error('兑奖码不能为空');
                return;
            }

            ConcertApi.exchangePrizeCount(params).then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.panel.type++;
                this.panel.btn.text = '';
                this.prizeBtn.submiting = false;

                this.exchangePrizeCountData.list = res.data.info;
                this.exchangePrizeCountData.num = res.data.counts;

                this.prizeBtn.haveExchangeChance = false;
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        flop(index) {
            if (this.prize.index >= 0) {
                return;
            }

            this.panel.type++;
            this.prize.index = index;
            this.panel.btn.text = '收下';
            this.prizeBtn.prizeCount = this.exchangePrizeCountData.num;
            this.exchangePrizeCountData.list[index] = this.exchangePrizeCountData.num;
        },
        inputAddr() {
            let searchStr = '?';
            let addr = `${window.location.origin}/ciyuan2017/address`;
            let prize = this.chouJiang.prize;

            this.$route.query.prizeId = prize.win_id || prize.id;

            if (prize.type === 1) {
                this.$route.query.addr = 'material';
            }

            if (prize.type === 2) {
                this.$route.query.addr = 'virtual';
            }

            for (let key in this.$route.query) {
                searchStr += key + '=' + this.$route.query[key] + '&';
            }

            this.goAddr(addr + searchStr);
        },
        goAddr(url) {
            if (BrowserUtil.isFormApp()) {
                let param = {
                    url: url,
                    title: '填写兑奖信息',
                    headerType: 'share' // share：分享，submit：提交
                };

                this.callAppFunction('go', param);
            } else {
                RouterUtil.go(url, this.$router);
            }
        }
    }
};
</script>

<style type="text/css" lang="less" scoped>
  @import './main.less';
</style>
