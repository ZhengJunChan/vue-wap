<template>
  <div class="entries_box">
    <!--搜索tab切换条-->
    <div class="search_tab">
      <ul v-if="actClass">
        <li  :class="{'active':post_data.cover_lx==''}"  @click="goToOrder('')"><span>全部分区</span></li>
        <li v-for="(item, index) in actClass" :class="{'active':post_data.cover_lx== item.id}" @click="goToOrder(item.id)"><span v-text="item.name"></span></li>
      </ul>
    </div>
    <!--剩余票数-->
    <div class="remainde_vote" v-if="userInfo">您当前剩余<span>{{ticketCount}}</span>票</div>
    <div class="search_way">
     <span :class="{'active':'create_time-desc'==post_data.order}"  @click="changeOrder('create_time-desc')">按时间</span>
     <span :class="{'active':'counts-desc'==post_data.order}"  @click="changeOrder('counts-desc')">按人气</span>
     <span :class="{'active':post_data.order=='rand-desc'}"  @click="changeOrder('rand-desc')">随机刷新</span>
     <!--<span>按人气</span>-->
     <!--<span>随机刷新</span>-->
      <div class="search_content">
        <img src="./img/search_box.png" alt="">
        <img src="./img/icon_search.png" alt="" class="search_icon y_c">
        <input type="text" placeholder="搜索作品/作者名/作品号" v-model="post_data.title" @keyup.enter="webSearch">
        <span @click="webSearch">搜索</span>
      </div>
    </div>
    <!--搜索结果列表-->
    <div class="search_result">
      <ul>
        <li v-for='(item, index) in searchLists'>
          <div class="go_detail x_c" @click="goMusicDetail(item.id)"></div>
          <img class="x_c play_music" @click="playMusic(item)" :src="playId === item.id ? imgs.pause : imgs.play">
          <div class="list_box">
            <div class="result_box">
              <div class="result_msg">
                <p v-html="item.title" @click="goMusicDetail(item.id)"></p>
                <p v-html="item.nickname" @click="goSingerDetail(item.uid)"></p>
                <div class="button_vote" @click.stop="searchVote(item)">+1</div>
                <p>{{item.vote_count}}票</p>
              </div>
            </div>
            <div class="head_box x_c" :style="{'backgroundImage': `url(${item.imgpic_link}/${withds}/${withds})`}">
                <div class="head_name">NO.{{item.id}}</div>
            </div>
          </div>
        </li>
      </ul>
      <p class="no_data" v-if="lastData">没有更多东西啦</p>
    </div>
    <!--没有结果-->
    <div class="no_result" v-if="noData">
      <img src="./img/img_user_gedannone.png" alt="">
      <p>什么也没找到〒▽〒</p>
    </div>
  </div>
</template>
<script type="text/javascript">
  import imgs from './data.js';
  import { mapState } from 'vuex';
  import entriesApi from './entries-api';
  import ActivityApi from './../../../activity-api.js';
  import { BrowserUtil, RouterUtil } from '@/utils';
  export default {
      data() {
          return {
              imgs,
              actClass: '', // 活动分类
              ticketCount: '', // 剩余票数
              searchLists: '', // 搜索结果
              scrollStatus: false, // 滚动状态
              lastData: false, // 最后数据显示
              noData: false, // 没有数据的时候
              voting: '', // 投票操作中
              withds: Math.round(166 / 2),
              post_data: {
                  'alias': 'autumnvote2017',
                  'cover_lx': '',
                  'order': 'create_time-desc',
                  'title': '',
                  'p': 1,
                  'row': 12
              }
          };
      },
      computed: {
          ...mapState({
              userInfo: state => state.user.isLogined,
              playId: state => !state.player.playing.song.pause && state.player.playing.song.id
          })
      },
      created() {
          /* 剩余票数调用 */
          if (this.userInfo) {
              this.getTickets();
          }
      },
      mounted() {
          var self = this;
          /* 活动分类 */
          self.activityClasss();
          /* 结果列表 */
          self.activityMusic();
          document.addEventListener('scroll', self.listScroll);
      },
      beforeRouteLeave(to, from, next) {
          document.removeEventListener('scroll', this.listScroll);
          next();
      },
      methods: {
          /* 点击进入音乐人详情 */
          goSingerDetail(id) {
              let param = {'userID': id};
              this.callAppFunction('gotoUser', param);
          },
          /* 进入音乐详情 */
          goMusicDetail(id) {
              let param = {'songID': id};
              this.callAppFunction('gotoMusic', param);
          },
          /* 点击播放 */
          playMusic(musicInfos) {
              if (BrowserUtil.isFormApp()) {
                  let param = {'songID': musicInfos.id};
                  this.callAppFunction('playMusic', param);
              } else {
                  let params = {
                      music: musicInfos
                  };

                  this.$store.dispatch('playSong', params);
              }
          },
          /* 音乐搜索 */
          webSearch() {
              this.post_data.p = 1;
              this.post_data.order = 'create_time-desc';
              this.lastData = false;
              this.noData = false;
              this.activityMusic();
          },
          redSearchKey(data) {
              let index = 0;
              let key = this.post_data.title;
              if (!key) {
                  return;
              }
              for (; index < data.length; index++) {
                  if (data[index].title.indexOf(key)) {
                      data[index].title = data[index].title.split(key).join(`<span style=color:#ff5a66;>${key}</span>`);
                  }
                  if (data[index].nickname.indexOf(key)) {
                      data[index].nickname = data[index].nickname.split(key).join(`<span style=color:#ff5d66;>${key}</span>`);
                  }
              }
              return data;
          },
          /* 活动分类 */
          activityClasss() {
              entriesApi.activityClass({'alias': 'autumnvote2017'}).then(res => {
                  if (res.code === 200) {
                      this.actClass = res.data;
                  }
              });
          },
          /* 活动音乐 */
          activityMusic() {
              let self = this;
              entriesApi.searchList(this.post_data).then(res => {
                  let datas = res.data;
                  if (res.code === 200) {
                      self.searchLists = datas;
                      if (self.post_data.title !== '') {
                          self.redSearchKey(self.searchLists);
                      }
                      if (datas.length > 0) {
                          self.scrollStatus = true;
                      } else {
                          self.scrollStatus = false;
                      }
                      if (datas.length === 0) {
                          self.noData = true;
                      }
                  }
              });
          },
          /* 专区分类搜索 */
          goToOrder(objs) {
              this.post_data.cover_lx = objs;
              this.post_data.order = 'create_time-desc';
              this.post_data.p = 1;
              this.lastData = false;
              this.noData = false;
              this.post_data.title = '';
              this.getTickets();
              this.activityMusic();
          },
          /* 投票操作 */
          searchVote(item) {
              if (!this.userInfo) {
                  if (BrowserUtil.isFormWeiXin()) {
                      this.weiXinLogin();
                      return;
                  }

                  if (BrowserUtil.isFormApp()) {
                      let param = {'funcName': 'gotoLogin', 'params': {}};
                      this.callAppFunction('gotoLogin', param);
                      return;
                  }

                  RouterUtil.go('https://wap.yuanyintang.com/down.html', this.$router);
                  return;
              }
              if (this.voting) {
                  this.$toast.error('您的操作次数过快');
                  return;
              }
              this.voting = true;
              entriesApi.activityVotes({'item_id': item.id, 'alias': 'autumnvote2017'}).then(res => {
                  if (res.code === 200) {
                      this.voting = false;
                      item.vote_count++;
                      this.ticketCount = res.data ? res.data : 0;
                      this.$toast.error(res.msg);
                  }
              }).catch(err => {
                  this.getTickets();
                  this.voting = false;
                  this.$toast.error(err.msg);
              });
          },
          /* 时间操作搜索 */
          changeOrder(key) {
              this.post_data.order = key;
              this.post_data.p = 1;
              this.lastData = false;
              this.noData = false;
              if (key === 'rand-desc') {
                  this.post_data.title = '';
              }
              this.activityMusic();
          },
          /* 获取剩余票数 */
          getTickets() {
              entriesApi.getTicket({'alias': 'autumnvote2017'}).then(res => {
                  if (res.code === 200) {
                      this.ticketCount = res.data.ticket_count;
                  }
              }).catch(err => {
                  this.$toast.error(err.msg);
              });
          },
          /* 上拉加载 */
          listScroll() {
              let self = this;
              var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
              if (self.scrollStatus) {
                  if (document.documentElement.scrollHeight === document.documentElement.clientHeight + scrollTop) {
                      self.scrollStatus = false;
                      self.post_data.p = this.post_data.p + 1;
                      entriesApi.searchList(this.post_data).then(res => {
                          let dataList = [];
                          if (res.code === 200) {
                              if (self.post_data.title !== '') {
                                  dataList = self.redSearchKey(res.data);
                              } else {
                                  dataList = res.data;
                              }

                              self.searchLists = self.searchLists.concat(dataList);

                              if (res.data.length < 12) {
                                  self.lastData = true;
                                  return;
                              }
                              setTimeout(function () {
                                  self.scrollStatus = true;
                              }, 0);
                          }
                      });
                  }
              }
          },
          weiXinLogin() {
              let params = {
                  type: 'wx',
                  returnUrl: window.location.href
              };

              ActivityApi.thirdLogin(params).then((res) => {
                  RouterUtil.go(res.data, this.$router);
              });
          }
      }
  };
</script>
<style lang="less" scoped>
  @import './index.less';
</style>
