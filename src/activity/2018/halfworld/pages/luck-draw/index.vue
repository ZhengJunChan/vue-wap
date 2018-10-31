<template>
  <div class="prize_page">
    <div class="panel">
        <img class="border_img" src="./../../img/rule/img_Frame_header_choujiang@2x.png" onclick="return false">
        <div class="content">
            <div class="luck_draw">
                <div class="btn" @click="getPrize">
                    <p class="chou">抽</p>
                    <p class="counts">({{prizeBtn.count}}次机会)</p>
                </div>

                <div class="item" v-for="(item, index) in prizeList" :class="[`item${index+1}`,{'active': luckDraw.index === index}]" v-if="index < 6">
                    <div class="img_box" :style="{backgroundImage: `url(${item.imgpic_info && $fixImg(item.imgpic_info.link)})`}">
                    </div>
                    <p class="text_nowrap_ellipsis" v-html="item.title"></p>
                </div>
            </div>
            <div class="btn_label">
                <div class="btn" @click="goPrizePage">我的中奖纪录</div>
                <div class="btn" @click="goPrizeRulePage">抽奖活动规则</div>
            </div>
        </div>
        <img class="border_img" src="./../../img/rule/img_frame_bottom.png" onclick="return false">
    </div>

    <p class="ios_intro" v-show="isFromIosApp">本次活动与苹果公司无关</p>

    <!--   /  抽奖弹框  -->
    <alert-panel :title="panel.title"  v-model="panel.isOpen" :btn-text="panel.btnText" :content="panel.content" @sureClick="panel.btnClicked"></alert-panel>
  </div>
</template>
<script type="text/javascript">
import Btn from './../../components/btn';
import { mapState } from 'vuex';
import Api from './../../api.js';
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
                count: 0, // 总共有多少个位置
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
        },
        /**
         * [getScreenPrize 获取屏幕奖品列表]
         * @Author   郑君婵
         * @DateTime 2018-01-05
         */
        getScreenPrize() {
            Api.getScreenPrize().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.prizeList = res.data;
                this.luckDraw.count = this.prizeList.length;
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        /**
         * [requirePrizeCount 查询用户剩余抽奖次数]
         * @Author   郑君婵
         * @DateTime 2018-01-04
         */
        searchPrizeCount() {
            Api.searchPrizeCount().then(res => {
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
            if (this.luckDraw.running || !this.luckDraw.count) {
                return;
            }

            this.luckDraw.running = true;

            let params = {
                chance_id: ''
            };

            Api.getScreenWinningPrize(params).then(res => {
                this.luckPrize = res.data;
                this.run();
                this.searchPrizeCount();
            }, error => {
                this.luckDraw.running = false;

                if (error.code === 400 && error.data) {
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
