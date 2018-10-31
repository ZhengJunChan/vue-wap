<template>
  <div class="home_page">
  	<div class="main_top">
  		<div class="main_desc">
  			HELLO，<span class="point">音乐人</span>！还记得什么时候入的音乐坑吗？<br>
  			还记得当时和伙伴一起创造出第一首歌的激动吗？<br>
  			在追逐的路上有哪些艰辛的过程，<br>
  			又是什么让你坚持下来的呢？<br>
  			小音乐大梦想，让音乐的路上不孤独，我们一直伴你左右<br>
  			<span class="point">源音塘两周年</span>特别企划，<span class="point">为音乐发声</span>，<br>
  			艾特所有唱见、曲作、词作、混音、画师……<br>
  			分享你的<span class="point">音乐故事</span>，成为激励他人前行的微光，<br>
  			更有<span class="point">千元梦想助力金</span>为你加油~
  		</div>

      <div class="times">
        <div class="item" v-html="$parent.activity.date.collectTime">10.22-10.31</div>
        <div class="item" v-html="$parent.activity.date.voteTime">10.22-10.31</div>
        <div class="item" v-html="$parent.activity.date.prizeTime">10.22-10.31</div>
      </div>
  	</div>

    <div class="list">
      <img class="title_img" src="./../../imgs/img-liuyanban-title.png" onclick="return false">

      <div class="purple_box qiang">
        <div class="inner box">
          <div class="items clear_float">
            <div class="item" v-for="item in list" :key="item.number">
              <div class="no" v-text="item.number"></div>
              <div class="singer_label text_nowrap_ellipsis">
                <div class="header" @click="goSingerPage(item.uid)"
                :style="{backgroundImage: `url(${$fixImg(item.head_info ? item.head_info.link : item.head_link, 'w=80&h=80')})`}"></div>
                <span v-text="item.nickname" @click="goSingerPage(item.uid)"></span>
              </div>
              <div class="text">
                <div class="content" @click="goSoundDetailPage(item.id)" v-text="fixContent(item.content)"></div>
              </div>
              <div class="btn_label clear_float">
                <div class="btn fl gaobai" @click="discuss(item)">
                  <span class="text_icon" v-text="item.comment_times || '告白'"></span>
                </div>
                <div class="btn fr share" @click="share(item, searchPrizeCount)">
                  <span class="text_icon" v-text="item.share_counts ? item.share_counts_text : '分享'"></span>
                </div>
              </div>
              <div class="btn zan" @click="vote(item, searchPrizeCount)">
                <span class="text_icon" v-text="item.ticket_times || '点赞'"></span>
              </div>
            </div>
          </div>

          <div class="clear_float bottom_label">
            <div class="fl btn" @click="showMessageAlert" :style="{width: '3.2rem'}" v-if="!$parent.activity.isEndVote">我要发声></div>
            <div class="fr btn" @click="goListPage" :style="{width: $parent.activity.isEndVote ? '100%' : '3.2rem'}">查看更多></div>
          </div>
          <!-- <div class="item""> -->
        </div>
      </div>

      <div class="purple_box rule">
        <div class="inner box" v-for="(item, index) in $parent.activity.rule_list" :key="index" v-html="item.content" v-if="item.alias === 'desc'">
        </div>
      </div>
    </div>

    <div class="prize_setting" :class="winnerList.length && 'winner_top'">
      <div class="title">
        <img class="title_img" src="./../../imgs/img-prize-title.png" onclick="return false">
      </div>
      <div class="prize_list">
        <div>
          <img class="item first" src="./../../imgs/img-prize-no1.png" onclick="return false">
        </div>
        <div class="items">
          <img class="item sec" src="./../../imgs/img-prize-no2.png" onclick="return false">
          <img class="item third" src="./../../imgs/img-prize-no5.png" onclick="return false">
        </div>
      </div>
    </div>
    <div class="winner" v-if="winnerList.length">
      <div class="title">
        <img class="title_img" src="./../../imgs/img-winners-title.png" onclick="return false">
      </div>
      <div class="items clear_float">
        <div class="item" v-for="(item, index) in winnerList" :key="index">
          <div class="number" v-text="item.pcate_name"></div>
          <div class="info">
            <div class="header" @click="goSingerPage(item.uid)"
                :style="{backgroundImage: `url(${$fixImg(item.head_info ? item.head_info.link : item.head_link, 'w=80&h=80')})`}"></div>
            <div>
              <p class="name text_nowrap_ellipsis" v-text="item.nickname" @click="goSingerPage(item.uid)"></p>
              <p class="no">NO:{{item.number}}</p>
            </div>
          </div>
          <div class="text">
            <div class="content" @click="goSoundDetailPage(item.id)" v-text="fixContent(item.content)"></div>
          </div>
          <div class="zan">
            <span class="text_icon" v-text="item.ticket_times || '点赞'"></span>
          </div>
        </div>
      </div>
    </div>

    <div class="shoujiang">
      <div>
        <img class="draw" src="./../../imgs/img-prizedraw-title.png" onclick="return false">
      </div>
      <div class="box">
        <div class="text_desc">
          琥珀虚颜二次元智能机器人、BEATS耳机、<br>
          YSL口红等你来拿；参与点赞即可获得1次抽奖机会<br>
          分享活动页面可再获得1次抽奖机会
        </div>

        <div class="draw_panel">
          <table class="luck_draw">
              <tbody>
                  <tr>
                      <td class="item" :class="{'active': luckDraw.index === 0}">
                          <div>
                              <div class="img_box" :style="{backgroundImage: `url(${prizeList[0] && prizeList[0].imgpic_info.link})`}"></div>
                              <p class="name text_nowrap_ellipsis" v-text="prizeList[0] && prizeList[0].title"></p>
                          </div>
                      </td>
                      <td class="item" :class="{'active': luckDraw.index === 1}">
                          <div>
                              <div class="img_box" :style="{backgroundImage: `url(${prizeList[1] && prizeList[1].imgpic_info.link})`}"></div>
                              <p class="name text_nowrap_ellipsis" v-text="prizeList[1] && prizeList[1].title"></p>
                          </div>
                      </td>
                      <td class="item" :class="{'active': luckDraw.index === 2}">
                          <div>
                              <div class="img_box" :style="{backgroundImage: `url(${prizeList[2] && prizeList[2].imgpic_info.link})`}"></div>
                              <p class="name text_nowrap_ellipsis" v-text="prizeList[2] &&  prizeList[2].title"></p>
                          </div>
                      </td>
                  </tr>
                  <tr>
                      <td class="item" :class="{'active': luckDraw.index === 7}">
                          <div>
                              <div class="img_box" :style="{backgroundImage: `url(${prizeList[7] && prizeList[7].imgpic_info.link})`}"></div>
                              <p class="name text_nowrap_ellipsis" v-text="prizeList[7] &&  prizeList[7].title"></p>
                          </div>
                      </td>
                      <td class="item run_btn"  @click="getPrize">
                             <p class="min_tip">戳我戳我</p>
                             <p class="point">抽奖</p>
                      </td>
                      <td class="item" :class="{'active': luckDraw.index === 3}">
                          <div>
                              <div class="img_box" :style="{backgroundImage: `url(${prizeList[3] && prizeList[3].imgpic_info.link})`}"></div>
                              <p class="name text_nowrap_ellipsis" v-text="prizeList[3] &&  prizeList[3].title"></p>
                          </div>
                      </td>
                  </tr>
                  <tr>
                      <td class="item" :class="{'active': luckDraw.index === 6}">
                          <div>
                              <div class="img_box" :style="{backgroundImage: `url(${prizeList[6] && prizeList[6].imgpic_info.link})`}"></div>
                              <p class="name text_nowrap_ellipsis" v-text="prizeList[6] &&  prizeList[6].title"></p>
                          </div>
                      </td>
                      <td class="item" :class="{'active': luckDraw.index === 5}">
                          <div>
                              <div class="img_box" :style="{backgroundImage: `url(${prizeList[5] && prizeList[5].imgpic_info.link})`}"></div>
                              <p class="name text_nowrap_ellipsis" v-text="prizeList[5] &&  prizeList[5].title"></p>
                          </div>
                      </td>
                      <td class="item" :class="{'active': luckDraw.index === 4}">
                          <div>
                              <div class="img_box" :style="{backgroundImage: `url(${prizeList[4] && prizeList[4].imgpic_info.link})`}"></div>
                              <p class="name" v-text="prizeList[4] &&  prizeList[4].title"></p>
                          </div>
                      </td>
                  </tr>
              </tbody>
          </table>
        </div>
        <div class="link_label">
          <img class="btn_link" src="./../../imgs/img_choujiang_link.png" onclick="return false">
          <img class="btn_link" src="./../../imgs/img_choujiang_link.png" onclick="return false">
        </div>
        <div class="prize_box">
            <div class="title">获奖名单</div>
            <div class="notice_box" id="scrollBox">
                <div>
                    <p v-for="user in prizeUsers">恭喜  {{user.nickname}}  通过抽奖获得了  {{user.title}}  </p>
                </div>
            </div>
        </div>

        <div class="btn_label">
          <div class="btn" @click="goPrizePage">中奖记录</div>
          <div class="btn" @click="goPrizeRulePage">活动规则</div>
        </div>
      </div>
    </div>

    <!--   /  抽奖弹框  -->
    <alert-panel :title="panel.title" v-model="panel.isOpen" :btn-text="panel.btnText" :content="panel.content" @sureClick="panel.sureClick"></alert-panel>
  </div>
</template>

<script type="text/javascript">
// import $ from 'jquery';
import methods from './../../methods.js';
import Api from './../../spring-api.js';

import { BrowserUtil, RouterUtil, CommonUtil } from '@/utils';
import AlertPanel from './../../components/alert-panel';

export default {
    components: {
        AlertPanel
    },
    data() {
        return {
            list: [],
            luckDraw: {
                running: false, // 正在转动转盘
                index: -1, // 当前转动到哪个位置，起点位置
                count: 8, // 总共有多少个位置
                timer: 0, // setTimeout的ID，用clearTimeout清除
                speed: 20, // 初始转动速度
                times: 0, // 转动次数
                cycle: 50, // 转动基本次数：即至少需要转动多少次再进入抽奖环节
                prize: -1,    // 中奖位置
                roll: this.rollLuckDraw,
                stop: this.stopLuckDraw
            },
            prizeBtn: {
                isFromAPP: BrowserUtil.isFormApp(),
                count: 0
            },
            // 被抽中的奖品
            luckPrize: {
                accepting: false,
                playcounts: 0,
                sharenum: 0
            },
            panel: {
                isOpen: false,
                title: '',
                content: '',
                btnText: '',
                sureClick() {}
            },
            prizeUsers: [],
            winnerList: []
        };
    },
    computed: {
        prizeList() {
            return this.$parent.activity.lottery_info.reward_list;
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            // 获取作品列表
            this.getEntries();
            // 获取作品列表
            this.getWinning();
            // 获取所有中奖用户
            this.getPrizeUsers();
            // // 获取抽奖次数
            this.$parent.isLogined && this.searchPrizeCount();
        },
        /**
         * [getEntries 获取作品列表]
         * @Author   郑君婵
         * @DateTime 2018-01-05
         */
        getEntries() {
            let params = {
                p: 1,
                row: 4,
                order: 'ticket_times-desc'
            };

            Api.getEntries(params).then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.list = res.data;
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        goSoundDetailPage(id) {
            RouterUtil.go(`/activity/sound/detail?id=${id}`, this.$router);
        },
        goSingerPage(id) {
            RouterUtil.go(`/singer/${id}`, this.$router);
        },
        goListPage() {
            RouterUtil.go(`/activity/sound/list`, this.$router);
        },
        getPrizeUsers() {
            Api.getPrizeUsers().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.prizeUsers = res.data;
                this.falseData();
                this.$nextTick(() => {
                    this.scrolleList();
                });
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        /**
         * [falseData 运营说要弄点假数据，不然抽中的全是甜甜圈！]
         * [description]
         *
         * @author 郑君婵
         * @email    zhengjunchan@qq.com
         * @DateTime 2018-10-25
         */
        falseData() {
            let index = 0;
            let temp = [{
                nickname: '酷****7',
                title: '10元现金红包'
            }, {
                nickname: '小****真子',
                title: '可爱水杯'
            }, {
                nickname: '門***',
                title: '源小伊抱枕'
            }, {
                nickname: '咚***通',
                title: 'YSL口红'
            }];

            temp.map(item => {
                index = CommonUtil.getRandom(0, this.prizeUsers.length - 1);
                this.prizeUsers.splice(index, 0, item);
            });
        },
        scrolleList() {
            var area = document.getElementById('scrollBox');
            var time = 70;
            area.innerHTML += area.innerHTML;
            area.scrollTop = 0;

            function scrollMove() {
                area.scrollTop++;
                setInterval(scrollUp, time);
            }

            function scrollUp() {
                area.scrollTop++;
                if (area.scrollTop >= area.scrollHeight / 2) {
                    // 判断滚动高度,当滚动高度大于area本身的高度时，使其回到原点重新滚动
                    area.scrollTop = 0;
                }
            }

            setTimeout(scrollMove, 2000);
        },
        /**
         * [requirePrizeCount 查询用户剩余抽奖次数]
         * @Author   郑君婵
         * @DateTime 2018-01-04
         */
        searchPrizeCount() {
            Api.searchPrizeCount().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }
                this.prizeBtn.count = res.data.counts || 0;
                this.luckPrize.sharenum = res.data.sharenum || 0;
                this.luckPrize.playcounts = res.data.playcounts || 0;
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        // 抽奖
        getPrize() {
            if (this.isEndActivity() || !this.isLogined() || this.luckDraw.running) {
                return;
            }

            this.luckDraw.running = true;

            let params = {
                chance_id: ''
            };

            Api.getScreenWinningPrize(params).then(res => {
                this.luckPrize = res.data;
                this.run();
                this.searchPrizeCount();
            }, error => {
                this.luckDraw.running = false;

                if (error.code === 400 && error.data) {
                    this.shareEmptyTip(error.data.share_can_get);
                    return;
                }

                this.$toast.error(error.msg);
            });
        },
        // 不可抽奖提示弹框
        shareEmptyTip(count) {
            this.panel.isOpen = true;
            this.panel.title = '已经没有抽奖机会了';
            this.panel.content = count ? `看你这么可爱，只要在APP分享活动就可再获得${count}次抽奖机会哟~` : `真的没有抽奖机会咯，灰灰~`;
            this.panel.btnText = '好的';
            this.panel.sureClick = this.closeAlert;
        },
        // 停止转动转盘九宫格
        run() {
            this.luckDraw.speed = 100;
            this.luckDraw.roll();
        },
        // 转动转盘九宫格
        rollLuckDraw() {
            this.luckDraw.times++;
            this.luckDraw.index++;

            if (this.luckDraw.index > this.luckDraw.count - 1) {
                this.luckDraw.index = 0;
            }

            if (this.luckDraw.times > this.luckDraw.cycle + 10 && this.luckDraw.prize === this.luckDraw.index) {
                this.luckDraw.stop();
            } else {
                if (this.luckDraw.times < this.luckDraw.cycle) {
                    this.luckDraw.speed -= 10;
                } else if (this.luckDraw.times === this.luckDraw.cycle) {
                    this.setLuckDraw();
                } else {
                    if (this.luckDraw.times > this.luckDraw.cycle + 10 &&
                        ((this.luckDraw.prize === 0 && this.luckDraw.index === 7) || this.luckDraw.prize === this.luckDraw.index + 1)) {
                        this.luckDraw.speed += 110;
                    } else {
                        this.luckDraw.speed += 20;
                    }
                }

                if (this.luckDraw.speed < 40) {
                    this.luckDraw.speed = 40;
                }

                this.luckDraw.timer = setTimeout(this.rollLuckDraw, this.luckDraw.speed); // 循环调用
            }

            return false;
        },
        // 设置中奖索引
        setLuckDraw() {
            let prizeId = this.luckPrize.id;

            for (let index = 0; index < this.prizeList.length; index++) {
                if (this.prizeList[index].id === prizeId) {
                    this.luckDraw.prize = index;

                    return false;
                }
            }
        },
        // 停止转动转盘九宫格
        stopLuckDraw() {
            clearTimeout(this.luckDraw.timer);

            this.luckDraw.prize = -1;
            this.luckDraw.times = 0;
            this.luckDraw.running = false;
            this.prizeBtn.count && this.prizeBtn.count--;

            setTimeout(() => {
                this.setAlert();
            }, 1000);
        },
        // 设置弹框
        setAlert() {
            let type = Number(this.luckPrize.type);
            this.panel.isOpen = true;
            if (type < 4) {
                this.panel.title = '恭喜中奖';
                this.panel.btnText = '立即领取';
            }

            // 抽到虚拟奖品或实际奖品
            if (type === 1 || type === 2) {
                this.panel.sureClick = this.goInputAddrPage;

                this.panel.content = `您抽到了${this.luckPrize.title}<br>赶紧填写资料领取`;
            }

            // 抽到甜甜圈
            if (type === 3) {
                this.panel.content = `哇欧皇诞生！<br>恭喜中得甜甜圈${this.luckPrize.t_number}个`;
                this.panel.sureClick = () => {
                    this.acceptTianTianQuan(this.luckPrize);
                };
            }

            // 未中奖
            if (type === 4) {
                this.panel.title = '什么都没有';
                this.panel.content = this.luckPrize.remark || '别灰心，换个姿势手气更好';
                this.panel.btnText = '好的';
                this.panel.sureClick = this.closeAlert;
            }
        },
        closeAlert() {
            this.panel.isOpen = false;
        },
        goInputAddrPage() {
            this.$parent.goInputAddrPage(this.luckPrize);
        },
        goPrizeRulePage() {
            if (this.luckDraw.running) {
                return;
            }

            let param = {
                url: `${this.$parent.activity.baseUrl}/rule/prize`,
                title: '抽奖规则'
            };

            this.$parent.goPage(param);
        },
        goPrizePage() {
            if (this.isEndActivity() || !this.isLogined() || this.luckDraw.running) {
                return;
            }

            let param = {
                url: `${this.$parent.activity.baseUrl}/prize`,
                title: '中奖记录'
            };

            this.$parent.goPage(param);
        },
        acceptTianTianQuan(prize) {
            this.$parent.acceptTianTianQuan(prize, () => {
                this.panel.isOpen = false;
            });
        },
        /**
         * [getWinning 获奖作品]
         * @Author   郑君婵
         * @DateTime 2018-01-05
         */
        getWinning() {
            Api.getWinning().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.winnerList = res.data;
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        ...methods
    }
};
</script>

<style type="text/css" lang="less" scoped>
  @import './main.less';
  // @import './../../common.css';
</style>
