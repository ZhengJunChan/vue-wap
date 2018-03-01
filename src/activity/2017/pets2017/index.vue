<template>
  <!-- 宠物 -->
  <div class="pets_box">
    <!-- 头图 -->
    <div class="pets_banner">
      <img src="./img/pet_topimg.jpg" alt="">
    </div>
    <!-- 活动时间说明 -->
    <ul class="pets_time" v-if="activityTime">
      <li>
        <p>投稿时间</p>
        <p v-text="timeFormart(activityTime.c_start_date) + '~' + timeFormart(activityTime.c_end_date)"></p>
      </li>
      <li>
        <p>用户投票</p>
        <p v-text="timeFormart(activityTime.start_date) + '~' + timeFormart(activityTime.end_date)"></p>
      </li>
      <li>
        <p>结果公布</p>
        <p v-text="timeFormart(activityTime.publish_start_date)" v-if="timeFormart(activityTime.publish_start_date)===timeFormart(activityTime.publish_end_date)"></p>
        <p v-text="timeFormart(activityTime.publish_start_date) + '~' + timeFormart(activityTime.publish_end_date)" v-else></p>
      </li>
    </ul>
    <!-- 结果公布部分 -->
    <div class="pets_result" v-if="prizeResult&&prizeResult.length>0">
      <pets-box title="结果公布">
        <!-- 表格标题 -->
        <ul class="table_head">
         <li class="table_one">奖项</li>
         <li class="table_two">获奖人</li>
         <li class="table_there">获奖作品</li>
        </ul>
        <ul class="table_content">
          <li v-for="(item, index) in prizeResult" :key="index">
            <p class="table_one" v-text="item.prize_name"></p>
            <p class="table_two">
              <!-- 头像 -->
              <span :style="{'backgroundImage': `url(${item.head_link}/37/37)`}" @click="goSingerDetail(item.uid)">
                <img src="./img/head_v.png" alt="vip" v-if="item.vip==1">
              </span>
              <span v-text="item.nickname" @click="goSingerDetail(item.uid)"></span>
            </p>
            <p class="table_there" @click="goMusicDetail(item.item_id)">
              <span v-text="item.title"></span>
            </p>
          </li>
        </ul>
      </pets-box>
    </div>
    <div class="pets_br" v-if="prizeResult&&prizeResult.length>0">
      <img src="./img/pets_heng.png" alt="横条">
    </div>
    <!-- 参赛方式 -->
    <div class="pets_introduce">
      <pets-box title="活动介绍">
        <p class="introduce_msg">
          奇幻萌宠养成日志《幻宠大陆》主题曲翻唱大赛开启,<br>
          年轻的梦想，冒险的旅途，<br>
          在这片奇幻大陆，来一场声音的际遇！幻宠奇缘，音你邂逅！<br>
          《幻宠大陆》手游9月13日奇缘测试火热开启，现在邂逅萌宠，<br>
          <span>开启你的冒险之旅：http://pets.haowanyou.com/</span>
        </p>
        <!-- 曲目下载 -->
        <div class="music_download">
          <p>
            <span>翻唱曲目下载</span>
            <span>【幻宠大陆主题曲】幻宠奇缘——临暗iZumi</span>
          </p>
          <div class="download_box">
            <div @click="playMusic(5453)" class="play_btn">
                <img src="./img/play_one.png" alt="">
                <span>播放</span>
            </div>
            <p>登录网页版可下载伴奏和歌词哦~</p>
          </div>
        </div>
        <!-- 上传作品按钮 -->
        <div class="work_remind">
          <img src="./img/icon_tips.png" alt="">
          <span>请在网页版上传作品哦</span>
        </div>
      </pets-box>
    </div>
    <div class="pets_br" id="search">
      <img src="./img/pets_heng.png" alt="横条">
    </div>
    <!-- 搜索结果列表 -->
    <div class="pets_search" v-if="firstSearchEmpty">
      <div class="search-box">
        <input type="text" placeholder="搜索" v-model="searchData.title" @keyup.enter="searchInput">
        <div class="search_btn">
          <img src="./img/search_btn.png" alt="" @click="searchInput">
        </div>
      </div>
      <div class="search_nav">
        <ul class="search_condition">
          <li :class="{'active': searchData.order=='create_time-desc'}" @click="searchOrder('create_time-desc')">按时间</li>
          <li :class="{'active': searchData.order=='vote_count-desc'}" @click="searchOrder('vote_count-desc')">按人气</li>
          <li :class="{'active': searchData.order=='rand-desc'}" @click="searchOrder('rand-desc')">随机刷新</li>
          <li v-if="userInfo === 'true'" class="vote_num">您当前剩余{{votesNum}}票</li>
        </ul>
      </div>
      <!-- 搜索结果显示 -->
      <div class="search_count" v-if="munFlg">找到{{pagination.totalCount}}个结果</div>
      <ul class="search_list">
        <li v-for="(item, index) in searchLists" :key="index">
          <div class="list_head" :style="{'backgroundImage': `url(${item.imgpic_link}/210/240)`}" @click="goMusicDetail(item.id)">
            <div class="head_id">NO.{{item.id}}</div>
            <div class="head_title">
              <img src="./img/pause.png" height="42" width="43" @click.stop="playMusic(item)" v-if="playId === item.id">
              <img src="./img/play_two.png" @click.stop="playMusic(item)" v-else>
              <p v-text="item.title" @click.stop="goMusicDetail(item.id)"></p>
              <p class="singer_msg">
                <span class="singer_head" :style="{'backgroundImage': `url(${item.head_link}/60/60)`}" @click.stop="goSingerDetail(item.uid)">
                  <img src="./img/head_v.png" alt="vip" v-if="item.vip==1">
                </span>
                <span v-text="item.nickname" @click.stop="goSingerDetail(item.uid)"></span>
              </p>
            </div>
          </div>
          <div class="list_vote">
            <span v-text="item.vote_count + '票'"></span>
            <span @click="searchVote(item)">+1票</span>
          </div>
        </li>
      </ul>
      <!-- 搜索结果为空 -->
      <div v-if="searchEmpty" class="search_empty">
        <img src="./img/search_enpty.png" alt="">
        <p>没有结果呢，让TA来参与吧 ~</p>
      </div>
      <!-- 分页 -->
      <div class="pets_page" v-show="pagination.pageCount > 1 && searchData.order!='rand-desc'">
        <page-box :options="paginationOptions" :pagination="pagination" :callback="getlistData" :scrollTo="true"></page-box>
      </div>
    </div>
    <!-- 参赛方式 -->
    <div class="pets_competition_mode">
      <pets-box title="参赛方式">
        <ul>
          <li>1、录制翻唱歌曲（参赛指定曲目）→登陆源音塘个人主页→   点击上传作品→填写好歌曲相关信息→参赛成功。</li>
          <li>2、参赛作品需为参赛指定曲目：【幻宠大陆主题曲】，翻唱作品可采用官方歌词或自由创作歌词。</li>
          <li>3、参赛曲目命名格式【幻宠大陆主题曲翻唱】+作品信息。</li>
          <!--<li>4、每人只能投稿一次。如投稿多次，以第一次投稿为准。</li>-->
        </ul>
        <p>小贴士：亲爱的选手，请您在参加比赛的同时，保留一份参赛作品的干声。这将会避免很多不必要的质疑和纠纷哦~</p>
      </pets-box>
    </div>
    <div class="pets_br">
      <img src="./img/pets_heng.png" alt="横条">
    </div>
    <!-- 参赛需知 -->
    <div class="pets_know">
      <pets-box title="注意事项">
        <ul>
          <li>1、所提交翻唱作品的参赛者，须为参与翻唱歌曲创作的人员，且参与翻唱歌曲的创作成员需要周知作品用途。</li>
          <li>2、参赛选手可投稿多首作品，但仅可获奖一次，以最高档奖项进行发放，其他奖项顺延其他参赛音乐人投稿作品。</li>
          <li>3、作品不得违反国家法律法规，不得盗用，剽窃，抄袭他人作品，不得过渡宣传色情，暴力血腥等不良内容。参赛作品不得侵犯第三方知识产权和专利，参赛选手请保证作品已获得其他版权所有者的授权，如有违反由参赛者全权负责，与主办方无关。</li>
          <li>4、参赛作品版权归作者与《幻宠大陆》共同所有，已经投稿则视为允许主办方在活动相关专题，官网，新闻，微博，微信等推广中署名宣传。</li>
          <li>5、大赛奖品为整首歌曲的奖品，如有合作完成，由参赛团队自主平均分配，如产生纠纷与主办方无关，所有奖励将在结果公布后陆续发放，因个人原因未能成功领取奖品，则视为放弃奖品。</li>
          <li>6、现金奖励为税后金额，个人所得税已由《幻宠大陆》手游官方代为交纳。</li>
          <li>7、豪华游戏礼包将在下次游戏测试前发放。</li>
          <li>8、奖项评定是按照人气进行评定。</li>
          <li>9、本次活动禁止刷票，情节严重者取消参赛资格。</li>
          <li>10、本次大赛最终解释权归幻宠大陆手游&源音塘所有。</li>
        </ul>
        <p>请认真阅读以上条款，提交作品即表示同意并遵守以上条款。</p>
      </pets-box>
    </div>
    <div class="pets_br">
      <img src="./img/pets_heng.png" alt="横条">
    </div>
    <!-- 奖品 -->
    <div class="pets_prize">
      <pets-box title="奖品">
        <div class="prize_list">
          <img src="./img/pets_prize.png" alt="">
        </div>
        <ul class="list_main">
          <!--1-->
          <li>
            <img src="./img/prize1.png" alt="">
            <p>现金1500元</p>
            <p>《幻宠大陆》主题曲翻唱大赛奖杯<br>
              幻宠大陆纪念周边<br>
              豪华游戏礼包</p>
          </li>
          <!--2-->
          <li>
            <img src="./img/prize2.png" alt="">
            <p>现金1000元</p>
            <p>《幻宠大陆》主题曲翻唱大赛奖杯 <br>
              幻宠大陆纪念周边<br>
              豪华游戏礼包</p>
          </li>
          <!--3-->
          <li>
            <img src="./img/prize3.png" alt="">
            <p>富士拍立得 </p>
            <p>《幻宠大陆》主题曲翻唱大赛奖杯<br>
              幻宠大陆纪念周边<br>
              豪华游戏礼包</p>
          </li>
          <!--4-->
          <li>
            <img src="./img/prize4.png" alt="">
            <p>200元京东卡</p>
            <p>《幻宠大陆》主题曲翻唱大赛奖杯<br>
              幻宠大陆纪念周边<br>
            </p>
          </li>
        </ul>
      </pets-box>
    </div>
    <div class="pets_br">
      <img src="./img/pets_heng.png" alt="横条">
    </div>
    <!-- 主办方 -->
    <div class="pets_sponsor">
      <pets-box title="主办方">
        <div class="sponsor_list">
          <img src="./img/pets_sponsor1.png" alt="">
          <img src="./img/pets_sponsorl2.png" alt="">
        </div>
      </pets-box>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { mapState } from 'vuex';
  import petsApi from './pets-api';
  import petsBox from './petbox/index.vue';
  import { BrowserUtil, RouterUtil } from '@/utils';
  import pageBox from '@/components/pagination/index.vue';
  export default {
      components: {
          petsBox,
          pageBox
      },
      data() {
          return {
              activityTime: '', // 活动时间
              prizeResult: '', // 获奖列表
              searchLists: '', // 搜索列表
              votesNum: '', // 剩余票数
              userInfo: '', // 登录状态
              voting: '', // 投票操作中
              munFlg: false, // 搜索后数量显示
              searchEmpty: false, // 搜索为空
              firstSearchEmpty: 0, // 首次加载
              pagination: {
                  totalCount: 0,
                  perPage: 10,
                  currentPage: 1,
                  pageCount: 20
              },
              paginationOptions: {
                  offset: 2,
                  alwaysShowPrevNext: false,
                  scroll: {
                      x: 0,
                      y: 0
                  }
              },
              searchData: {
                  'alias': 'pets2017',
                  'order': 'create_time-desc',
                  'title': '',
                  'p': 1,
                  'row': 6
              }
          };
      },
      methods: {
          getlistData() {
              this.searchData.p = this.pagination.currentPage;
              this.paginationOptions.scroll.y = document.getElementById('search').getElementTop();
              petsApi.searchList(this.searchData).then(res => {
                  if (res.code === 200) {
                      this.searchLists = res.data;
                  }
              });
          },
          /* 当前剩余投票数量 */
          remainingVotes() {
              petsApi.getTicket({alias: 'pets2017'}).then(res => {
                  if (res.code === 200) {
                      this.votesNum = res.data.ticket_count;
                  }
              });
          },
          /* 格式化时间 */
          timeFormart(value) {
              let data1 = value.split(' ')[0].replace(/-/g, '.');
              return data1;
          },
          /* 获取活动时间列表 */
          getActivity() {
              let self = this;
              petsApi.activityList({alias: 'pets2017'}).then(res => {
                  if (res.code === 200) {
                      self.activityTime = res.data;
                  }
              });
          },
          /* 获奖作品 */
          getActivityRes() {
              petsApi.activityResult({alias: 'pets2017'}).then(res => {
                  if (res.code === 200) {
                      this.prizeResult = res.data;
                  }
              });
          },
          /* 搜索结果列表 */
          getSearchList(val) {
              this.searchData.p = 1;
              this.pagination.currentPage = 1;
              petsApi.searchList(this.searchData).then(res => {
                  if (res.code === 200) {
                      this.searchLists = res.data;
                      this.pagination = res.page;
                      if (val === 1) {
                          this.firstSearchEmpty = this.searchLists.length === 0 ? 0 : 1;
                      } else {
                          if (this.searchLists.length === 0) {
                              this.searchEmpty = true;
                          } else {
                              this.searchEmpty = false;
                          }
                      }
                  }
              });
          },
          /* 投票操作 */
          searchVote(item) {
              if (this.userInfo === 'false' || !this.userInfo) {
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
              petsApi.activityVotes({'item_id': item.id, 'alias': 'pets2017'}).then(res => {
                  if (res.code === 200) {
                      this.voting = false;
                      item.vote_count++;
                      this.votesNum = res.data ? res.data : 0;
                      this.$toast.error(res.msg);
                  }
              }).catch(err => {
                  this.remainingVotes();
                  this.voting = false;
                  this.$toast.error(err.msg);
              });
          },
          /* 点击搜索分类 */
          searchOrder(objs) {
              this.munFlg = false;
              this.searchData.order = objs;
              if (objs === 'rand-desc') {
                  this.searchData.title = '';
              }
              this.getSearchList();
          },
          /* 点击搜索按钮 */
          searchInput() {
              this.munFlg = true;
              this.searchData.order = 'create_time-desc';
              this.getSearchList();
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
          /* 进入音乐详情 */
          goMusicDetail(id) {
              let param = {'songID': id};
              this.callAppFunction('gotoMusic', param);
          },
          /* 点击进入音乐人详情 */
          goSingerDetail(id) {
              let param = {'userID': id};
              this.callAppFunction('gotoUser', param);
          },
          weiXinLogin() {
              let params = {
                  type: 'wx',
                  returnUrl: window.location.href
              };

              petsApi.thirdLogin(params).then((res) => {
                  RouterUtil.go(res.data, this.$router);
              });
          }
      },
      computed: {
          ...mapState({
              userInfo: state => state.user.isLogined,
              playId: state => !state.player.playing.song.pause && state.player.playing.song.id
          })
      },
      created() {
          /* 当前票数 */
          if (this.userInfo) {
              this.remainingVotes();
          }
      },
      mounted() {
          /* 调用活动列表 */
          this.getActivity();
          /* 获奖作品 */
          this.getActivityRes();
          /* 搜索列表 */
          this.getSearchList(1);
      }
  };
</script>
<style lang="less" scoped>
  @import './index.less';
</style>
