<template>
  <div class="activity-report-2017"
       :class="{'has-report-data':isLoading>=100}"
       :style="{'height': oStyle.h + 'px'}" id="activity-report-2017">
      <div class="play-icon-zone" v-if="showPlayer">
        <img src="./image/p1_icon_play.png"
             :class="{'playing': isPlaying}" @click.stop="goToPlay($event.target)">
      </div>
    <transition :name="pageTrans|| 'fade'" appear>
        <component :is="`report${componentId}`"
                   v-model="quickAttention"
                   @changeComponent="changeComponent"
                   @reloadDataFn = "init"
                   @goAddAttention = "goAddAttention"
                   class="report-2017-children"
                   :class="{'report-2017-showUp': showUp}"
                   :isSelf="isSelf"
                   :screenHw="oStyle"
                   :info = componentInfo
                   :isLoading = 'isLoading'
                   :staticData = "staticData"
        />
    </transition>
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
  import children from './children.js';
  import Ajax from './Api.js';
  import { BrowserUtil } from '@/utils';
  export default {
      data() {
          return {
              changePageTrans: ['fade', 'scale', 'bottom', 'top'],
              pageTrans: 'fade',
              componentId: 0, // 当前显示的页面索引
              dataList: {}, // 接口总数据
              $rem: parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 0, // 页面的rem
              startPage: 0, // 数据起始页
              isSetTouchObj: {}, // 页面手势对象
              isLoading: 0, // 是否在加载中
              componentInfo: {}, // 每个页面的数据
              timerNum: false, // 数据进度定时器
              isGetData: false, // 是否获得数据
              musicPlayer: '', // 播放容器
              isPlaying: false, // 是否播放
              quickAttention: [1], // 是否批量关注
              isNotPlayed: true,
              isFromApp: BrowserUtil.isFormApp(),
              oStyle: {
                  h: document.documentElement.clientHeight || window.screen.availHeight,
                  w: document.documentElement.clientWidth || window.screen.availWidth
              }
          };
      },
//      beforeRouteEnter(t, f, n) {
//        /**
//         * 作者:[yangbin]
//         * 时间: 2018/1/18 16:15
//         * 功能介绍：页面进入拦截
//         * 参数：
//         */
//          let loginUid = store.infos && store.infos.uid && Number(store.infos.uid) ? Number(store.infos.uid) : 0;
//          alert(store.infos.uid);
//          let getUid = t.query && t.query.uid && Number(t.query.uid) ? Number(t.query.uid) : 0;
//          alert(getUid);
//          if (getUid === 0 && loginUid) {
//              n({name: t.name, query: Object.assign({}, t.query, {uid: loginUid})});
//          } else if (getUid === 0 && loginUid === 0) {
//              n('/');
//          } else {
//              n();
//          }
//      },
      components: children.getPonents(),
      computed: {
          loginUid() {
              let u = this.$store.state.user;
              return u && u.infos.uid && Number(u.infos.uid) ? Number(u.infos.uid) : 0; // 登录用户id
          },
          getUid() {
              return this.$route.query && this.$route.query.uid && Number(this.$route.query.uid) ? Number(this.$route.query.uid) : 0; // 查询数据的用户i;
          },
          queryPage() {
              return this.$route.query && this.$route.query.typ && Number(this.$route.query.typ) ? Number(this.$route.query.typ) : 0;
          },  // 数据直接访问页
          staticData() {
              return children[`page${this.componentId + 1}`];
          },
          isSelf() {
              return this.loginUid > 0 && (this.loginUid === this.getUid);
          },
          showUp() {
              let hw = this.oStyle.h / this.oStyle.w;
              return (this.componentId < 10 && this.isLoading >= 100 && !(hw < 1.51 && this.componentId === 0));
          },
          showPlayer() {
              return this.componentId !== 11;
          }
      },
      watch: {
          isLoading(v) {
              this.oStyle = {
                  h: document.documentElement.clientHeight || window.screen.availHeight,
                  w: document.documentElement.clientWidth || window.screen.availWidth
              };
              this.$rem = parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 0; // 页面的rem
              if (typeof v === 'number' && v >= 100) {
                  this.isLoading = 100;
                  this.componentId = this.startPage <= this.queryPage ? this.queryPage : this.startPage;
                  this.musicPlayer.src = '/static/mp3/report2017.mp3';
                  this.musicPlayer.play();
              }
          },
          componentId(v) {
              this.componentInfo = this.getComponentInfo(v);
          },
          $route() {
              this.checkedUrlFn();
          }
      },
      created() {
          window.report2017Vue = this;
//          window.m$.documentTitle('你的2017源音塘专属年报')
          this.setBgMusic();
          children.setGoPlayAction(this);
          if (this.loginUid === 0 && this.isFromApp) {
              Ajax.getTags().then(() => {
                  this.checkedUrlFn();
              }).catch(() => {
                  this.checkedUrlFn();
              });
          } else {
              this.checkedUrlFn();
          }
      },
      methods: {
          goLogin() {
              let param = { funcName: 'gotoLogin' };
              this.callAppFunction('gotoLogin', param);
          },
          checkedUrlFn() {
              if ((this.loginUid || this.isFromApp) && (this.getUid !== this.loginUid)) {
                  this.$router.replace({name: this.$route.name, query: Object.assign({}, this.$route.query, {uid: this.loginUid})});
              } else if (this.getUid === 0 && this.loginUid === 0) {
                  if (this.isFromApp) {
                      this.setTimerFn(false);
                      this.isLoading = 'login';
                      this.goLogin();
                  } else {
                      this.$router.replace('/');
                  }
              } else {
                  this.init();
              }
          },
          goAddAttention() {
            /**
             * 作者:[yangbin]
             * 时间: 2018/1/18 16:16
             * 功能介绍：在11页的是一件关注
             * 参数：
             */
              let a = this.getComponentInfo(9);
              if (this.loginUid > 0 && this.quickAttention.length > 0 && !a.noInfo && Object.prototype.toString.call(a) === '[object Array]') {
                  Ajax.followAllUser(a.map((o) => {
                      return o.id;
                  }).toString());
              }
          },
          getComponentInfo(p) {
            /**
             * 作者:[yangbin]
             * 时间: 2018/1/18 16:16
             * 功能介绍：获取每页相关数据
             * 参数：p 要获取那一夜的数据
             */
              p = Number(p) === p ? Number(p) : this.componentId;
              let pageKey = children.infoData[`page${p + 1}`];
              let o = {};
              if (pageKey !== false) {
                  o = '';
                  if (pageKey.length) {
                      o = Object.assign({}, this.dataList ? this.dataList : {});
                      let keys = pageKey.split('.');
                      keys.map((i) => {
                          o = Boolean(o[i]) === true ? o[i] : '';
                      });
                  }
                  o.length === 0 && (o = {noInfo: true});
              }
              return o;
          },
          goToPlay(e) {
            /**
             * 作者:[yangbin]
             * 时间: 2018/1/18 16:17
             * 功能介绍：播放控制
             * 参数：
             */
              if (!this.musicPlayer) { return; }
              this.isPlaying = this.musicPlayer.paused;
              if (this.musicPlayer.paused) {
                  this.musicPlayer.play();
              } else {
                  this.musicPlayer.pause();
                  this.setPlayerImgCircle(e);
              }
          },
          setPlayerImgCircle(e) {
              let iTransform = window.getComputedStyle(e).transform;
              let cTransform = window.getComputedStyle(e.parentNode).transform;
              e.parentNode.style.transform = cTransform === 'none'
                  ? iTransform
                  : iTransform.concat(' ', cTransform);
          },
          init() {
              this.isGetData = false;
              this.timerNum = false;
              this.isLoading = 0;
              this.getAllData();
              this.setTimerFn();
          },
          setTimerFn(o) {
            /**
             * 作者:[yangbin]
             * 时间: 2018/1/18 16:17
             * 功能介绍：进度模拟函数
             * 参数：
             */
              this.timerNum && (window.clearInterval(this.timerNum), this.timerNum = false);
              if (o === false || (typeof this.isLoading !== 'number')) { return; };
              let s = 50; let limit = 78; let canTimer = true;
              if (this.isGetData) {
                  s = 10;
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
          changeComponent(o, h) {
              if (typeof o === 'number') {
                  let p = (Boolean(h) === true ? h : this.componentId) + o;
                  p = p < 0 ? 0 : p > 11 ? 11 : p;
                  if (this.getComponentInfo(p).noInfo) {
                      this.changeComponent(o, p);
                  } else {
                      this.pageTrans = this.changePageTrans[parseInt(Math.random() * this.changePageTrans.length)];
                      this.componentId = parseInt(p);
                  }
              }
          },
          getAllData() {
              if (window.navigator && !window.navigator.onLine) {
                  this.$toast && this.$toast.error && this.$toast.error('请打开网络连接！');
                  this.setTimerFn(false);
                  this.isLoading = false;
                  return;
              }
              Ajax.getReport2017Data(this.getUid).then((res) => {
                  this.dataList = res.data || {};
                  this.isGetData = true;
                  this.componentInfo = this.getComponentInfo();
                  !res.code && (this.startPage = 10);
                  this.setTouchFn();
                  this.setTimerFn();
                  this.$share({
                      title: '2017,我的源音塘专属音乐报告', // 分享标题
                      link: window.location.href, // 分享链接
                      imgUrl: window.location.origin + '/static/imgs/activity/2017/report2017.jpg', // 分享图标
                      desc: '点击查看，我与源音塘的亲密故事'
                  });
              }).catch(() => {
                  this.setTimerFn(false);
                  this.isLoading = false;
              });
          },
          setTouchFn() {
              this.isSetTouchObj = children.setTouch(document.getElementById('activity-report-2017'), () => {
                  this.isLoading >= 100 && this.componentId < 10 && this.changeComponent(1);
              }, () => {
                  this.isLoading >= 100 && this.startPage < this.componentId && this.componentId < 11 && this.changeComponent(-1);
              }, 30, true, 60, false);
          },
          setBgMusic(src) {
              let a = document.getElementById('yyt-music-report2017');
              if (!this.musicPlayer || !/^audio$/i.test(this.musicPlayer.tagName)) {
                  if (a) {
                      this.musicPlayer = a;
                  } else {
                      this.musicPlayer = document.createElement('audio');
                      this.musicPlayer.loop = true;
                      this.musicPlayer.volume = 1;
                      this.musicPlayer.id = 'yyt-music-report2017';
                  }
              }
              arguments.length && (this.musicPlayer.src = src || '');
              this.musicPlayer.onplay = () => {
                  this.isNotPlayed = false;
                  this.musicPlayer.volume = 1;
                  this.isPlaying = !this.musicPlayer.paused;
                  console.log();
              };
              !a && document.body.appendChild(this.musicPlayer);
          }
      },
      beforeDestroy() {
          this.isSetTouchObj.destroy && this.isSetTouchObj.destroy();
          this.musicPlayer && document.body.removeChild(this.musicPlayer);
          this.setTimerFn(false);
      }
  };
</script>
<style lang="less" scoped>
  @import "./less/animate.less";
  @import './less/index.less';
</style>
