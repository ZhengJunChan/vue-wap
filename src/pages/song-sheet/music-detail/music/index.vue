<!-- [music_detail_page]   @Author: 郑君婵   @DateTime: 2017-09-28 -->
<template>
  <div class="music_detail_page">
    <div class="music_body">
        <h2 class="title" v-text="musicInfos.title"></h2>
        <p class="nikname" v-text="musicInfos.nickname" @click="goMusicianDetail(musicInfos.uid)"></p>

        <div class="play_box">
            <div class="play_btn" @click="play" :class="{playing}"
            :style="{backgroundImage: `url(${musicInfos.imgpic_info && $fixImg(musicInfos.imgpic_info.link, 'w=300&h=300')})`}"></div>
        </div>

        <div class="rly" v-if="musicInfos.lyrics_data.length" id="rly">
            <p v-for="(item, index) in musicInfos.lyricsList" :key="index" v-text="getLyText(item)"
             :class="{active: activeIndex === index}" :ref="`rly${index}`"></p>
        </div>

        <div class="rly" v-html="$parseHtml(this.musicInfos.lyrics) || '暂无歌词'" v-else></div>

        <div class="up_icon">
            <span @click="upScroll"></span>
        </div>
    </div>

    <div class="partner box" v-if="musicInfos.member.length">
        <div class="title">
            <cell title="参与小伙伴" />
        </div>
        <div>
            <div class="item" v-for="(item, index) in musicInfos.member">
                <div class="type">{{item.music_type}}：</div>
                <div class="people">
                    <div :class="{user: Number(user.uid) > 0}" v-for="(user, index) in item.member">
                        <header-img v-if="Number(user.uid) > 0" class="header_img" :size="48" :header-img="user.head_info.link" :header-id="user.uid" :vip="user.is_music == 3"></header-img>
                        <span v-text="user.nickname"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="intro box" v-if="musicInfos.intro">
        <p class="content" :class="!isShowMoreIntro&&'five_lines'" v-html="parseIntIntro(musicInfos.intro)" ref="content"></p>

        <div class="more_text" v-if="isOverContent">
            <p @click="tiggerMore" v-if="isShowMoreIntro">
                收起
            </p>

            <p @click="tiggerMore" v-else>
                展开
            </p>
        </div>
    </div>

    <div class="box" v-if="musicInfos.song_all.length">
        <div class="title">
            <cell title="相关歌单" />
        </div>

        <song-sheet-list :list="musicInfos.song_all" type="list" :max-num="6"></song-sheet-list>
    </div>
  </div>
</template>

<script type="text/javascript">
import $ from 'jquery';
import { mapState } from 'vuex';
import { RouterUtil } from '@/utils';

import Cell from '@/components/cell';
import HeaderImg from '@/components/header-img';
import SongSheetList from '@/components/song-sheet/song-sheet-list';

export default {
    props: {
        musicInfos: Object
    },
    components: {
        Cell,
        SongSheetList,
        HeaderImg
    },
    data() {
        return {
            scollHeight: 0,
            activeIndex: 0,
            musicId: this.$route.params.id, // 歌单id
            isOverContent: true,
            isShowMoreIntro: true
        };
    },
    computed: {
        ...mapState({
            playingId: state => !state.player.playing.song.pause && state.player.playing.song.id,
            currentTime: state => state.player.playing.currentTime
        }),
        playing() {
            return this.playingId === Number(this.musicId);
        }
    },
    watch: {
        'musicInfos.lyrics_data': function (lyrics) {
            if (lyrics.length) {
                this.buildLyrics();
            }
        },
        'musicInfos.intro': function (intro) {
            if (!intro) {
                return;
            }

            this.$nextTick(() => {
                this.setOverContent();
            });
        },
        currentTime(currentTime) {
            if (currentTime === 0) {
                this.scollHeight = 0;
                this.activeIndex = 0;
            }

            if ((currentTime + 1) > this.getLyTime(this.musicInfos.lyrics_data[this.activeIndex + 1])) {
                this.musicInfos.lyrics_data[this.activeIndex].isActive = false;
                this.$set(this.musicInfos.lyrics_data[this.activeIndex + 1], 'isActive', true);

                this.activeIndex ++;
                $('#rly').animate({
                    scrollTop: this.scollHeight
                }, 300);

                this.scollHeight += this.$refs[`rly${this.activeIndex + 1}`][0].offsetHeight;
            }
        }
    },
    methods: {
        getLyTime(item) {
            for (let key in item) {
                if (key !== 'isActive') {
                    return Number(key);
                }
            }
        },
        getLyText(item) {
            for (let key in item) {
                if (key !== 'isActive') {
                    return item[key];
                }
            }
        },
        setOverContent() {
            this.isOverContent = this.$refs.content.offsetHeight > 216 * parseFloat(document.documentElement.style.fontSize) / 100;
            this.isShowMoreIntro = false;
        },
        tiggerMore() {
            this.isShowMoreIntro = !this.isShowMoreIntro;
        },
        buildLyrics() {
            this.musicInfos.lyricsList = this.musicInfos.lyrics_data ? this.musicInfos.lyrics_data : this.musicInfos.lyrics ? this.$parseHtml(this.musicInfos.lyrics) : '暂无歌词';
        },
        parseIntIntro(intro) {
            if (!intro) {
                return '';
            }

            intro = intro.replace(/\\n/g, '</br>').replace(/\n/g, '</br>').replace(/ /g, '&nbsp;');

            return intro;
        },
        play() {
            let params = {
                music: this.musicInfos,
                addPlayCount: this.addPlayCount
            };
            this.$store.dispatch('playSong', params);
        },
        addPlayCount() {
            this.musicInfos.counts++;
        },
        getDownloadPage() {
            RouterUtil.getDownloadPage(this.$router);
        },
        goMusicianDetail(id) {
            this.go(`/singer/${id}`);
        },
        go(link) {
            RouterUtil.go(link, this.$router);
        },
        upScroll(evet) {
            $('.music_detail_page').animate({
                scrollTop: event.target.offsetTop
            }, 300);
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
