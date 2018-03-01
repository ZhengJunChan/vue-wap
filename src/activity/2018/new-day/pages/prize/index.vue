<template>
  <div class="prize_page">
  	<p class="top_tip">中奖后请于7个工作日内填写收件地址或资料，逾期将不受理哦~</p>

  	<ul v-if="prizeList.length">
  		<li v-for="(item, index) in prizeList">
  			<p>{{index+1}}、{{item.title}}</p>
  			<button class="accept" @click="inputAcceptInfo(index)" v-if="!item.is_addr">领取</button>
        <button class="accept" :disabled="true" v-if="item.is_addr && item.type === 3">已领取</button>
  			<button class="accept" :disabled="true" v-if="item.is_addr && item.type !== 3">已填写</button>
      </li>
  	</ul>

    <div class="empty" v-else>
      <empty-tip>
          <p>还没有抽取奖品哦~</p>
      </empty-tip>
    </div>
  </div>
</template>

<script type="text/javascript">
import NewDayApi from './../../new-day-api.js';
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
            NewDayApi.getWinningRecords().then(res => {
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
            }

            if (this.prizeList[index].type === 1 || this.prizeList[index].type === 2) {
                this.$parent.goInputAddrPage(this.prizeList[index]);
            }

            // 抽到甜甜圈
            if (this.prizeList[index].type === 3) {
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
</style>
