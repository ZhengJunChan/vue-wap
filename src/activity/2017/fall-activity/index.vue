<template>
  <div class="fall_activity_page">
    <!--秋季活动warp顶部-->
    <div class="nav_top">
      <!--大图片banner-->
      <img src="./img/bj_banner.png" alt="banner">
      <!--banner图片说明-->
      <div class="n_c nav_explain">
        <p>无音乐不梦想，属于你的闪光时刻!</p>
        <p>让创作不孤单，让音乐更音乐，让世界听到你的</p>
        声音!
        <p>自源音塘“音乐人培养计划”上线以来，源酱与</p>
        音乐人朋友们在多个领域尝试共同突破。也许我们<br>
        现在还不是那个完美的自己，但是有了你们，源酱<br>
        有勇气大胆的不断前行。<br>
        <p>源音塘秋日祭音乐会正式启动！丰富大赛奖励、</p>
        海量曝光机会、商业合作推荐，源酱在这里等着<br>
        你！
      </div>
    </div>
    <!--<img src="./img/bj_fengye_.png" alt="枫叶" class="nav">-->
    <!--导航切换部分-->
    <div class="nav_switch">
      <ul>
        <li class="nav_box" @click="goToPage({name:item.name,query:$route.query})" v-for="(item, index) in tabItem" :class="{active:$route.name==item.name}" :key="index">{{item.title}}</li>
        <!--<router-link tag="li" class="nav_box" :to="{path: '/fallactivity/rule'}" :class="{'active':flg}" @click="tabCheck(index)">活动规则</router-link>-->
      </ul>
    </div>
    <router-view></router-view>
    <!--活动页面尾部-->
    <div class="fall_footer"></div>
  </div>
</template>
<script type="text/javascript">

  export default {
      data() {
          return {
              msg: '',
              tabItem: [
                  {
                      title: '活动简介',
                      name: 'fallActivity',
                      path: '/autumnvote2017'
                  },
                  {
                      title: '活动规则',
                      name: 'ruleActivity',
                      path: '/fallactivity/rule'
                  },
                  {
                      title: '参赛作品',
                      name: 'entriesActivity',
                      path: '/fallactivity/works'
                  },
                  {
                      title: '获奖作品',
                      name: 'workActivity',
                      path: '/fallactivity/great-works'
                  }
              ]
          };
      },
      methods: {
          goToPage(o) {
              this.$router.replace(o);
          }
      }
  };
</script>
<style lang="less" scoped>
  @import './index.less';
</style>
