<template>
  <div class="home_page">
    <div class="header">
        <img class="header_img" src="./imgs/header_img.jpg">
        <img class="title_img" src="./imgs/img_newyear_title.png">
        <div class="puzzle_page_btn" @click="goCardsPage"></div>
    </div>

    <div class="container">
        
        <div class="info">
            <div class="item">
                <div class="title">
                    <div class="text">
                        <span>活</span>
                        <span>动</span>
                        <span>简</span>
                        <span>介</span>
                    </div>
                </div>

                <div class="content" v-html="$parent.activity.remark"></div>
            </div>

            <div class="item">
                <div class="title">
                    <div class="text">
                        <span>活</span>
                        <span>动</span>
                        <span>规</span>
                        <span>则</span>
                    </div>
                </div>

                <div class="content" v-html="$parent.activity.ruleIntro"></div>
            </div>
        </div>


        <div class="prize_list">
            <div class="list_title">
                <div class="title">
                    <div class="text">
                        <span>奖</span>
                        <span>品</span>
                        <span>介</span>
                        <span>绍</span>
                    </div>
                </div>
            </div>

            <ul>
                <li>
                    <div class="prize_title">新年福签</div>
                    <div class="prize_info">
                        <img src="./imgs/img_newyear_ac_goodsign.jpg">
                        <p>
                            新年美好的祝福<br>
                            来试试你的手气吧<br><br>
                            (记得截图分享~)
                        </p>
                    </div>
                </li>
                <li>
                    <div class="prize_title">源音塘甜甜圈</div>
                    <div class="prize_info">
                        <img src="./imgs/img_newyear_ac_doughnut.jpg">
                        <p>
                            未来源音塘的通用货币<br>
                            可以用来投喂歌曲<br><br>
                            (但是不可以吃~）
                        </p>
                    </div>
                </li>
                <li>
                    <div class="prize_title">别样新年祝福</div>
                    <div class="prize_info">
                        <img src="./imgs/img_newyear_ac_words.jpg">
                        <p>
                            别样新年祝福<br>
                            来自源音塘的各大音乐人<br>
                            轻轻在耳边说给你听！
                        </p>
                    </div>
                </li>
                <li>
                    <div class="prize_title">神兽碎片</div>
                    <div class="prize_info">
                        <img src="./imgs/img_newyear_ac_dog.jpg">
                        <p>集齐四汪神兽可兑换源音塘精装定制新年福袋，汪年神兽做护法让你一路旺到底！</p>
                    </div>
                </li>
            </ul>
        </div>

        <!-- <div class="partner">
            <div class="title">
                <div class="text">
                    <span>合</span>
                    <span>作</span>
                    <span>伙</span>
                    <span>伴</span>
                </div>
            </div>

            <ul>
                <li>
                    <img src="http://placehold.it/10/10">
                </li>
            </ul>

        </div> -->

        <p class="tip" v-show="isFromIosApp">本次活动与苹果公司无关</p>
    </div>

  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';
// import JiFuApi from './../../ji-fu-api.js';
import { BrowserUtil, RouterUtil } from '@/utils';

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
            prizeList: []
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
        },
        /**
         * [goCardsPage 跳转到集卡页面]
         * @Author   郑君婵
         * @DateTime 2018-01-25
         */
        goCardsPage() {
            if (!BrowserUtil.isFormApp()) {
                RouterUtil.download(this.$router, this.$route);
                return;
            }

            if (!this.isLogined) {
                this.login();
                return;
            }

            let param = {
                url: `/activity/2018_ji_fu/cards`,
                title: '源音塘集福过新年'
            };

            if (BrowserUtil.isFormApp()) {
                param.url = window.location.origin + param.url;
                param.headerType = 'share';
                param.activity = 'activity';

                this.callAppFunction('go', param);
            } else {
                RouterUtil.go(param.url, this.$router);
            }
        },
        // 登录
        login() {
            let param = { funcName: 'gotoLogin' };

            this.callAppFunction('gotoLogin', param);
        }
    }
};
</script>

<style type="text/css" lang="less" scoped>
  @import './../../common.less';
  @import './main.less';
</style>
