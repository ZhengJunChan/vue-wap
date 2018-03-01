<template>
  <div class="introduction_box">
    <!--活动简介时间-->
    <div class="intro_time" v-if="activityTime">
      <ul>
        <li>
          <span>01</span>
          <div class="time_detail">
            <p>活动时间</p>
            <p v-text="getTime(activityTime.active_start_date) + '-' + getTime(activityTime.active_end_date)"></p>
          </div>
        </li>
        <li>
          <span>02</span>
          <div class="time_detail">
            <p>作品征集</p>
            <p v-text="getTime(activityTime.c_start_date) + '-' + getTime(activityTime.active_end_date)"></p>
          </div>
        </li>
        <li>
          <span>03</span>
          <div class="time_detail">
            <p>投票时间</p>
            <p v-text="getTime(activityTime.start_date) + '-' + getTime(activityTime.end_date)"></p>
          </div>
        </li>
        <li>
          <span>04</span>
          <div class="time_detail">
            <p>公布结果</p>
            <p v-text="getTime(activityTime.publish_start_date) + '-' + getTime(activityTime.publish_end_date)"></p>
          </div>
        </li>
      </ul>
    </div>
    <!--活动简介第二板块-->
    <div class="intro_base">
      <ul>
        <li>
          <p class="title">
            <img src="./img/img_diwen.png" alt="">
            <img src="./img/jiangli.png" alt="丰厚奖励">
          </p>
          <p class="content">丰厚现金奖励，多个奖项环节设置，提升获奖机率。特设周评环节，歌迷互动应援。</p>
        </li>
        <li>
          <p class="title">
            <img src="./img/img_diwen.png" alt="">
            <img src="./img/baoguang.png" alt="曝光机会">
          </p>
          <p class="content">海量曝光机会，享受源音塘现有媒介资源推送。优秀获奖音乐人将在平台的商业合作中被优先推荐。</p>
        </li>
        <li>
          <p class="title">
            <img src="./img/img_diwen.png" alt="">
            <img src="./img/canyan.png" alt="参演邀请">
          </p>
          <p class="content">优秀参赛音乐人将获得源音塘线下演唱会参演邀请。豪华音乐盛典，直面万千粉丝，多家媒体强势打造，下一个Super Star就是你!</p>
        </li>
        <li>
          <p class="title">
            <img src="./img/img_diwen.png" alt="">
            <img src="./img/peiyang.png" alt="丰厚奖励">
          </p>
          <p class="content">参赛音乐人享受“源音塘音乐人培养计划”福利，将获作品播放量奖励、版权合作机会、源音塘版权作品演唱及使用机会等!</p>
        </li>
      </ul>
    </div>
    <!--活动简介第三板块-->
    <div class="intro_words">
        <p>
          歌迷通过投票、评论、点赞、转发等形式支持喜爱的音乐人，也可获得丰厚奖励。转发源音塘置顶活动微博即可参与福利抽奖。奖品包含音乐人周边、源音塘秘制福袋、抱枕、汉服和日系主题服装、零食大礼包、源小伊周边等惊喜礼品。
        </p>
    </div>
    <!--活动简介第四板块评委阵容-->
    <div class="intro_judges">
      <div class="title">评委阵容</div>
      <div class="judge_msg" v-for="(item,index) in judgeList">
        <div class="judge_name" @click="goDtial(item.id)">{{item.name}}</div>
        <div class="judge_intro">
          <p>{{item.title}}</p>
          <p v-html="item.content"></p>
        </div>
        <div class="judge_head">
          <img :src="item.head" alt="" @click="goDtial(item.id)">
          <div class="judge_work">
            <p> 代表作：</p>
            <ul>
              <li v-for="(item,index) in item.work">{{item}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--活动简介第五板块活动奖励-->
    <div class="intro_judges intro_reward">
      <div class="title">活动奖励</div>
      <div class="reward_content">
        <ul>
          <li>
            <p class="reward_name">ACG</p>
            <div class="reward_list y_c">
              <p>金奖1名:¥ 3000元</p>
              <p>优秀奖3名:¥ 1000元</p>
              <p>人气奖3名:¥ 500元</p>
            </div>
            <img src="./img/agg.png" alt="" class="reword_agg">
          </li>
          <li>
            <p class="reward_name">社团</p>
            <div class="reward_list y_c">
              <p>最佳社团奖1名:¥ 2500元</p>
              <p>人气奖3名:¥ 800元</p>
            </div>
            <img src="./img/shetuan.png" alt="">
          </li>
          <li>
            <p class="reward_name">原创</p>
            <div class="reward_list y_c">
              <p>金奖1名:¥ 2000元 </p>
              <p>优秀奖3名:¥ 1000元</p>
              <p>人气奖3名:¥ 500元</p>
            </div>
            <img src="./img/yuanchuang.png" alt="">
          </li>
          <li>
            <p class="reward_name">翻唱</p>
            <div class="reward_list y_c">
              <p>金奖1名:¥ 1500元 </p>
              <p>优秀奖3名:¥ 800元</p>
              <p>人气奖2名:¥ 500元</p>
            </div>
            <img src="./img/fanchang.png" alt="">
          </li>
        </ul>
      </div>
    </div>
    <!--第六板块活动说明-->
    <introList :introList="descriptionList"></introList>
    <!--第七版块合作伙伴-->
    <div class="intro_judges intro_partner">
      <div class="title">合作伙伴</div>
      <div class="partner_list">
        <img :src="item.pic_link" alt="伙伴" v-for="(item, index) in advertisement">
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {infoJudgesData, descriptionDetail} from './data'; //  引入数据
  import titleTab from '@/components/intro-cell/title.vue';
  import introList from '@/components/intro-cell/detail.vue';
  import introApi from './intro-api';
  export default {
      components: {
          titleTab,
          introList
      },
      data() {
          return {
              judgeList: infoJudgesData,
              descriptionList: descriptionDetail,
              advertisement: '',
              activityTime: ''
          };
      },
      mounted() {
          this.getAdver();
          this.getActivitys();
      },
      methods: {
          goDtial(id) {
              let param = param = {'userID': id};
              this.callAppFunction('gotoUser', param);
          },
          getAdver() {
              introApi.getAdvertisement({alias: 'autumnvote2017'}).then(res => {
                  if (res.code === 200) {
                      this.advertisement = res.data;
                  };
              });
          },
          getActivitys() {
              introApi.getActivity({alias: 'autumnvote2017'}).then(res => {
                  if (res.code === 200) {
                      this.activityTime = res.data;
                  }
              });
          },
          getTime(vaule) {
              let data1 = vaule.split(' ')[0].split('-')[1];
              let data2 = vaule.split(' ')[0].split('-')[2];
              let data3 = data1.split('')[0] > 0 ? data1 : data1.split('')[1];
              let datas = data3 + '月' + data2 + '日';
              return datas;
          }
      }
  };
</script>
<style lang="less" scoped>
  @import './index.less';
</style>
