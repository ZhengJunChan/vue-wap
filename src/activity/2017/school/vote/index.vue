<template>
  <div class="vote_page">
    <div class="header">
        <ul class="times">
            <li>
                <p>投稿时间</p>
                <p v-html="date.collectTime"></p>
            </li>
            <li>
                <p>投票时间</p>
                <p v-html="date.voteTime"></p>
            </li>
            <li>
                <p>结果公布</p>
                <p v-html="date.prizeTime"></p>
            </li>
        </ul>
    </div>

    <!-- 获奖结果 -->
    <div class="reasults module" v-if="prizeWorks.length">
        <div class="module_title">
            <img src="./../imgs/img_title_jieguo.png">
        </div>

        <div class="item jin_ji" v-for="area in prizeWorks[0].pcate">
          <p class="title">
            <span v-text="area.prize_name"></span>
          </p>

          <div>
              <div class="musican" v-for="music in area.prize">
                <header-img class="musican_header" :size="137" :header-img="music.head_link" :headerId="music.uid"></header-img>
                <p class="singer_name text_nowrap_ellipsis">
                  <span @click="goSingerDetail(music.uid)" v-html="music.nickname"></span>
                </p>
                <p class="vote_num">{{Number(music.activity_count)}}票</p>
              </div>
          </div>
        </div>
    </div>
    <!-- / 获奖结果 -->

    <!-- 参赛作品 -->
    <div class="works module" v-if="dataList.length">
        <div class="module_title">
            <img src="./../imgs/img_title_zuoping.png">
        </div>

        <div class="works_box">
          <div class="work" v-for="(music, index) in dataList">
          <div class="cover" :style="{backgroundImage: `url(${music.imgpic_link}/176/140)`}" @click="goMusicDetail(music.id)">
            <div class="serial" v-text="music.activity_serial"></div>

            <p class="music_name text_nowrap_ellipsis" v-html="music.title"></p>
          </div>

          <p class="singer_name text_nowrap_ellipsis" @click="goSingerDetail(music.uid)">
           <img :src="`${music.head_link}/26/26`">
           {{music.nickname}}</p>

           <div class="vote_btn">
             <img src="./../imgs/img_yijinji.png" v-if="music.activity_status">
             <button @click="voteMusic(music)" v-else>+ 1</button>
           </div>

           <p class="vote_num">{{music.activity_count}}票</p>
          </div>
        </div>
    </div>
    <!-- / 参赛作品 -->

    <!-- 评委阵容 -->
    <div class="rater">
      <img src="./../imgs/img_pingwei.jpg">
    </div>
    <!-- / 评委阵容 -->

    <!-- 比赛说明 -->
    <div class="activity_intro module">
        <div class="module_title">
            <img src="./../imgs/img_title_shuoming.png">
        </div>

      <div class="content">
        <div class="border">
          <div>
            <div class="title">
              <span>参赛方式</span>
            </div>
            <ul class="rules">
              <li v-html="intro.way"></li>
            </ul>
          </div>

          <div>
            <div class="title">
              <span>规则说明</span>
            </div>
            <ul class="rules">
              <li v-html="intro.instruction"></li>
            </ul>
          </div>

          <div>
            <div class="title">
              <span>注意事项</span>
            </div>
            <ul class="rules">
              <li v-html="intro.watchful"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- / 比赛说明 -->

    <!-- 合作伙伴 -->
    <div class="partner module" v-if="frendLinks.length">
        <div class="module_title">
            <img src="./../imgs/img_title_huoban.png">
        </div>

      <ul class="clear_float">
        <li v-for="link in frendLinks" class="fl">
          <a :href="link.url">
            <img :src="link.pic_link+'/130/70'" :title="link.title">
          </a>
        </li>
      </ul>
    </div>
    <!-- / 合作伙伴 -->
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';
import SchoolApi from './vote-api.js';
import { BrowserUtil, RouterUtil } from '@/utils';

import { HeaderImg } from '@/components';

export default {
    components: {
        HeaderImg
    },
    data() {
        return {
            userInfo: '',
            frendLinks: [],
            musicList: [],
            prizeWorks: [],
            date: {
                activeTime: '', // 活动开始时间
                collectTime: '', // 活动投稿时间
                voteTime: '', // 活动投票时间
                prizeTime: '' // 结果公布时间
            },
            intro: {
                way: '',
                instruction: '',
                watchful: ''
            },
            remainTickets: {
                remainNum: 0,
                loginedApp: false,
                appNum: 5
            }
        };
    },
    mounted() {
        // 获取活动时间
        this.getActityTime();
        // 获取获奖作品
        this.getPrizeWorks();
        // 获取参赛作品
        this.getMusicList();
        // 获取友情链接
        this.getFrendlyLink();
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.isLogined
        }),
        dataList() {
            var len = this.musicList.length;

            for (var i = 0; i < len; i++) {
                for (var j = 0; j < len - 1 - i; j++) {
                    if (Number(this.musicList[j].activity_serial) > Number(this.musicList[j + 1].activity_serial)) {
                        var temp = this.musicList[j + 1];
                        this.musicList[j + 1] = this.musicList[j];
                        this.musicList[j] = temp;
                    }
                }
            }

            return this.musicList;
        }
    },
    methods: {
        getActityTime() {
            SchoolApi.getActityTime().then((res) => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }
                this.intro.way = res.data.mode;
                this.intro.instruction = res.data.singing;
                this.intro.watchful = res.data.rule;

                this.date.voteTime = this.getDateRange(res.data.start_date, res.data.end_date);
                this.date.collectTime = this.getDateRange(res.data.c_start_date, res.data.c_end_date);
                this.date.activeTime = this.getDateRange(res.data.active_start_date, res.data.active_end_date);
                this.date.prizeTime = this.getDateRange(res.data.publish_start_date, res.data.publish_end_date);
            }, (error) => {
                this.$toast.error(error.msg);
            });
        },
        getDateRange(start, end) {
            end = this.getDate(end);
            start = this.getDate(start);

            if (start === end) {
                return start;
            }

            return start + '-' + end;
        },
        getDate(date) {
            let time = date.split(' ')[0];

            return time.replace(/-/g, '.');
        },
        getPrizeWorks() {
            SchoolApi.getPrizeWorks().then((res) => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.prizeWorks = res.data;
            }, (error) => {
                this.$toast.error(error.msg);
            });
        },
        goMusicDetail(id) {
            if (BrowserUtil.isFormApp()) {
                let param = {'songID': id};
                this.callAppFunction('gotoMusic', param);
            } else {
                RouterUtil.go('/music/' + id, this.$router);
            }
        },
        goSingerDetail(id) {
            if (BrowserUtil.isFormApp()) {
                let param = {'userID': id};
                this.callAppFunction('gotoUser', param);
            } else {
                RouterUtil.go('/singer/' + id, this.$router);
            }
        },
        getMusicList() {
            let params = {
                p: 1,
                row: 20
            };

            SchoolApi.getMusicList(params).then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.musicList = res.data;
            }, (error) => {
                this.$toast.error(error.msg);
            });
        },
        voteMusic(music) {
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

            let params = {
                item_id: music.id
            };

            if (this.voting) {
                this.$toast.error('您的操作次数过快');
            };

            this.voting = true;

            SchoolApi.vote(params).then((res) => {
                this.voting = false;

                this.$toast.error(res.msg);
                if (res.code !== 200) {
                    return;
                }

                music.activity_count++;
                this.remainTickets.remainNum = res.data || 0;
            }, (error) => {
                this.voting = false;
                this.$toast.error(error.msg);
            });
        },
        /**
         * [getFrendlyLink 获取友情链接]
         * @Author   郑君婵
         * @DateTime 2017-08-31
         */
        getFrendlyLink() {
            SchoolApi.getFrendlyLink().then((res) => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.frendLinks = res.data;
            }, (error) => {
                this.$toast.error(error.msg);
            });
        },
        weiXinLogin() {
            let params = {
                type: 'wx',
                returnUrl: window.location.href
            };

            SchoolApi.thirdLogin(params).then((res) => {
                RouterUtil.go(res.data, this.$router);
            });
        }
    }
};
</script>

<style lang="less" scoped>
  @import './main.less';
</style>
