<template>
<div class="share_page">
    <div class="show_share_tip" v-show="showTip" @click="hideTip"></div>

    <p class="intro">
    	我已报名<br>
        <router-link to="/2017school">“筑梦之路·<br>
        源音塘校园音乐大赛”</router-link><br>
        <br>
        更多比赛信息及福利<br>
        请关注官方微博@源音塘音乐<br>
        官方微信YYTangMusic<br>
        官方QQ群342206830<br>

        <router-link class="click_btn" to="/2017school" v-if="isFromHome">去报名</router-link>
        <span class="click_btn" @click="shareTip" v-else>分享</span>
    </p>

    <div class="item">
        <h2 class="title">
            <span class="text">活动奖励</span>
        </h2>

        <div class="prizes">
            <div>
                <p class="prize">
                    <span class="money">3000</span>元现金<br>
                    +Beats耳机
                </p>
            </div>
            <div>
                <p class="prize">
                    <span class="money">2000</span>元现金<br>
                    +Bose音箱
                </p>
            </div>
            <div>
                <p class="prize">
                    <span class="money">1000</span>元现金
                </p>
            </div>
        </div>
    </div>

    <div class="item">
        <h2 class="title">
            <span class="text">音乐基金奖励</span>
        </h2>

        <p class="prizes_intro">
            冠军可获源音塘11月25日<br>
            线下音乐会表演嘉宾资格，<br>
            与大咖音乐人同台演出！<br>
            <br>
            前5强可获专属推广礼包！<br>
            前13强均可获源音塘<br>
            11月25日线下音乐会VIP席门票！<br>
            <br>
            大赛优秀选手均可享受源音塘<br>
            音乐人培养计划支持，<br>
            有机会成为源音塘签约艺人！<br>
        </p>
    </div>
    <div class="official_icons">
        <div class="clear_float">
            <div class="official_erweima fl">
                <img src="./../imgs/img_wechat.png">
                <span>官方微信</span>
            </div>
            <div class="official_erweima fr">
                <img src="./../imgs/img_webo.png">
                <span>官方微博</span>
            </div>
        </div>
    </div>
</div>
</template>

<script type="text/javascript">

export default {
    data() {
        return {
            showTip: false,
            isFromHome: false
        };
    },
    methods: {
        shareTip() {
            this.showTip = true;
            this.share();
        },
        hideTip() {
            this.showTip = false;
        }
    }
};
</script>

<style lang="less" scoped>
  @import './main.less';
</style>
