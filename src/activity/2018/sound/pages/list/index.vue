<template>
  <div class="list_page" id="detailPage">
  	<div class="list">
      <img class="title_img" src="./../../imgs/img-liuyanban-title.png" onclick="return false">

      <div class="purple_box qiang">
        <div class="inner box">
        	<div class="nav_label clear_float">
        		<div class="fl btn"
        		:class="{selected: search.order === 'ticket_times-desc'}"
        		@click="resetOrder('ticket_times-desc')">热门</div>
        		<div class="fl btn"
        		:class="{selected: search.order === 'id-desc'}"
        		@click="resetOrder('id-desc')">最新</div>
        		<div class="fr btn purple_btn max" @click="showMessageAlert" v-if="!$parent.activity.isEndVote">我要发声><div class="go">GO</div></div>
        	</div>
        	<div class="search_label">
                <input type="text" placeholder="输入昵称/编号搜索" v-model="search.key">
                <button @click="searchKey"></button>
            </div>
          <div class="items clear_float">
            <div class="item" v-for="(item, index) in list" :key="index">
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
                <div class="btn fr share" @click="share(item)">
                  <span class="text_icon" v-text="item.share_counts ? item.share_counts_text : '分享'"></span>
                </div>
              </div>
              <div class="btn zan" @click="vote(item)">
                <span class="text_icon" v-text="item.ticket_times || '点赞'"></span>
              </div>
            </div>
            <div class="empty_tip" v-show="!list.length">
                <img class="empty_img" src="./../../../../../imgs/common/img_zhongjiangjilv_nothing.png" onclick="return false">
                <p>呜呜呜，没有找到和<span class="search_key">“{{emptyTip}}”</span>相关的内容</p>
            </div>
          </div>

          <div class="pagination_box" v-show="pagination.pageCount > 1">
              <pagination :options="paginationOptions" :pagination="pagination" :callback="loadMore" :scrollTo="true"></pagination>
          </div>

          <div class="clear_float bottom_label" v-show="list.length > 3" v-if="!$parent.activity.isEndVote">
            <div class="fl btn" @click="showMessageAlert">我是音乐人，我要发声 ></div>
          </div>
        </div>
      </div>
    </div>
     <!--   /  抽奖弹框  -->
    <alert-panel :title="panel.title" v-model="panel.isOpen" :btn-text="panel.btnText" :content="panel.content" @sureClick="panel.sureClick"></alert-panel>
  </div>
</template>

<script type="text/javascript">
import $ from 'jquery';
import Api from './../../spring-api.js';
import methods from './../../methods.js';
import Pagination from '@/components/pagination';
import { RouterUtil } from '@/utils';
import AlertPanel from './../../components/alert-panel';

export default {
    components: {
        Pagination,
        AlertPanel
    },
    data() {
        return {
            selectedNav: '',
            search: {
                index: -1,
                order: 'ticket_times-desc',
                key: ''
            },
            emptyTip: '',
            list: [],
            pagination: {
                totalCount: 0,
                perPage: 20,
                currentPage: 1,
                pageCount: 0
            },
            paginationOptions: {
                itemColor: 'purple',
                isScroll: false
            },
            panel: {
                isOpen: false,
                title: '',
                content: '',
                btnText: '',
                sureClick() {}
            }
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            // 获取作品列表
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
        /**
         * [getEntries 获取作品列表]
         * @Author   郑君婵
         * @DateTime 2018-01-05
         */
        getEntries() {
            let params = {
                p: this.pagination.currentPage,
                row: this.pagination.perPage,
                order: this.search.order,
                keyword: this.search.key
            };

            Api.getEntries(params).then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.list = res.data;
                this.pagination = res.page;

                if (!this.list.length) {
                    this.emptyTip = this.search.key;
                }
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        goSingerPage(id) {
            RouterUtil.go(`/singer/${id}`, this.$router);
        },
        goSoundDetailPage(id) {
            RouterUtil.go(`/activity/sound/detail?id=${id}`, this.$router);
        },
        loadMore() {
            this.getEntries();
            $('#detailPage').animate(0, 10);
        },
        ...methods
    }
};
</script>

<style type="text/css" lang="less" scoped>
  @import 'main.less';
</style>
