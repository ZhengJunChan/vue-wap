<template>
    <div class="gather-page-sound">

      <gatherBgItem >
          <div class="page-content">
              <div class="header-warp" :style="{'backgroundImage': `url(${info.member_info&&info.member_info.head_link?info.member_info.head_link+'/90/90':''})`}" @click="goUser(info.member_info.id)">
                <img src="./../../img/icon_newyear_v.png" v-if="info.member_info&&info.member_info.is_music==3">
              </div>
              <p class="user-name" v-text="info.member_info&&info.member_info.nickname? info.member_info.nickname:''"></p>
              <p class="title">给你送来了新年祝福</p>
              <div class="svg-content-zone">
                    <div class="is-play-status" v-if="isPlaying&&canPlayClick">
                      <div class="c c1">
                        <div class="circle" :style="{
                          animationDuration: `${time.toFixed(3)}s`,
                          webkitAnimationDuration:`${time.toFixed(3)}s`
                        }"></div>
                        <svg class="line"
                             viewBox="0, 0, 370, 370"
                             xmlns="http://www.w3.org/2000/svg"
                             >
                          <defs>
                            <linearGradient x1="1" y1="0" x2="0" y2="0" id="gradient1" >
                              <stop offset="0%"
                                    stop-color="rgba(255, 61, 71, 0)"></stop>
                              <stop offset="8%" stop-color="rgba(255, 61, 71, 1)"></stop>
                              <stop offset="100%" stop-color="rgba(255, 61, 71, 1)"></stop>
                            </linearGradient>
                          </defs>

                          <g transform="rotate(-90 185 185)" class="dasharray1">
                          <circle cx="185" cy="183" r="182" stroke="url('#gradient1')"
                          stroke-width="6" fill="none"
                                  :stroke-dasharray="`0,${halfRCircle}`">
                            <animate attributeName="stroke-dasharray" begin="0s" :values="`0,${halfRCircle};${halfRCircle/2},${halfRCircle}`" :dur="`${(time/2).toFixed(3)}s`"
                                     repeatCount="1"  fill="freeze"></animate>
                          </circle>
                          </g>
                          <g transform="rotate(90 185 185)" v-if="percent>=0.5" class="dasharray2">
                          <circle cx="185" cy="183" r="182" stroke="#ff3d47"
                          stroke-width="6" fill="none"
                                  :stroke-dasharray="`0,${halfRCircle}`">
                            <animate attributeName="stroke-dasharray" :begin="`${(time/2).toFixed(3)}s`" :values="`0,${halfRCircle};${halfRCircle/2},${halfRCircle}`" :dur="`${(time/2).toFixed(3)}s`"
                                     repeatCount="1" fill="freeze"></animate>
                          </circle>
                          </g>
                        </svg>
                      </div>
                      <div class="status-content">
                        <p class="title">Time</p>
                        <p class="time">
                          <span>{{Math.ceil(time - currentTime)||0}}</span>
                        </p>
                        <div class="after-warp">
                          <div class="shadow"></div>
                            <div class="left">
                              <img class="l1" src="./../../img/img_move_down.png"/>
                              <img class="l2" src="./../../img/img_move_down.png"/>
                            </div>
                            <div class="right">
                              <img class="r1" src="./../../img/img_move_on.png"/>
                              <img class="r2" src="./../../img/img_move_on.png"/>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div class="is-paused-status" v-else>
                      <div class="c c1"></div>
                      <div class="c c2"></div>
                      <div class="c c3"></div>
                      <div class="status-content">
                        <img src="./rings.svg" v-if="!canPlayClick&&isFirstLoad">
                        <img src="./../../img/icon_newyear_play.png" @click="goPlay(true)" v-else>
                      </div>
                    </div>
              </div>
            <div class="button-warp">
                <button class="can-button" type="button" @click="goThisShare" v-if="isFromApp">
                  分享祝福
                </button>
                <button class="can-button" type="button" @click="openApp" v-else>
                  开启我的祝福
                </button>
              <!--<button class="can-button" type="button" @click="goSavePicture">-->
                <!--<img src="./loading.gif" v-if="isClickSave || isFirstLoad">-->
                <!--<span v-else>保存为图片</span>-->
              <!--</button>-->
            </div>
          </div>
      </gatherBgItem>
      <p class="notice-title" v-if="isFromApp">独乐不如众乐，和更多好友一起聆听！</p>
      <div v-else class="notice-title-other">
        <p class="notice-title">更多大牌音乐人的新年祝福等你来听，</p>
        <p class="notice-title">赶紧来开启属于你的新年祝福吧！！</p>
      </div>
      <!--<willSavePicture v-model="imgUrl"-->
                       <!--v-if="isClickSave || isFirstLoad"-->
                       <!--:options="{-->
                                  <!--head: `${info.imgpic_link}/135/135`,-->
                                  <!--name: info.nickname,-->
                                  <!--vip: true,-->
                                  <!--text: info.text-->
                                  <!--}"-->
                       <!--@isGetPicture="isGetPictureFn"-->
      <!--&gt;</willSavePicture>-->
    </div>
</template>
<script type="text/javascript">
    import gatherBgItem from './../bg-item/index.vue';
    import willSavePicture from './../will-pictrue/index.vue';
    import children from './../../children.js';
    import { RouterUtil } from '@/utils';
    export default {
        props: {
            isFromApp: '',
            info: {
                type: Object
            }
        },
        data() {
            return {
//                info: {
//                    imgpic_link: 'http://api.demo.com//image/9527181c9258ee280cc525ae5d2f070a',
//                    nickname: '浮声音乐团队',
//                    text: '一帆风顺，二龙腾飞，三羊开泰，四季平安，五福临门，六六大顺，七星高照，八方来财，九九同心，十全十美!'
//                },
                time: 0,
                audioNode: '',
                currentTime: 0,
                leaveTime: 0,
                isPlaying: false,
                setTimer: '',
                imgUrl: '',
                isClickSave: false,
                isFirstLoad: false,
                canPlayClick: false,

                halfRCircle: Math.ceil(2 * Math.PI * 182)
            };
        },
        computed: {
            imgpicLink() {
                let a = this.info.imgpic_link.split(/(https|http):\/\//g)[2].split('/')[0];
                a = this.info.imgpic_link.replace(a, window.location.host);
                return a;
            },
            percent() {
                let p = this.time ? this.currentTime / this.time : 0;
                p = p >= 1 ? 1 : p;
                return p;
            },
            circleOne() {
                if (this.percent <= 0.5) {
                    return Math.ceil(this.percent * 2 * Math.PI * 182);
                } else {
                    return Math.ceil(0.5 * 2 * Math.PI * 182);
                }
            },
            circleTwo() {
                let p = 0;
                if (this.percent > 0.5) {
                    p = (this.percent - 0.5);
                }
                return Math.ceil(p * 2 * Math.PI * 182);
            }
        },
        components: {
            gatherBgItem,
            willSavePicture
        },
        methods: {
            goUser(oid) {
                this.callAppFunction('gotoUser', {'userID': oid});
            },
            openApp() {
                RouterUtil.download(this.$router, this.$route);
            },
            setPlayerData() {
                this.time = this.audioNode.duration;
                this.currentTime = this.audioNode.currentTime;
                this.leaveTime = Math.ceil(this.audioNode.duration);
            },
            setAudioNode() {
                if (!(this.audioNode && /audio/gi.test(this.audioNode.tagName))) {
                    this.audioNode = document.createElement('audio');
                    this.audioNode.preload = true;
                    this.audioNode.onplaying = () => {
                        this.isPlaying = true;
                        this.setPlayerData();
                    };
                    this.audioNode.addEventListener('canplaythrough', () => {
                        this.canPlayClick = true;
                        this.setPlayerData();
                    });
                    this.audioNode.addEventListener('timeupdate', () => {
                        if (this.audioNode.currentTime) {
                            this.currentTime = this.audioNode.currentTime;
                            this.isPlaying = true;
                        }
                        if (document.hidden) {
                            this.audioNode.pause();
                            this.audioNode.currentTime = 0;
                            this.time = 0;
                            this.currentTime = 0;
                            this.isPlaying = false;
                        }
                    });
                    this.audioNode.onended = () => {
                        this.time = 0;
                        this.currentTime = 0;
                        this.isPlaying = false;
                    };
                }
                this.audioNode.src = this.info.video_link || '';
            },
            goPlay(v) {
                if (Boolean(~~v) === true) {
                    this.isFirstLoad = true;
                    this.audioNode.play();
                    this.callAppFunction('playOrpause', {'status': 'pause'});
                }
            },
            isGetPictureFn(e) {
                this.isFirstLoad = true;
                this.imgUrl = e.data;
                this.isClickSave && this.imgUrl && this.imgUrl.url && this.appSaveImg(this.imgUrl.url);
                this.isClickSave = false;
            },
            goThisShare() {
                this.callAppFunction('showShareWindow', {
                    alias: '2018chinayear ',
                    type: 5,
                    title: `你有一条来自${this.info.member_info.nickname || '源音塘'}的蜜汁语音祝福`, // 分享标题
                    link: window.location.href, // 分享链接
                    imgUrl: this.info.member_info.head_link, // 分享图标
                    desc: ''
                });
            },
            appSaveImg(url) {
                let a = {
                    base64: this.imgUrl.fire ? '' : url,
                    imgUrl: this.imgUrl.fire ? url : '',
                    shareInfo: {
                        alias: '2018chinayear ',
                        type: 5,
                        title: '神兽做护法，源音塘新年豪奖开抢啦！',
                        desc: '集齐神兽碎片就能换#源音塘#豪华大福袋，超赞！还有男神女神的撩人语音祝福，旺年人生赢家就是我！'
                    },
                    isSave: 1
                };
                url && this.callAppFunction('save_share_Pic', Object.assign({}, a));
                this.imgUrl.fire && this.imgUrl.fire();
            },
            goSavePicture() {
                if (!this.isClickSave) {
                    this.imgUrl && this.imgUrl.url && this.appSaveImg(this.imgUrl.url);
                    (!this.imgUrl || !this.imgUrl.url) && (this.isClickSave = true);
                }
            }
        },
        created() {
            this.$share({
                alias: '2018chinayear ',
                type: 5,
                title: `你有一条来自${this.info.member_info.nickname || '源音塘'}的蜜汁语音祝福`, // 分享标题
                link: window.location.href, // 分享链接
                imgUrl: this.info.member_info.head_link, // 分享图标
                desc: ''
            });
            window.sessionStorage.removeItem('isPageLoading');
            this.setAudioNode();
            children.setWindowClose(this);
        }
    };
</script>
<style lang="less">
    @import 'index.less';
</style>
