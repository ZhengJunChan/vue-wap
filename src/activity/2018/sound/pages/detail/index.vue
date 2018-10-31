<template>
  <div>
    <div class="detail">
        <img class="banner" src="./../../imgs/banner.png" onclick="return false">
        <div class="infos">
            <div class="header_label">
                <div class="header" @click="goSingerPage(sound.uid)"
                :style="{backgroundImage: `url(${$fixImg(sound.head_info ? sound.head_info.link : sound.head_link, 'w=160&h=160')})`}"></div>
                <div class="name text_nowrap_ellipsis" v-text="sound.nickname" @click="goSingerPage(sound.uid)"></div>
                <div class="btn_label">
                    <div class="btn zan" @click="vote(sound)">
                        <span class="text_icon" v-text="sound.ticket_times || '点赞'"></span>
                    </div>
                    <div class="btn share" @click="share(sound)">
                        <span class="text_icon" v-text="sound.share_counts ? sound.share_counts_text : '分享'"></span>
                    </div>
                </div>
                <div class="no" v-text="sound.number"></div>
            </div>

            <div class="content">
                <div class="text" v-text="sound.content"></div>
                <img class="right_bg" src="./../../imgs/icon_liuyanban-symbol2.png">
            </div>

            <div class="zan_label" @click="vote(sound)">{{sound.ticket_times || "点"}}赞</div>
        </div>
    </div>

    <!-- 留言板 -->
    <MessageBoard class="message_board view" type="5" title="去告白" :get-list="getSoundDiscuss" v-model="discussList" btnText="去告白" :submit="discuss" :btnStyle="btnStyle" :option="loginOption">
        <div class="title" slot="title">
            告白墙
            <div class="msg_btn" @click="discuss(sound)">
                <span class="text_content">去告白</span>
            </div>
        </div>
        <p slot="emptyTip" class="tip">还没有人告白, 快来抢个沙发<span class="purple_text" @click="discuss(sound)">去告白</span>吧~</p>
    </MessageBoard>

    <!--   /  抽奖弹框  -->
    <alert-panel :title="panel.title" v-model="panel.isOpen" :btn-text="panel.btnText" :content="panel.content" @sureClick="panel.sureClick"></alert-panel>
  </div>
</template>
<script type="text/javascript">
import methods from './../../methods.js';
import Api from './../../spring-api.js';
import { RouterUtil } from '@/utils';
import AlertPanel from './../../components/alert-panel';

import { MessageBoard } from '@/components';

export default {
    components: {
        AlertPanel,
        MessageBoard
    },
    data() {
        return {
            sound: {
                id: '',
                nickname: '',
                imgpic_info: {
                    link: ''
                },
                number: 0,
                content: '',
                ticket_times: 0,
                share_counts: 0,
                share_counts_text: ''
            },
            discussList: [],
            showShareTip: false,
            btnStyle: {
                color: '#616665',
                backgroundColor: '#fff'
            },
            panel: {
                isOpen: false,
                title: '',
                content: '',
                btnText: '',
                sureClick() {}
            },
            loginOption: {
                reg_from: Api.alias
            }
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.getDetail();
        },
        getDetail() {
            Api.getDetail({
                wid: this.$route.query.id
            }).then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.sound = res.data;
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        getSoundDiscuss(pagination, callback) {
            Api.getSoundDiscuss({
                wid: this.$route.query.id,
                p: pagination.currentPage,
                row: pagination.perPage
            }).then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                callback && callback(res);
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        goSingerPage(id) {
            RouterUtil.go(`/singer/${id}`, this.$router);
        },
        ...methods
    }
};
</script>

<style type="text/css" lang="less" scoped>
  @import './main.less';
</style>
