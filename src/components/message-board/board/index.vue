<!-- [message_board_alert_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->
<template>
    <div class="message_board" ref="messageBoard">
        <slot name="title"></slot>

        <div class="main">
            <!-- <div class="write_message_btn btn1" @click="showMessageBoard" v-show="list.length > 7">写留言~</div> -->
            <ul class="messages">
                <li v-for="item in list">
                    <header-img class="header" :size="80" :header-img="item.head_info ? item.head_info.link : item.head_link"></header-img>
                    <div>
                        <p class="nikname" v-text="item.nickname"></p>
                        <p class="text_desc" v-text="item.content"></p>
                    </div>
                    <icon-zan class="zan" :id="item.id" type="4" v-model="item.agrees" :selected="!!item.is_agree" />
                </li>

                <div class="empty_box" v-show="!list.length">
                    <img class="empty_img" src="./../../../imgs/yuanxiaoyi/img_none_pinglun.png" onclick="return false">
                    <slot name="emptyTip" class="text_tip"></slot>
                </div>
            </ul>

            <div class="pagination_box" v-show="pagination.pageCount > 1">
                <pagination :options="paginationOptions" :pagination="pagination" :callback="loadMore" :scrollTo="true"></pagination>
            </div>
        </div>

        <div class="write_message_btn btn2" @click="showMessageBoard" v-show="list.length" v-text="btnText || 写留言" :style="btnStyle">写留言</div>

    </div>
</template>

<script type="text/javascript">
import $ from 'jquery';
import { mapState } from 'vuex';
import { CommentApi } from '@/api';
import MessageAlert from './../alert';
import IconZan from './../../icon/zan';
import HeaderImg from './../../header-img';
import Pagination from './../../pagination';
import EmptyTip from './../../empty-tip';

export default {
    components: {
        IconZan,
        HeaderImg,
        Pagination,
        MessageAlert,
        EmptyTip
    },
    props: {
        options: Object,
        btnStyle: Object,
        btnText: String,
        getList: Function,
        submit: Function,
        title: String,
        value: Array,
        id: [String, Number],
        type: [String, Number]
    },
    data() {
        return {
            pagination: {
                totalCount: 0,
                perPage: 20,
                currentPage: 1,
                pageCount: 0
            },
            paginationOptions: {
                itemColor: 'purple',
                isScroll: false
            }
        };
    },
    computed: {
        list: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        },
        ...mapState({
            isLogined: state => state.user.isLogined
        })
    },

    mounted() {
        this.getMessageList();
    },
    watch: {
        id(val) {
            val && this.getMessageList();
        }
    },
    methods: {
        loadMore() {
            this.getMessageList();
            $('.message_bord_scroller').animate({
                scrollTop: this.$refs.messageBoard.offsetTop - 60
            }, 10);
        },
        getMessageList() {
            this.getList ? this.getCustomList() : this.id && this.getActivityMessage();
        },
        getCustomList() {
            this.getList(this.pagination, res => {
                this.list = res.data;
                this.pagination = res.page;
            });
        },
        getActivityMessage() {
            let params = {
                type: this.type,
                item_id: this.id,
                order: 'agrees-desc',
                p: this.pagination.currentPage,
                row: this.pagination.perPage
            };

            CommentApi.getCommentList(params).then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.list = res.data;
                this.pagination = res.page;
            }).catch(error => {
                this.$toast.error(error.msg);
            });
        },
        showMessageBoard(id) {
            if (this.$store.state.user.isLogined) {
                this.submit ? this.submit() : this.$store.commit('showMessageAlert', {
                    id: this.id,
                    type: this.type,
                    title: this.title,
                    submitCallback: this.submitCallback
                });
            } else {
                this.$store.dispatch('showAlert', {
                    type: 'login'
                });
                this.$store.dispatch('login', {
                    vue: this,
                    options: this.options
                });
            }
        },
        submitCallback(data) {
            this.list.unshift(data);
        }
    }
};
</script>

<style lang="less">
@import './main.less';
</style>
