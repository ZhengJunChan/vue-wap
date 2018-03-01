<template>
    <div class="gather-page-coin">
      <gatherBgItem class="page-content">
         <div class="got-coin-zone">
            <div class="coin-zone">
              <img src="./../../img/bg_newyear_doughnut.png" alt="">
              <div class="warp">
                <p class="title">恭喜您</p>
                <p class="num">抽中<span>{{info.t_number||0}}</span>个甜甜圈</p>
                <p class="text">你就是源音塘最富有的人</p>
              </div>
            </div>
         </div>
        <p class="text-warp">甜甜圈是未来源音塘的通用货币<br>
          可以用来投喂歌曲<br>
          但是不能吃哦</p>
        <div class="button-warp">
          <button class="is-button" type="button" v-if="!ifGetClick">已领取</button>
           <button class="can-button" type="button" v-else @click="goGetCoin">点击领取</button>
        </div>
      </gatherBgItem>
        <p class="notice-title">甜甜圈及时到账哦，请到个人中心查看</p>
    </div>
</template>
<script type="text/javascript">
    import gatherBgItem from './../bg-item/index.vue';
    import Ajax from './../../Api.js';
    export default {
        props: {
            info: {
                type: Object
            },
            ticket: ''
        },
        components: {
            gatherBgItem
        },
        data() {
            return {
                ifGetClick: this.info.status === 0,
                canClick: true
            };
        },
        methods: {
            goGetCoin() {
                if (!this.canClick) {
                    return;
                }
                this.canClick = false;
                Ajax.acceptPrize(this.info.win_id || this.info.id).then(() => {
                    this.ifGetClick = false;
                    this.$toast.success('领取成功！');
                    this.canClick = true;
                }).catch((e) => {
                    this.canClick = true;
                    this.$toast.error(e.msg || '领取失败');
                });
            }
        }
    };
</script>
<style lang="less">
  @import 'index.less';
</style>
