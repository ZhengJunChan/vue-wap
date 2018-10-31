<!-- [topic_page]   @Author: 郑君婵   @DateTime: 2017-09-29 -->
<template>
  <div class="topic_detail_page">
    <div class="padiing_content">
      <user-header-label :info="topic" />

      <tag-list v-if="topic.tag && topic.tag.length" class="tag_list" :list="topic.tag"></tag-list>

      <p class="text_content" v-html="$parseHtml(topic.content)"></p>

      <div class="img_list" v-if="topic.imglist">
        <img v-for="img in topic.imglist_info" :src="$fixImg(img.link)">
      </div>

      <music-label class="music_label" :type="getLabelType(topic.item_type)" :info="topic.item_info" :default-cover="topic.share_default_img_info" v-if="topic.item_info" />

      <location class="location" :addr="topic.place_desc" v-if="topic.place_desc" />
    </div>

    <!-- ************************ 投票 ************************ -->
    <div class="vote padiing_content" v-if="topic.choice == 1">
      <cell class="title" title="投票" />

      <p class="min_title">{{ topic.question_name }}({{topic.votetype > 1 ? '多选' : '单选'}})</p>

      <ul class="vote_detail">
        <li v-for="option in topic.vote" :class="{'show_process': topic.hide!=2}">
          <div class="option_title">
            <div class="option_name" v-text="option.optionname"></div>
            <div class="checker fr" @click="selected(option.id)" :class="{'selected': selectedIds.indexOf(option.id) >= 0}"></div>
          </div>

          <div class="clear_float process_box" :class="{'selected': selectedIds.indexOf(option.id) >= 0}">
            <div class="process_label">
                <div class="process_bar">
                  <div class="process_item" :style="{width: computedVotePreCount(option.votenum)}"></div>
                </div>

                <span class="vote_per" v-text="computedVotePreCount(option.votenum)"></span>
            </div>
            <div class="vote_num" v-text="formatNumber(option.votenum) + '票'"></div>
          </div>
        </li>
      </ul>

      <div class="vote_discuss">
        <textarea placeholder="说说你的看法吧~" maxlength="46"></textarea>
        <button @click="getDownloadPage()">投票</button>
      </div>
    </div>
    <!-- ************************ / 投票 ************************ -->

    <related-topics :list="topic.recommend" :max-num="10" v-show="topic.recommend && topic.recommend.length"></related-topics>

    <div v-if="hotDiscuss.length">
        <cell class="cell_title" title="热门评论" />

        <discuss-list class="discuss_list no_bottom_border" :list="hotDiscuss" :max-num="page.perPage"></discuss-list>
    </div>

    <div v-if="discussList.length">
        <cell class="cell_title" title="全部评论" />

        <discuss-list class="discuss_list" :list="discussList" :max-num="page.perPage"></discuss-list>
    </div>

    <div class="more_btn" v-if="page.totalCount > page.perPage">
      <span @click="getDownloadPage()">查看全部评论</span>
    </div>
  </div>
</template>

<script type="text/javascript">
import TopicApi from './../topic-api.js';
import { RouterUtil } from '@/utils';
import { formatNumber } from '@/filters';

import { HeaderImg, MusicLabel, TagList, RelatedTopics, DiscussList, MoreBtn, UserHeaderLabel, Location, Cell } from '@/components';

export default {
    components: {
        Cell,
        HeaderImg,
        MusicLabel,
        TagList,
        RelatedTopics,
        DiscussList,
        MoreBtn,
        UserHeaderLabel,
        Location
    },
    data() {
        return {
            topic: {
                head_info: {
                    link: ''
                },
                tag: [],
                content: '',
                imglist: [],
                place_desc: ''
            },
            topicId: this.$route.query.id,
            discussList: [],
            page: {
                perPage: 3,
                totalCount: 0
            },
            hotDiscuss: [],
            selectedIds: [],
            processLength: 300 // 投票后，进度条长度（单位：px）
        };
    },
    created() {
        this.init();
    },
    watch: {
        '$route.query.id': function (id) {
            this.topicId = id;

            this.init();
        }
    },
    methods: {
        init() {
            this.getTopicDetail();
            this.getDiscussList();
        },
        /**
         * [getTopicList 获取TA的音乐头部信息]
         * @Author   郑君婵
         * @DateTime 2017-10-12
         */
        getTopicDetail() {
            let params = {
                id: this.topicId
            };

            TopicApi.getTopicDetail(params).then((res) => {
                if (res.code !== 200) {
                    return;
                }

                this.topic = res.data;

                this.$share({
                    imgUrl: res.data.imglist_info && (res.data.imglist_info.length > 0) && res.data.imglist_info[0].link,
                    desc: res.data.content,
                    title: res.data.title
                });
            });
        },
        /**
         * [getMusicsList 获取音乐列表]
         * @Author   郑君婵
         * @DateTime 2017-10-12
         */
        getDiscussList() {
            let params = {
                row: this.page.perPage,
                id: this.topicId
            };

            TopicApi.getDiscussList(params).then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                if (res.page.totalCount > this.page.perPage) {
                    this.getHotDiscuss();
                }

                this.discussList = res.data;      // 轮播列表
                this.page = res.page;
            });
        },
        getHotDiscuss() {
            let params = {
                order: 'thcount-desc',
                row: this.page.perPage,
                id: this.topicId
            };

            TopicApi.getDiscussList(params).then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.hotDiscuss = res.data;      // 轮播列表
            }, (error) => {
                this.$toast.error(error.msg || '获取数据失败');
            });
        },
        getDownloadPage() {
            RouterUtil.getDownloadPage(this.router);
        },
        selected(id) {
            if (!this.selectedIds.length) {
                this.selectedIds.push(id);
                return;
            }

            if (this.topic.votetype === 1) {
                this.selectedIds = [];
                this.selectedIds.push(id);
                return;
            }

            if (this.topic.votetype > this.selectedIds.length) {
                let index = this.selectedIds.indexOf(id);

                if (index < 0) {
                    this.selectedIds.push(id);
                } else {
                    this.selectedIds.splice(index, 1);
                }
                return;
            }
        },
        /**
         * [computedVotePreCount 计算投票百分数]
         * @Author   郑君婵
         * @DateTime 2017-08-08
         * @param    {[Number]}   num [该项投票数]
         * @return   {[string]}       [百分数]
         */
        computedVotePreCount(num) {
            let per = this.computedProsessPre(num);

            return per + '%';
        },
        /**
         * [computedProsess 计算投票百分比]
         * @Author   郑君婵
         * @DateTime 2017-08-08
         * @param    {[Number]}   num [该项投票数]
         * @return   {[string]}       [百分比]
         */
        computedProsessPre(num) {
            let per = 0;

            if (num && this.topic.sumvotenum) {
                per = parseInt(num / this.topic.sumvotenum * 100);
            }

            return per;
        },
        getLabelType(type) {
            switch (Number(type)) {
            case 1: type = 'music'; break;
            case 2: type = 'song'; break;
            case 3: type = 'topic'; break;
            case 4: type = 'mv'; break;
            }

            return type;
        },
        formatNumber
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
