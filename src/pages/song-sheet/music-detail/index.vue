 <!-- [music_detail_page]   @Author: 郑君婵   @DateTime: 2017-09-28 -->
<template>
  <div class="music_detail_page">
    <mv-detail :music-infos="musicInfos" v-if="$route.query.type === 'mv'" />
    <music-detail :music-infos="musicInfos" v-else />
  </div>
</template>

<script type="text/javascript">
import MvDetail from './mv';
import MusicDetail from './music';
import { RouterUtil } from '@/utils';

import SongSheetApi from './../song-sheet-api.js';

export default {
    components: {
        MvDetail,
        MusicDetail
    },
    data() {
        return {
            musicId: this.$route.params.id, // 歌单id
            musicInfos: {
                song_all: [],
                likes: [],
                intro: '',
                uid: '',
                lyrics_data: [],
                lyrics: '',
                member: [],
                lyricsList: [],
                mv: '',
                mv_info: {
                    link: ''
                }
            }
        };
    },
    watch: {
        '$route.params.id': function (id) {
            this.musicId = id;

            this.init();
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.getMusicDetail();
        },
        getMusicDetail() {
            let params = {
                id: this.musicId
            };

            SongSheetApi.getMusicDetail(params).then((res) => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                Object.assign(this.musicInfos, res.data);

                if (!this.musicInfos.mv && this.$route.query.type === 'mv') {
                    RouterUtil.replace(this.$route.path, this.$router);
                }

                this.$share({
                    imgUrl: this.musicInfos.imgpic_info.link,
                    desc: this.musicInfos.intro,
                    title: this.musicInfos.title
                });
            }, error => {
                this.$toast.error(error.msg || '获取数据失败');
            });
        }
    }
};
</script>
