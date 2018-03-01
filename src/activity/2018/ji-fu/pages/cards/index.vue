<template>
  <div class="cards_page">
    <div class="card_box" :class="cards.list.length && !cards.list[cards.index].my_count && 'empty'">
        <img class="img_show" :src="`${cards.list.length && cards.list[cards.index].imgpic_link}/543/720`" @click="showImg">

        <div>
            <button class="alert_rule_btn" @click="openRule">查看拼图活动规则</button>
        </div>
    </div>

    <ul class="cards">
        <li v-for="(card, index) in cards.list" :class="!card.my_count && 'empty'" @click="showCard(index)">
            <div class="item" :class="index === cards.index && 'selected'">
                <div bac>
                    <img class="card_img" :src="`${card.imgpic_link}/543/720`">
                    <!-- <img class="card_img" :src="`${card.imgpic_link}/150/200`"> -->
                    <p class="num_tip" v-text="card.my_count" v-show="card.my_count"></p>
                </div>
            </div>
            <p class="card_name" v-text="card.title">旺财汪</p>
        </li>
    </ul>

    <x-dialog v-model="dialogPanel.openPrize || dialogPanel.openRule" class="dialog" :dialog-style="{'background-color': 'transparent', 'width': '100%', 'max-width': '6.6rem'}">
        <div class="prize_alert" v-show="dialogPanel.openPrize">
            <button @click="acceptPrize" class="accept_btn">立即领取</button>
        </div>

        <div class="rule_alert" v-show="dialogPanel.openRule">
            <img class="header_top" src="./imgs/bg_newyear_rule2.png">
            <div class="rule_info">
                <div class="title">
                    <div class="text">
                        <span>拼</span>
                        <span>图</span>
                        <span>规</span>
                        <span>则</span>
                    </div>
                </div>
                <p class="time">活动时间：{{$parent.activity.timeRange}}</p>
                <div v-html="$parent.activity.ruleIntro"></div>
            </div>
        </div>

        <x-icon class="close_btn" type="ios-close-outline" size="30" @click="closeDialog"></x-icon>
    </x-dialog>

    <!--   /  可合成大礼包提示  -->
    <alert-panel :title="groupPrize.title"  v-model="groupPrize.isOpen" :sure-btn="groupPrize.btn" :content="groupPrize.content" @sureClick="groupPrize.btnClicked" :show-close-btn="true">
    </alert-panel>
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';
import { BrowserUtil } from '@/utils';
import JiFuApi from './../../ji-fu-api.js';

import { AlertPanel } from '@/components';
import { XDialog } from 'vux';

export default {
    components: {
        AlertPanel,
        XDialog
    },
    data() {
        return {
            activity: {
                remark: '',
                ruleIntro: ''
            },
            cards: {
                list: [],
                index: 0,
                typeCount: 0,
                prizeId: -1
            },
            imgList: [],
            groupPrize: {
                isOpen: false,
                title: {
                    text: '哇！恭喜大大'
                },
                btn: {
                    show: true,
                    text: '去合成'
                },
                content: '您已集齐四汪<br>可以合成源音塘大礼包啦',
                btnClicked: this.getPrize
            },
            dialogPanel: {
                openPrize: false,
                openRule: false
            }
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
            this.getCardsInfo();
        },
        /**
         * [getCardsInfo 获取卡片信息]
         * @Author   郑君婵
         * @DateTime 2018-01-25
         */
        getCardsInfo() {
            JiFuApi.getCardsInfo().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.cards.list = res.data.list;

                this.setGroupPrize(res.data.list);
                this.setAlert(res.data);
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        /**
         * [setSelectedCard 设置选中的卡片]
         * @Author   郑君婵
         * @DateTime 2018-01-31
         */
        setGroupPrize(list) {
            let index = 0;
            let isSelected = false;
            let type = this.$route.query.type;

            for (; index < list.length; index++) {
                if (type && type === list[index].type) {
                    isSelected = true;
                    this.showCard(index);
                }

                if (!list[index].my_count) {
                    continue;
                }

                this.cards.typeCount++;
                this.imgList.push({
                    src: list[index].imgpic_link
                });

                if (!isSelected && !type) {
                    isSelected = true;
                    this.showCard(index);
                }
            }
        },
        /**
         * [showCard 展示卡片]
         * @Author   郑君婵
         * @DateTime 2018-01-31
         */
        showCard(index) {
            this.cards.index = index;
        },
        /**
         * [setAlert 设置alert弹框]
         * @Author   郑君婵
         * @DateTime 2018-01-31
         */
        setAlert(data) {
            // 如果已经过领取礼品
            if (data.receive_status) {
                return;
            }

            // 如果没有领取过奖品，却已合成
            if (data.is_merge) {
                this.cards.prizeId = data.gift_id;
                this.dialogPanel.openPrize = true;
                return;
            }

            // 如果没有合成，但已经集齐卡片
            if (this.cards.typeCount === data.list.length && data.can_merge) {
                this.groupPrize.isOpen = true;
            }
        },
        /**
         * [getPrize 点击合成，获取奖品]
         * @Author   郑君婵
         * @DateTime 2018-01-25
         * @return   {[type]}   [description]
         */
        getPrize() {
            JiFuApi.groupPrize().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.groupPrize.isOpen = false;
                this.dialogPanel.openPrize = true;
                this.cards.prizeId = res.data.gift_id;
                this.fixCardCount();
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        /**
         * [fixCardCount 合成后，每种卡片减一]
         * @Author   郑君婵
         * @DateTime 2018-01-25
         */
        fixCardCount() {
            let index = 0;

            for (; index < this.cards.list.length; index++) {
                this.cards.list[index].my_count--;
            }
        },
        /**
         * [acceptPrize 领取奖品]
         * @Author   郑君婵
         * @DateTime 2018-01-25
         */
        acceptPrize() {
            let params = {
                win_id: this.cards.prizeId
            };

            this.$parent.goInputAddrPage(params);
        },
        openRule() {
            this.dialogPanel.openRule = true;
        },
        closeDialog() {
            if (this.dialogPanel.openPrize) {
                this.dialogPanel.openPrize = false;
            }

            if (this.dialogPanel.openRule) {
                this.dialogPanel.openRule = false;
            }
        },
        showImg() {
            let index = 0;

            for (; index < this.imgList.length; index++) {
                if (this.imgList[index].src === this.cards.list[this.cards.index].imgpic_link) {
                    this.callAppFunction('previewer', {
                        list: this.imgList, // 图片地址列表
                        index: index
                    });

                    return;
                }
            }
        }
    }
};
</script>

<style type="text/css" lang="less" scoped>
  @import './../../common.less';
  @import './main.less';
</style>
