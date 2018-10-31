<!-- [mv_detail_page]   @Author: 郑君婵   @DateTime: 2017-09-28 -->
<template>
  <div class="mv_detail_page">
    <div class="mv_box">
        <div class="mv_panel">
            <div class="inner" ref="mvPanel" @click="showProcess">
                <video id="mv" ref="mv" :webkit-playsinline='mv.isInline' :playsinline='mv.isInline'
                @ended="ended" @timeupdate="updataVideo" @durationchange="setDuration"></video>
                <div class="mv_panle" v-show="mv.showProcess">
                    <div class="play_box">
                        <img class="play_btn" src="./../../../../imgs/2_6_0/icon_mv_play.png" @click="pause" v-show="!mv.paused">
                        <img class="play_btn" src="./../../../../imgs/2_6_0/icon_mv_play2.png" @click="play" v-show="mv.paused">
                    </div>
                    <div class="action_label">
                        <div class="current_time">{{mv.currentTime}}</div>
                        <div class="process_label">
                            <div class="base_line" @click="updataCurrentTime" ref="process">
                                <div class="load_bar" :style="{width: mv.processWidth}"></div>
                                <div class="play_bar" :style="{width: mv.processWidth}"></div>
                                <div class="process_btn" :style="{left: mv.processWidth}" @click.stop></div>
                            </div>
                        </div>
                        <div>
                            <span>{{mv.duration}}</span>
                            <img class="full_icon" src="./../../../../imgs/2_6_0/icon_mv_quanping.png"  v-show="!mv.isFullScreen" @click="tiggleFull">
                            <img class="full_icon" src="./../../../../imgs/2_6_0/icon_mv_quanping2.png"  v-show="mv.isFullScreen" @click="tiggleFull">
                        </div>
                    </div>
                </div>
                <div class="refresh_tip" v-show="mv.isEnded" @click.stop>
                    <div class="tip" @click="refresh">
                        <img class="refresh_icon" src="./../../../../imgs/2_6_0/icon_rerun.png">
                        <span>重新播放</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="info">
            <h1 class="title" v-text="musicInfos.title"></h1>
            <div class="desc">
                <span>发布：{{timetrans(musicInfos.create_time)}}</span>
                <span>播放：{{musicInfos.mv_counts_text || 0}}</span>
            </div>
            <div class="musician">
                <header-img v-if="Number(musicInfos.uid) > 0" class="header_img" :size="68" :header-img="musicInfos.head_info && musicInfos.head_info.link" :header-id="musicInfos.uid" :vip="musicInfos.is_music == 3" />
                <span class="nickname" v-text="musicInfos.nickname" @click="goMusicianDetail(musicInfos.uid)"></span>

                <div class="gift" @click="getDownloadPage">送礼物</div>
            </div>
        </div>
    </div>
    <div class="discuss_box">
        <div class="box" v-if="hotDiscuss.length">
            <cell class="cell_title" title="热门评论" />

            <discuss-list class="discuss_list no_bottom_border" :list="hotDiscuss" :max-num="page.perPage" type="4"></discuss-list>
        </div>

        <div class="box" v-if="discussList.length">
            <cell class="cell_title" title="全部评论" />

            <discuss-list class="discuss_list" :list="discussList" :max-num="page.perPage" type="4"></discuss-list>
        </div>

        <div class="more_btn" v-if="page.totalCount > page.perPage">
          <span @click="getDownloadPage">查看全部评论</span>
        </div>
    </div>

  </div>
</template>

<script type="text/javascript">
import { RouterUtil } from '@/utils';
import { CommentApi, MusicApi } from '@/api';

import { Cell, DiscussList, HeaderImg } from '@/components';

export default {
    components: {
        Cell,
        HeaderImg,
        DiscussList
    },
    props: {
        musicInfos: Object
    },
    data() {
        return {
            mv: {
                isInline: true,
                isEnded: false,
                paused: true,
                currentTime: '00:00',
                duration: '00:00',
                processWidth: 0,
                isFullScreen: false,
                showProcess: true
            },
            hotDiscuss: [],
            discussList: [],
            page: {
                perPage: 3,
                totalCount: 0
            },
            musicId: this.$route.params.id,
            timer: {
                time: 0,
                sec: 3,
                interval: null
            }
        };
    },
    watch: {
        musicInfos: {
            deep: true,
            handler(info) {
                if (info.mv) {
                    this.$refs.mv.src = info.mv && info.mv_info.link;
                }
            }
        }
    },
    created() {
        this.init();

        this.timer.interval = setInterval(() => {
            this.timer.time++;

            if (!this.mv.paused && this.mv.showProcess && this.timer.time === this.timer.sec) {
                this.mv.showProcess = false;
                this.timer.time = 0;
            }
        }, 1000);
    },
    mounted() {
        this.initMvPlayer();
    },
    methods: {
        init() {
            this.getDiscussList();
        },
        getDiscussList() {
            let params = {
                row: this.page.perPage,
                id: this.topicId
            };

            this.getDiscuss(params, res => {
                if (res.page.totalCount > this.page.perPage) {
                    this.getHotDiscuss();
                }

                this.discussList = res.data;      // 轮播列表
                this.page = res.page;
            });
        },
        getHotDiscuss() {
            let params = {
                order: 'agrees-desc',
                row: this.page.perPage,
                id: this.topicId
            };

            this.getDiscuss(params, res => {
                this.hotDiscuss = res.data;
            });
        },
        getDiscuss(params, callback) {
            params.type = 1;
            params.item_id = this.musicId;

            CommentApi.getCommentList(params).then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                callback && callback(res);
            }, error => {
                this.$toast.error(error.msg || '获取数据失败');
            });
        },
        initMvPlayer() {
            // this.$refs.mv.controls = false;
            var video = document.getElementById('mv');
            video.controls = false;
        },
        updataVideo() {
            this.setTurrentTime(event.target.currentTime);
            this.updataProcess(event.target.currentTime, event.target.duration);
        },
        updataProcess(currentTime, duration) {
            this.mv.processWidth = `${(currentTime / duration * 100).toFixed(1)}%`;
        },
        updataCurrentTime(event) {
            if (!event.offsetX) {
                return;
            }

            let currentTime = event.offsetX / this.$refs.process.offsetWidth * this.$refs.mv.duration;
            this.$refs.mv.currentTime = currentTime;
            this.setTurrentTime(this.$refs.mv.currentTime);

            this.$refs.mv.paused && this.play();
        },
        setTurrentTime(currentTime) {
            this.mv.currentTime = this.getTime(currentTime);
        },
        setDuration(event) {
            this.mv.duration = this.getTime(event.target.duration);
        },
        getTime(time) {
            var other = time % 3600;
            var minute = parseInt(other / 60);
            var second = parseInt(other % 60);

            return `${this.fixInt(minute)}:${this.fixInt(second)}`;
        },
        fixInt(num) {
            return !num ? '00' : num < 10 ? ('0' + num) : num;
        },
        tiggleFull() {
            this.mv.isFullScreen = !this.mv.isFullScreen;

            if (this.mv.isFullScreen) {
                this.fullScreen();
            } else {
                this.notFullScreen();
            }
        },
        fullScreen() {
            this.mv.isInline = false;

            var $mv = this.$refs.mvPanel;

            if ($mv.requestFullscreen) {
                $mv.requestFullscreen();
            } else if ($mv.mozRequestFullScreen) {
                $mv.mozRequestFullScreen();
            } else if ($mv.webkitRequestFullScreen) {
                $mv.webkitRequestFullScreen();
            } else if ($mv.msRequestFullscreen) {
                $mv.msRequestFullscreen();
            }
        },
        notFullScreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }

            this.mv.isInline = true;
        },
        showProcess() {
            this.mv.showProcess = true;
            this.timer.time = 0;
        },
        ended() {
            this.showRefreshTip();
            this.changeMvStatu();
        },
        showRefreshTip() {
            this.mv.isEnded = true;
            this.mv.paused = this.$refs.mv.paused;
        },
        refresh() {
            this.mv.isEnded = false;
            this.play();
        },
        play() {
            this.$refs.mv.play();
            this.changeMvStatu();

            MusicApi.addMvPlayCount({
                id: this.musicId
            }).then(res => {
                if (Number(this.musicInfos.mv_counts) < 10000) {
                    this.musicInfos.mv_counts_text = Number(this.musicInfos.mv_counts_text) + 1;
                }
            });
        },
        pause() {
            this.$refs.mv.pause();
            this.changeMvStatu();
        },
        changeMvStatu() {
            this.mv.paused = this.$refs.mv.paused;
        },
        getDownloadPage() {
            RouterUtil.getDownloadPage(this.router);
        },
        timetrans(date) {
            date = new Date(date * 1000); // 如果date为10位不需要乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';

            return Y + M + D;
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
