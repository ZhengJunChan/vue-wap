<template>
  <div class="all-page-content">
    <div class="play-icon-zone" v-if="showPlayer">
      <img src="./image/p1_icon_play.png" class="playing">
    </div>
    <component :is="`report${componentId}`"
               @changeComponent="changeComponent"
               @reloadDataFn = "init"
               class="report-2017-children"
               :class="{'report-2017-showUp': showUp}"
               :isSelf="isSelf?true:true"
               :screenHw="oStyle"
               :isLoading = 'isLoading'
               :staticData = "staticData"
    />
    <div class="bottom-logo-zone">
      <div class="go-up cch" @click="changeComponent(1)" v-if="showUp">
        <img src="./image/icon_slide@2x.png"><br>
        <img src="./image/icon_slide@2x.png">
      </div>
      <br v-if="showUp">
      <img src="./image/logo@2x.png" class="logo">
    </div>
  </div>
</template>
<script type="text/javascript">
  import store from '@/vuex';
  import children from './children.js';
  import Ajax from './Api.js';
  export default {
    data() {
      return {
        componentId: 0,
        dataList: [],
        queryPage: Number(this.$route.query.p) ? Number(this.$route.query.p) : 0,
        isSetTouchObj: {},
        isLoading: 0,
        timerNum: false,
        isGetData: false
      };
    },
    components: children.getPonents(),
    computed: {
      oStyle() {
        return {
          h: document.documentElement.offsetHeight,
          w: document.documentElement.offsetWidth,
          hw: document.documentElement.offsetHeight / document.documentElement.offsetWidth
        };
      },
      staticData() {
        return children[`page${this.componentId + 1}`];
      },
      isSelf() {
        let loginUid = store.infos && store.infos.uid && Number(store.infos.uid) ? Number(store.infos.uid) : 0;
        let getUid = this.$route.query && this.$route.query.uid && Number(store.infos.uid) ? Number(this.$route.query) : 0;
        return loginUid > 0 && (loginUid === getUid);
      },
      showUp() {
        return (this.componentId < 10 && this.isLoading >= 100 && !(this.oStyle.hw < 1.51 && this.componentId === 0));
      },
      showPlayer() {
        return this.componentId !== 11;
      }
    },
    watch: {
      isLoading(v) {
        typeof v === 'number' && v >= 100 && (this.isLoading = 100, this.componentId = this.queryPage);
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.isGetData = false;
        this.timerNum = false;
        this.isLoading = 0;
        this.getAllData();
        this.setTimerFn();
      },
      setTimerFn(o) {
        this.timerNum && (window.clearInterval(this.timerNum), this.timerNum = false);
        if (o === false || (typeof this.isLoading !== 'number')) { return; };
        let s = 50; let limit = 78; let canTimer = true;
        if (this.isGetData) {
          s = 5;
          limit = 100;
        } else if (this.isLoading < 78) {
          s = 100;
          limit = 78;
        } else if (this.isLoading < 85) {
          s = 600;
          limit = 85;
        } else if (this.isLoading < 92) {
          s = 1000;
          limit = 92;
        } else if (this.isLoading < 98) {
          s = 1400;
          limit = 98;
        } else {
          canTimer = false;
        }
        canTimer && (this.timerNum = setInterval(() => {
          this.isLoading += 1;
          if (this.isLoading >= limit) {
            this.setTimerFn(this.isLoading < 100);
          }
        }, s));
      },
      changeComponent(o) {
        if (typeof o === 'number') {
          o = this.componentId + o;
          o = o < 0 ? 0 : o > 11 ? 11 : o;
          this.componentId = parseInt(o);
        }
      },
      getAllData() {
        Ajax.getReport2017Data(0).then((res) => {
          this.dataList = res.data;
          this.isGetData = true;
          this.setTimerFn();
        }).catch(() => {
          this.isGetData = true;
          this.setTimerFn();
//                  this.isLoading = false;
//                  this.$toast && this.$toast.error && this.$toast.error(error.msg || '数据获取失败');
        });
      }
    },
    beforeDestroy() {
      this.isSetTouchObj.destroy && this.isSetTouchObj.destroy();
      this.setTimerFn(false);
    },
    mounted() {
      window.m$.documentTitle('你的2017源音塘专属年报');
      this.isSetTouchObj = children.setTouch(document.getElementById('activity-report-2017'), () => {
        this.isLoading >= 100 && this.componentId < 10 && this.changeComponent(1);
      }, () => {
        this.isLoading >= 100 && this.componentId < 11 && this.changeComponent(-1);
      }, 30);
    }
  };
</script>

