<template>
  <div class="prize_page">
    <img src="./../../imgs/bg_jianjie_top.png">
    <div class="prize_list">
      <ul>
        <li>
          <div class="prize_name fl">
            <p class="front">奖品名称</p>
            <p class="bg">奖品名称</p>
          </div>
          <div class="status fr">
            <p class="front">状态</p>
            <p class="bg">状态</p>
          </div>
        </li>
    		<li v-for="(item, index) in prizeList" :key="item.id">
    			<p>{{item.title}}</p>
    			<button class="accept" @click="inputAcceptInfo(index)" v-if="!item.is_addr">领取</button>
          <button class="accept" :disabled="true" v-if="Number(item.is_addr) && Number(item.type) === 3">已领取</button>
    			<button class="accept" :disabled="true" v-if="Number(item.is_addr) && Number(item.type) !== 3">已填写</button>
        </li>
    	</ul>

      <div class="empty" v-if="!prizeList.length">
        <img src="./../../imgs/img_spring_nothing.png">
        <p>你还没有中奖哦，加油吧</p>
      </div>
    </div>
    <img src="./../../imgs/bg_jianjie_bottom.png">
  </div>
</template>

<script type="text/javascript">
import SpringApi from './../../spring-api.js';
import { EmptyTip } from '@/components';

export default {
    components: {
        EmptyTip
    },
    data() {
        return {
            prizeList: []
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.initPrizeList();
        },
        /**
         * [initPrizeList 初始化获奖列表]
         * @Author   郑君婵
         * @DateTime 2018-01-08
         * @return   {[type]}   [description]
         */
        initPrizeList() {
            SpringApi.getWinningRecords().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.prizeList = res.data;
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        inputAcceptInfo(index) {
            if (this.prizeList[index].accepting) {
                this.$toast.error(`正在领取${this.prizeList[index].title}`);
                return;
            }

            if (Number(this.prizeList[index].type) === 1 || Number(this.prizeList[index].type) === 2) {
                this.$parent.goInputAddrPage(this.prizeList[index]);
                return;
            }

            // 抽到甜甜圈
            if (Number(this.prizeList[index].type) === 3) {
                this.$parent.acceptTianTianQuan(this.prizeList[index], () => {
                    this.prizeList[index].is_addr = true;
                });
            }
        }
    }
};
</script>

<style type="text/css" lang="less" scoped>
  @import './main.less';
  @import './../../common.css';
</style>
