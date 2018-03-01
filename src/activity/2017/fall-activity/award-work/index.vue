<template>
  <div class="prize_work">
    <div class="list_one" v-for="(item, index) in autumnWorkList">
      <titleTab :title="item.name"></titleTab>
      <div v-for="(item, index) in item.pcate">
        <div class="prize_name">{{item.prize_name}}</div>
        <p v-html="item.intro"> </p>
        <!--列表内容-->
        <div class="work_list">
          <!--分类-->
          <ul>
            <li v-for="(item, index) in item.prize">
              <div class="go_detail" @click="goMusicDetails(item.item_id)"></div>
              <div class="result_box">
                <div class="result_msg">
                  <p @click="goMusicDetails(item.item_id)">{{item.title}}</p>
                  <p>
                    <span @click="goSingerDetails(item.uid)">{{item.nickname}}</span>
                    <span>{{item.vote_counts}}票</span>
                  </p>
                </div>
              </div>
              <div class="head_box x_c" :style="{'backgroundImage': `url(${item.imgpic_link}/${withds}/${withds})`}">
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--每周-->
    <div class="list_two">
    <ul>
      <div class="list_item" v-for="(item, index) in autumnWeekList">
        <titleTab :title="item.prize_name" class="list_title"></titleTab>
        <li v-for="(item, index) in item.prize">
          <div class="go_detail" @click="goMusicDetails(item.item_id)"></div>
          <div class="result_box">
            <p>{{item.class_name}}</p>
            <div class="result_msg">
              <p @click="goMusicDetails(item.item_id)">{{item.title}}</p>
              <p>
                <span @click="goSingerDetails(item.uid)">{{item.nickname}}</span>
                <span>{{item.vote_counts}}票</span>
              </p>
            </div>
          </div>
          <div class="head_box x_c" :style="{'backgroundImage': `url(${item.imgpic_link}/${withdWeek}/${withds})`}">
          </div>
        </li>
      </div>
    </ul>
    </div>
    <!--没有结果展示-->
    <div class="no_result" v-if="requirCount==2">
      <div>
        <img src="./img/img_down_yichang.png" alt="">
        <p>还没有公布获奖作品</p>
      </div>
      <!--<div class="public_btn" @click="goUploadMusic">赶紧去发布</div>-->
    </div>
  </div>
</template>
<script type="text/javascript">
  import { mapState } from 'vuex';
  import workApi from './work-api';
  import titleTab from '@/components/intro-cell/title.vue';
  export default {
      components: {
          titleTab
      },
      data() {
          return {
              autumnWorkList: '', // 专区获奖列表
              autumnWeekList: '', // 周奖伙计列表
              requirCount: 0,
              withds: Math.round(165 / 2),
              withdWeek: Math.round(182 / 2)
          };
      },
      computed: {
          ...mapState({
              userInfo: state => state.user.isLogined
          })
      },
      mounted() {
          var self = this;
          self.workList();
          self.weekList();
      },
      methods: {
        /* 获奖专区列表 */
          workList() {
              let self = this;
              workApi.getFallWork({'alias': 'autumnvote2017'}).then(res => {
                  if (res.code === 200) {
                      self.autumnWorkList = res.data;
                      if (self.autumnWeekList.length === 0) {
                          self.requirCount++;
                      }
                  }
              });
          },
        /* 获奖周列表 */
          weekList() {
              let self = this;
              workApi.getWeeklWork({'alias': 'autumnvote2017'}).then(res => {
                  if (res.code === 200) {
                      self.autumnWeekList = res.data;
                      if (self.autumnWeekList.length === 0) {
                          self.requirCount++;
                      }
                  }
              });
          },
        /* 点击进入音乐人详情 */
          goSingerDetails(id) {
              let param = {'userID': id};
              this.callAppFunction('gotoUser', param);
          },
//        /* 进入音乐详情 */
          goMusicDetails(id) {
              let param = {'songID': id};
              this.callAppFunction('gotoMusic', param);
          }
          /* 去发布音乐 */
//          goUploadMusic() {
//              if (this.userInfo === 'false') {
//                /* 跳转到登录 */
//                  let param = {};
//                  this.callAppFunction('gotoLogin', param);
//                  return;
//              }
//              this.callAppFunction('goUploadMusic', {});
//          }
      }
  };

</script>
<style lang="less" scoped>
  @import './index.less';
</style>
