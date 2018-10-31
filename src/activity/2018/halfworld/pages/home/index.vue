<template>
  <div class="home_page message_bord_scroller">
    <div class="container">
        <div class="header view">
            <img class="bg_img" src="./../../img/bg_top@2x.png" onclick="return false">
            <div class="title">
                <img class="title_img" src="./../../img/bg_top_title@2x.png" onclick="return false">
                <div>
                    <div class="blue_btn" @click="showUpdataTip">立即参加</div>
                    <div class="red_btn" @click="shareActivity">分享给好友</div>
                </div>
            </div>
            <img class="item_tip" src="./../../img/img_subtitle@2x.png" onclick="return false">
        </div>

        <div class="base_info">
            <div class="blue_box intro">
                <p>“无意穿越到神奇大陆的你，结识了精致挑剔的金池国使臣花想容、潇洒倜傥的临宸国主景逸、霸道强硬的神秘男子等等。在这凶兽肆起，光怪陆离的异世界，你肩负收集玄镜碎片的使命，与守护你之人一同踏上未知的旅程。”</p>
                <p>超精美乙女向手游《半世界之旅》主题曲翻唱&CV大赛，强势登陆源音塘！快来用你的声音开启奇迹之旅吧！</p>

                <div class="rule_btn" @click="goRulePage">查看活动规则</div>
            </div>
            <ul class="time_box">
                <li>
                    <div class="times">
                        <p class="start">{{$parent.activity.date.collectTime.start}}</p>
                        <p class="end">{{$parent.activity.date.collectTime.end}}</p>
                    </div>
                    <h3>投稿征集</h3>
                </li>
                <li>
                    <div class="times">
                        <p class="start">{{$parent.activity.date.voteTime.start}}</p>
                        <p class="end">{{$parent.activity.date.voteTime.end}}</p>
                    </div>
                    <h3>用户投票</h3>
                </li>
                <li>
                    <div class="times">
                        <p class="start">{{$parent.activity.date.activeTime.start}}</p>
                        <p class="end">{{$parent.activity.date.activeTime.end}}</p>
                    </div>
                    <h3>评委评选</h3>
                </li>
                <li>
                    <div class="times">
                        <p>{{$parent.activity.date.prizeTime}}</p>
                    </div>
                    <h3>结果公布</h3>
                </li>
            </ul>
            <div class="blue_box video">
                <div class="video_view" :class="[videoMedia.isPlay ? 'puase' : 'play', {android: isFromAndroid}]" @click="tigglePlay">
                    <img src="https://api.yuanyintang.com/image/5ea6dd9d631db3a9ddee6540f7b17163/1" onclick="return false" v-if="isFromAndroid">
                    <video ref="video" @ended="videoMedia.isPlay = false" @pause="videoMedia.isPlay = false"
                    poster="/static/imgs/activity/2018/vedio_cover.png"
                    src="https://yyt-file.oss-cn-shenzhen.aliyuncs.com/vido/%E5%8D%8A%E4%B8%96%E6%B8%B8%E5%B8%A6%E5%B9%BF%E5%91%8A.mp4"></video>
                </div>
                <div class="down_link">
                    <a target="_blank" href="https://www.taptap.com/app/71062">游戏下载：https://www.taptap.com/app/71062</a>
                </div>
            </div>
        </div>

        <!-- 奖项福利 -->

        <div class="award view">
            <div class="title">
                <img src="./../../img/img_title_award@2x.png" onclick="return false">
            </div>
            
            <div class="award_box">
                <img src="./../../img/award/img_title_award_top@2x.png" onclick="return false">
                <div class="content">
                    <div class="label_style">
                        <div class="fir">
                            <img src="./../../img/prize/bg_award1@2x.png" onclick="return false">
                            <p>奖金888元<br>
                            （优秀、人气、创意奖各一名）</p>
                        </div>
                        <div class="sec">
                            <img src="./../../img/prize/bg_award2@2x.png" onclick="return false">
                            <p>奖金666元<br>
                            + 游戏周边/人</p>
                        </div>
                    </div>
                    <div>
                        <img src="./../../img/prize/bg_award3@2x.png" onclick="return false">
                        <p>奖金333元 + 游戏周边/人</p>
                    </div>
                    <p class="award_tip">每周评出最高人气奖1名，奖励甜甜圈20000个+<br>微博年费会员（每名参赛者限得1次）</p>
                </div>
                <img src="./../../img/award/img_title_award_bottom.png" onclick="return false">
            </div>

            <div class="award_box">
                <img src="./../../img/award/img_title_award2_bottom@2x.png" onclick="return false">
                <div class="content">
                    <div class="label_style">
                        <div class="fir">
                            <img src="./../../img/prize/bg_award1@2x.png" onclick="return false">
                            <p>奖金888元<br>
                            （优秀、人气、创意奖各一名）</p>
                        </div>
                        <div class="sec">
                            <img src="./../../img/prize/bg_award2@2x.png" onclick="return false">
                            <p>奖金666元<br>
                            + 游戏周边/人</p>
                        </div>
                    </div>
                    <div>
                        <img src="./../../img/prize/bg_award3@2x.png" onclick="return false">
                        <p>奖金333元 + 游戏周边/人</p>
                    </div>
                    <p class="award_tip">每周评出最高人气奖1名，奖励甜甜圈20000个+<br>微博年费会员（每名参赛者限得1次）</p>
                </div>
                <img src="./../../img/award/img_title_award_bottom.png" onclick="return false">
            </div>
        </div>

        <!-- / 奖项福利 -->

        <div class="temp">
            <div class="title">
                <img src="./../../img/img_title_fanchang@2x.png" onclick="return false">
            </div>

            <div class="blue_border yuan">
                <img src="./../../img/blue-border/bg_title_blue_top@2x.png" onclick="return false">
                <div class="content">
                    <div class="bg">
                        <div class="temp_music">
                            <p class="yuanchang">主题曲《{{templates.music.music_info.title}}》原声</p>
                            <p class="linsten" @click="play(templates.music.music_info)">试听一下</p>
                        </div>

                        <div class="rule">
                            <h3>翻唱参赛规则</h3>
                            <p>
                                1、在本活动页下载伴奏—录制参赛歌曲—上传歌曲—完善歌曲信息;<br>
                                2、请参赛者在上传作品时注意作品命名格式：【翻唱比赛】+《半世游》;<br>
                                3、请小可爱在参加比赛的同时保留干声哦。
                            </p>
                        </div>

                        <p class="up_tip">上传作品请访问网页(yyt.im)</p>
                    </div>
                </div>
                <img src="./../../img/blue-border/bg_title_blue_bottom@2x.png" onclick="return false">
            </div>
            <img class="yxy" src="./../../img/img_fanchang_yuan@2x.png" onclick="return false">
        </div>

        <div class="temp">
            <div class="title">
                <img src="./../../img/img_title_cv@2x.png" onclick="return false">
            </div>

            <div class="red_border border_box">
                <img src="./../../img/award/img_title_award_top.png" onclick="return false">
                <div class="content">
                    <h3>
                        <span>参赛方式一</span>
                    </h3>
                    <p class="intro">
                    进入活动页试听男主CV原声—按照台词重新演绎(至少<br>
                1段)—上传作品—完善信息，格式：【初见】+自定义</p>
                    <div class="detail" :class="`yuanyin${templates.way1.currentIndex + 1}`">
                        <div class="play_btn"
                        @click.stop="templates.way1.data[templates.way1.currentIndex] && play(templates.way1.data[templates.way1.currentIndex].music_info)"
                        v-text="(templates.way1.data[templates.way1.currentIndex] && playingItem.id === templates.way1.data[templates.way1.currentIndex].music_info.id && !playingItem.pause) ? '播放中...' : '试听'"></div>
                        <h3 v-text="templates.way1.data[templates.way1.currentIndex] && templates.way1.data[templates.way1.currentIndex].title"></h3>
                        <p class="text_desc" v-html="templates.way1.data[templates.way1.currentIndex] && templates.way1.data[templates.way1.currentIndex].content"></p>
                        <p class="tip">上传作品请访问网页(yyt.im)</p>
                    </div>

                    <div class="btn_box">
                        <div class="text_nowrap_ellipsis"
                        v-for="(item, index) in templates.way1.data" :key="item.id"
                        :class="{selected: index === templates.way1.currentIndex}"
                        v-text="item.title" v-if="index < 3"
                        @click="selectedTemp(templates.way1, index)"></div>
                    </div>
                </div>
                <img src="./../../img/award/img_title_award_bottom.png" onclick="return false">
            </div>

            <div class="blue_border border_box">
                <img src="./../../img/blue-border/bg_blue_bold_top@2x.png" onclick="return false">
                <div class="content">
                    <h3>
                        <span>参赛方式二</span>
                    </h3>
                    <p class="intro">
                    将自己代入女主角色，挑选一位男主进行告白”，<br>
                台词自定，建议1分钟左右，格式：【告白】+自定义</p>
                    <div class="detail" :class="`yuanyin${templates.way2.currentIndex + 1}`">
                        <div class="play_btn"
                        @click.stop="play(templates.way2.data[templates.way2.currentIndex].music_info)"
                        v-text="(templates.way2.data[templates.way2.currentIndex] && playingItem.id === templates.way2.data[templates.way2.currentIndex].music_info.id && !playingItem.pause) ? '播放中...' : '试听'"></div>
                        <h3 v-text="templates.way2.data[templates.way2.currentIndex] && templates.way2.data[templates.way2.currentIndex].title"></h3>
                        <p class="text_desc" v-html="templates.way2.data[templates.way2.currentIndex] && templates.way2.data[templates.way2.currentIndex].content"></p>
                        <p class="tip">上传作品请访问网页(yyt.im)</p>
                    </div>

                    <div class="btn_box">
                        <div class="text_nowrap_ellipsis"
                        v-for="(item, index) in templates.way2.data" :key="item.id"
                        :class="{selected: index === templates.way2.currentIndex}"
                        v-text="item.title" v-if="index < 3"
                        @click="selectedTemp(templates.way2, index)"></div>
                    </div>
                </div>
                <img src="./../../img/blue-border/bg_blue_bold_bottom@2x.png" onclick="return false">
            </div>
        </div>

        <div class="prize_area view" v-if="winner.isShow">
            <div class="title">
                <img src="./../../img/img_title_zuoping@2x.png" onclick="return false">
            </div>

            <div class="red_border" v-if="winner.cover.length">
                <img src="./../../img/award/img_title_zuoping_top@2x.png" onclick="return false">
                <ul class="content clear_float">
                    <li v-for="(music, index) in winner.cover" :key="index">
                        <div class="prize_name" v-text="music.prize_name"></div>
                        <div class="detail">
                            <div class="cover_img" @click="goMusicDetail(music)" :style="{backgroundImage: `url(${music.imgpic_info && $fixImg(music.imgpic_info.link, 'w=280&h=180')})`}">
                                <div class="number" v-text="`NO.${music.id}`"></div>
                                <div class="play_btn" @click.stop="play(music)" :class="(playingItem.id === music.id && !playingItem.pause) ? 'pause' : 'play'">
                                    <img src="./../../img/icon_play_white2@2x.png" onclick="return false">
                                    <img src="./../../img/icon_play_white@2x.png" onclick="return false">
                                </div>
                            </div>

                            <p class="music_name" v-text="music.title" @click="goMusicDetail(music)"></p>

                            <p class="singer text_nowrap_ellipsis" @click="singerDetailPage(music)">作者：{{music.nickname}}</p>
                        </div>
                        <p class="tickets">{{music.vote_count}}票</p>
                    </li>
                </ul>
                <img src="./../../img/award/img_title_award_bottom.png" onclick="return false">
            </div>

            <div class="red_border" v-if="winner.cv.length">
                <img src="./../../img/award/img_title_award2_bottom@2x.png" onclick="return false">
                <ul class="content clear_float">
                    <li v-for="music in winner.cv" :key="music.id">
                        <div class="prize_name" v-text="music.prize_name"></div>
                        <div class="detail">
                            <div class="cover_img" @click="goMusicDetail(music)" :style="{backgroundImage: `url(${music.imgpic_info && $fixImg(music.imgpic_info.link, 'w=280&h=180')})`}">
                                <div class="number" v-text="`NO.${music.id}`"></div>
                                <div class="play_btn" @click.stop="play(music)" :class="(playingItem.id === music.id && !playingItem.pause) ? 'pause' : 'play'">
                                    <img src="./../../img/icon_play_white2@2x.png" onclick="return false">
                                    <img src="./../../img/icon_play_white@2x.png" onclick="return false">
                                </div>
                            </div>

                            <p class="music_name" v-text="music.title" @click="goMusicDetail(music)"></p>

                            <p class="singer text_nowrap_ellipsis" v-text="music.nickname" @click="singerDetailPage(music)"></p>
                        </div>
                        <p class="tickets">{{music.vote_count}}票</p>
                    </li>
                </ul>
                <img src="./../../img/award/img_title_award_bottom.png" onclick="return false">
            </div>
        </div>

        <div class="works_area view" ref="works">
            <div class="title">
                <img src="./../../img/img_title_cansai@2x.png" onclick="return false">
            </div>

            <div class="blue_border">
                <img src="./../../img/blue-border/bg_blue_bold_top@2x.png" onclick="return false">
                <div class="content">
                    <div class="area_label" :class="{yuan_chuang: search.index === 0, fan_chang: search.index === 1}">
                        <div @click="tiggleNav(0)">翻唱区</div>
                        <div @click="tiggleNav(1)">CV区</div>
                    </div> 

                    <div class="search_label">
                        <input type="text" placeholder="输入歌名、作品编号" v-model="search.key">
                        <button @click="searchKey"></button>
                    </div>

                    <ul class="types">
                        <li :class="{selected: search.order === 'create_time-desc'}" @click="resetOrder('create_time-desc')">按时间</li>
                        <li :class="{selected: search.order === 'counts-desc'}" @click="resetOrder('counts-desc')">按人气</li>
                        <li :class="{selected: search.order === 'rand-desc'}" @click="resetOrder('rand-desc')">随机刷新</li>
                    </ul>

                    <div class="clear_float music_list" v-show="musicList.length">
                        <div class="item" v-for="music in musicList">
                            <div class="cover_img" @click="goMusicDetail(music)" :style="{backgroundImage: `url(${music.imgpic_info && $fixImg(music.imgpic_info.link, 'w=324&h=250')})`}">
                                <div class="number" v-text="`NO.${music.id}`"></div>
                                <div class="play_btn" @click.stop="play(music)" :class="(playingItem.id === music.id && !playingItem.pause) ? 'pause' : 'play'">
                                    <img src="./../../img/icon_play_white2@2x.png" onclick="return false">
                                    <img src="./../../img/icon_play_white@2x.png" onclick="return false">
                                </div>
                            </div>
                            <div class="infos">
                                <p class="music_name text_nowrap_ellipsis" v-text="music.title" @click="goMusicDetail(music)"></p>
                                <div class="musician">
                                    <header-img class="header" :size="58" :header-img="music.head_info && music.head_info.link" :header-id="music.uid" :vip="music.vip"></header-img>
                                    <p class="name text_nowrap_ellipsis" v-text="music.nickname" @click="singerDetailPage(music)"></p>
                                </div>

                                <button class="vote_btn" @click="vote(music)">+1 票</button>

                                <div class="clear_float vote_info">
                                    <span class="fl">当前{{music.vote_count}}票</span>
                                    <div class="share_icon fr" @click="shareMusic(music)">
                                        分享
                                    </div>
                                </div>
                                    
                            </div>
                        </div>
                    </div>

                    <div class="pagination_box" v-show="pagination.pageCount > 1">
                        <pagination :options="paginationOptions" :pagination="pagination" :callback="loadMore" :scrollTo="true"></pagination>
                    </div>
                    <div class="empty" v-show="!musicList.length">
                        <img src="./../../../../../imgs/common/img_zhongjiangjilv_nothing.png" onclick="return false">
                        <p v-show="search.key">呜呜呜，没有找到和<span class="red_text">“{{search.key}}”</span>相关的作品呢</p>
                    </div>
                </div>
                <img src="./../../img/blue-border/bg_blue_bold_bottom@2x.png" onclick="return false">
            </div>
        </div>

        <div class="choujiang view">
            <div class="title">
                <img src="./../../img/img_title_choujiang@2x.png" onclick="return false">
            </div>

            <div class="red_border border_box">
                <img src="./../../img/award/img_title_award_top.png" onclick="return false">
                <div class="content">
                    <h3 v-show="isLogined">
                        <span>你今天还有{{prize.count}}次抽奖机会</span>
                    </h3>
                    <p class="intro">
                    每天票全部投完后，加1次<br>
                每天APP的第一次分享，再加1次</p>

                    <div class="go_prize" @click="goChouJiangPage" v-text="isLogined ? '去抽奖' : '点我查看抽奖机会'"></div>
                </div>
                <img src="./../../img/award/img_title_award_bottom.png" onclick="return false">
            </div>
        </div>
    </div>

    <!-- 留言板 -->
    <MessageBoard class="message_board view" :id="$parent.activity.id" type="5" title="《半世界之旅》主题曲翻唱&CV大赛">
        <div class="title" slot="title">
            <img src="./../../img/img_title_liuyan@2x.png" onclick="return false">
        </div>
    </MessageBoard>

    <!--   抽奖弹框  -->
    <alert-panel :title="panel.title"  v-model="panel.isOpen" :btn-text="panel.btnText" :content="panel.content" @sureClick="closeAlert"></alert-panel>

    <!-- 非APP时的分享提示 -->
    <div class="share_tip" v-show="showShareTip" @click="showShareTip = false">
        <img src="./../../../../../imgs/common/img_share.png" onclick="return false">
    </div>
  </div>
</template>

<script type="text/javascript">
import $ from 'jquery';
import Btn from './../../components/btn';
import AlertPanel from './../../components/alert-panel';
import { HeaderImg, MessageBoard } from '@/components';

import { mapState } from 'vuex';
import Api from './../../api.js';
import { BrowserUtil, RouterUtil } from '@/utils';
import Pagination from '@/components/pagination';

export default {
    components: {
        Btn,
        Pagination,
        HeaderImg,
        AlertPanel,
        MessageBoard
    },
    data() {
        return {
            videoMedia: {
                isPlay: false
            },
            templates: {
                music: {
                    music_info: {
                        title: ''
                    }
                },
                way1: {
                    currentIndex: 0,
                    data: []
                },
                way2: {
                    currentIndex: 0,
                    data: []
                }
            },
            showShareTip: false,
            search: {
                index: -1,
                order: 'create_time-desc',
                key: '',
                list: []
            },
            musicList: [],
            panel: {
                isOpen: false,
                title: '',
                content: '',
                btnText: '',
                btnClicked() {}
            },
            winner: {
                isShow: false,
                cover: [],
                cv: []
            },
            pagination: {
                totalCount: 0,
                perPage: 8,
                currentPage: 1,
                pageCount: 0
            },
            paginationOptions: {
                itemColor: 'blue',
                isScroll: false
            },
            prize: {
                count: 0
            },
            isFromAndroid: BrowserUtil.isFormAndroid()
        };
    },
    computed: {
        ...mapState({
            playingItem: state => state.player.playing.song,
            isLogined: state => state.user.isLogined
        })
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.getTemplate();
            this.getWinning();
            this.getSearchParams();

            setTimeout(() => {
                if (this.isLogined) {
                    this.searchPrizeCount();
                }
            }, 1000);
        },
        /* 当前剩余抽奖次数 */
        searchPrizeCount() {
            Api.searchPrizeCount().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }
                this.prize.count = res.data.counts || 0;
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        getSearchParams() {
            Api.getSearchParams().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.search.list = res.data;
                this.getEntries();
            }, error => {
                this.$toast.error(error.msg);
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

                for (let item of res.data) {
                    this.$set(this.winner, item.alias, item.class_list[0].data_list);
                }

                this.winner.isShow = this.winner.cover.length + this.winner.cv.length;
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        tiggleNav(navIndex) {
            if (this.search.index === navIndex) {
                return;
            }

            this.search.key = '';
            this.search.order = 'create_time-desc';
            this.pagination.currentPage = 1;
            this.search.index = navIndex;

            this.getEntries();
        },
        resetOrder(order) {
            this.search.order = order;
            this.pagination.currentPage = 1;

            this.getEntries();
        },
        searchKey() {
            this.pagination.currentPage = 1;

            this.getEntries();
        },
        loadMore() {
            this.getEntries();
            $('.home_page').animate({
                scrollTop: this.$refs.works.offsetTop - 60
            }, 10);
        },
        /**
         * [getEntries 获取音乐列表]
         * @Author   郑君婵
         * @DateTime 2018-01-05
         */
        getEntries() {
            let params = {
                p: this.pagination.currentPage,
                row: this.pagination.perPage,
                cover_lx: this.search.index < 0 ? '' : this.search.list[this.search.index].id
            };

            if (this.search.key) {
                params.title = this.search.key;
            }

            if (this.search.order) {
                params.order = this.search.order;
            }

            Api.getEntries(params).then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.musicList = res.data;
                this.pagination = res.page;
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        goRulePage() {
            let param = {
                url: '/activity/halfworld/rule/activity',
                title: '活动参与规则'
            };

            if (BrowserUtil.isFromAndroidApp()) {
                RouterUtil.go(param.url, this.$router);
            } else {
                this.$parent.goPage(param);
            }
        },
        goChouJiangPage() {
            if (!this.isLogined) {
                this.$store.dispatch('showAlert', {
                    type: 'login'
                });
                return;
            }

            let param = {
                url: '/activity/halfworld/luck-draw',
                title: '抽奖'
            };

            if (BrowserUtil.isFromAndroidApp()) {
                RouterUtil.go(param.url, this.$router);
            } else {
                this.$parent.goPage(param);
            }
        },
        goMusicDetail(music) {
            if (BrowserUtil.isFormApp()) {
                this.callAppFunction('gotoMusic', {
                    songID: Number(music.id) // 音乐id
                });
            } else {
                RouterUtil.go(`/music/${music.id}`, this.$router);
            }
        },
        // 投票
        vote(item) {
            if (this.$parent.isEnd) {
                this.$toast.error('活动投票已结束');
                return;
            }

            if (!this.isLogined) {
                this.$store.dispatch('showAlert', {
                    type: 'login'
                });
                return;
            }

            if (this.voting) {
                this.$toast.error('您的操作次数过快');
                return;
            }

            this.voting = true;

            let params = {
                log_at: window.localStorage.getItem('logat') || window.localStorage.getItem('logAt') || 4,
                item_id: item.id
            };

            Api.vote(params).then(res => {
                this.voting = false;

                let status = Number(res.data.status);

                if (res.code === 0 && status === -5) {
                    this.$store.commit('bindMobile');
                    return;
                }

                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.searchPrizeCount();

                this.panel.isOpen = true;
                this.panel.btnText = '好的';
                this.panel.btnClicked = this.closePanel;

                // 如果投票成功
                if (status === 1) {
                    item.vote_count++;
                    this.panel.title = '投票成功';
                    this.panel.content = `投票成功，您当前还剩余${BrowserUtil.isFormApp() ? res.data.data.app_counts : res.data.data.web_counts}票`;

                    return;
                }

                if (BrowserUtil.isFormApp()) {
                    let webCount = res.data.data.web_can_get + res.data.data.web_counts;

                    if (webCount > 0) {
                        this.panel.content = `你APP的票投完啦<br>网页还有${webCount}票没投哟~`;
                    } else {
                        this.panel.content = `明天再来吧<br>每日参与投票可抽大奖哦`;
                    }

                    this.panel.title = '真的没有投票机会了';
                    this.panel.btnClicked = this.closePanel;
                } else {
                    let appCount = res.data.data.app_can_get + res.data.data.app_counts;

                    if (appCount > 0) {
                        this.panel.content = `下载APP每天还可以多投${appCount}票哦`;
                    } else {
                        this.panel.content = `今天的票投完了，明天再来吧`;
                    }

                    this.panel.title = '下载APP抽奖';
                }
            }).catch(err => {
                this.voting = false;
                err && this.$toast.error(err.msg);
            });
        },
        // 投票成功
        successAlert() {
            this.showAlert('投票成功', '对《作品名作品名作品名》投票成功，<br>您当前APP剩余5票，网页剩余3票');
        },
        // 网页还有票
        webAlert() {
            this.showAlert('网页还有票', '你APP的票投完了，网页还有3票没投哟');
        },
        // 投票成功
        emptyAlert() {
            this.showAlert('你的票投完啦', '明天再来吧，每天投完可以抽奖哟');
        },
        // 设置弹框
        showAlert(title, content, btnText, callback) {
            this.panel.title = title;
            this.panel.content = content;
            this.panel.btnText = btnText;
            this.panel.btnClicked = callback;
            this.panel.isOpen = true;
        },
        closeAlert() {
            this.panel.isOpen = false;
        },
        play(music) {
            this.videoMedia.isPlay && this.tigglePlay(false);

            this.$store.dispatch('playSong', {music});
        },
        shareActivity() {
            if (BrowserUtil.isFormApp()) {
                this.showShareWindow(this.$parent.shareInfos);
            } else {
                this.showShareTip = true;
            }
        },
        shareMusic(music) {
            if (!BrowserUtil.isFormApp()) {
                this.goMusicVotePage(music.id);
                return;
            }

            let infos = {
                title: `${music.nickname}正在参加《半世界之旅》${this.search.index ? 'CV告白' : '主题曲翻唱'}大赛，来源音塘帮我投票抽大奖吧！`,
                sinaDescription: `${music.nickname}正在参加#半世界之旅#${this.search.index ? 'CV告白' : '主题曲翻唱'}大赛，快来帮我投票抽大奖>>（${window.location.origin + this.$parent.activity.baseUrl}/vote?id=${music.id}）#源音塘音乐##半世界之旅#`,
                type: 6,
                alias: Api.alias, // 活动别名
                inputText: '', // 分享时，填充的话语。如：分享至微博，用户可输入的输入框中默认文字
                link: `${window.location.origin + this.$parent.activity.baseUrl}/vote?id=${music.id}`, // 分享链接
                imgUrl: music.imgpic_info.link, // 分享图标
                desc: '#源音塘音乐##半世界之旅#，快来帮我投票抽大奖吧！戳>> @源音塘音乐' // 分享描述
            };

            this.showShareWindow(infos);
        },
        goMusicVotePage(musicId) {
            RouterUtil.go(`/activity/halfworld/vote?id=${musicId}`, this.$router);
        },
        showShareWindow(infos) {
            this.callAppFunction('showShareWindow', infos);
        },
        singerDetailPage(music) {
            if (BrowserUtil.isFormApp()) {
                let param = {'userID': music.uid};

                this.callAppFunction('gotoUser', param);
            } else {
                RouterUtil.go(`/singer/${music.uid}`, this.$router);
            }
        },
        getTemplate(key) {
            let params = {
                materiel_alias: key
            };

            Api.getTemplate(params).then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                for (let item of res.data) {
                    if (item.materiel_alias === 'boy') {
                        this.templates.way1.data.push(item);
                    }
                    if (item.materiel_alias === 'girl') {
                        this.templates.way2.data.push(item);
                    }

                    if (item.materiel_alias === 'music') {
                        this.$set(this.templates, item.materiel_alias, item);
                    }
                }
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        selectedTemp(item, index) {
            item.currentIndex = index;
        },
        tigglePlay(status) {
            let elem = this.$refs.video;

            if (typeof status === 'boolean') {
                this.videoMedia.isPlay = status;
            } else {
                this.videoMedia.isPlay = !this.videoMedia.isPlay;
            }

            if (this.videoMedia.isPlay) {
                elem.play();
                this.$store.commit('pause');
            } else {
                elem.pause();
            }
        },
        showUpdataTip() {
            this.panel.title = '温馨提示';
            this.panel.content = '上传作品请访问网页(yyt.im)';
            this.panel.btnText = '好的';
            this.panel.isOpen = true;
        }
    }
};
</script>

<style type="text/css" lang="less" scoped>
  @import './main.less';
</style>
