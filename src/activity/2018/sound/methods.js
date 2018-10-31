import Api from './spring-api.js';
import CommonApi from './../../common/common.js';

export default {
    fixContent(content) {
        if (content.length > 53) {
            content = content.slice(0, 50) + '...';
        }

        return content;
    },
    isEndActivity() {
        let _this = this;

        this.$parent.activity.isEnd && Object.assign(_this.panel, {
            isOpen: true,
            title: '活动结束',
            content: '活动已结束，下次再来吧~',
            sureClick() {
                _this.panel.isOpen = false;
            }
        });

        return this.$parent.activity.isEnd;
    },
    isLogined() {
        !this.$parent.isLogined && this.$store.dispatch('login', {
            vue: this,
            options: {
                reg_from: Api.alias
            }
        });

        return this.$parent.isLogined;
    },
    vote(item, callback) {
        if (!this.isLogined()) {
            return;
        }

        Api.vote({
            wid: item.id
        }).then(res => {
            item.ticket_times++;
            this.$toast.error(res.msg);

            callback && callback();
        }).catch(error => {
            if (error.code === 400) {
                let _this = this;

                Object.assign(this.panel, {
                    isOpen: true,
                    title: '温馨提示',
                    content: error.msg,
                    sureClick() {
                        _this.panel.isOpen = false;
                    }
                });
            } else {
                this.$toast.error(error.msg);
            }
        });
    },
    share(sound, callback) {
        let infos = {
            id: sound.id,
            title: `我在“源音塘2周年  我为音乐发声”分享了我的音乐故事`,
            sinaDescription: `@源音塘音乐，我在参加#源音塘2周年 我为音乐发声#话题活动,快来参与活动抽大奖吧！`,
            type: 6,
            alias: Api.alias, // 活动别名
            inputText: '@源音塘音乐，我在参加#源音塘2周年 我为音乐发声#话题活动,快来参与活动抽大奖吧！', // 分享时，填充的话语。如：分享至微博，用户可输入的输入框中默认文字
            link: `${window.location.origin + this.$parent.activity.baseUrl}/detail?id=${sound.id}`, // 分享链接
            imgUrl: sound.head_info.link, // 分享图标
            desc: '快来帮我点赞抽大奖吧，琥珀虚颜二次元智能机器人、beats耳机、YSL口红、源音塘大礼包...等你领，100%中奖~' // 分享描述
        };

        if (!isNaN(Number(sound.share_counts_text))) {
            sound.share_counts_text = Number(sound.share_counts_text) + 1;
        }

        CommonApi.showShareWindow(this, infos, callback);
    },
    discuss(item) {
        if (this.isEndActivity() || !this.isLogined()) {
            return;
        }

        if (!item) {
            item = this.sound;
        }

        let _this = this;

        this.$store.commit('showMessageAlert', {
            id: this.$parent.activity.id,
            type: 5,
            min: 1,
            max: 140,
            btn: {
                text: '告白',
                color: '#fff',
                disabledColor: 'rgba(255, 140, 164, 0.5)',
                validColor: '#ff8ca4'
            },
            selectedColor: '#735fb0',
            title: '源音塘2周年 我为音乐发声',
            submit(params) {
                Api.discuss({
                    wid: item.id,
                    content: params.content
                }).then(res => {
                    _this.$store.commit('closeMessageAlert');
                    _this.$toast.error(res.msg);
                    !isNaN(Number(item.comment_times)) && item.comment_times++;
                    _this.discussList && _this.discussList.unshift(res.data);
                }).catch(error => {
                    _this.$toast.error(error.msg);
                });
            },
            submitCallback() {}
        });
    },
    showMessageAlert() {
        // console.log(this.isEndActivity());
        // console.log(this.isLogined());
        // console.log(this.$parent.user);
        if (this.isEndActivity() || !this.isLogined()) {
            return;
        }

        let _this = this;
        // console.log(this.$parent.user.count);

        // 判断是否发布过歌曲
        if (!this.$parent.user.count.releaseCount) {
            // 没有发布过歌曲,提示用户发布歌曲
            Object.assign(this.panel, {
                isOpen: true,
                headerImg: '',
                headerColor: '',
                title: '确定发布',
                content: '请至少发布1首作品',
                sureClick() {
                    _this.panel.isOpen = false;
                }
            });

            return;
        }

        Api.getMySound().then(res => {
            if (res.data.length) {
                this.$toast.error('你已发布');
            } else {
                this.$store.commit('showMessageAlert', {
                    id: this.$parent.activity.id,
                    type: 5,
                    min: 5,
                    max: 500,
                    showShare: true,
                    btn: {
                        text: '发声',
                        color: '#fff',
                        disabledColor: 'rgba(191, 177, 234, 0.5)',
                        validColor: '#bfb1ea'
                    },
                    selectedColor: '#735fb0',
                    title: '源音塘2周年 我为音乐发声',
                    submit: this.release,
                    submitCallback() {}
                });
            }
        }).catch(error => {
            this.$toast.error(error.msg);
        });
    },
    release(params) {
        let _this = this;
        // 没有发布过歌曲,提示用户发布歌曲
        Object.assign(_this.panel, {
            isOpen: true,
            title: '确定发布',
            content: '每位音乐人仅可发布一条，且不可更改',
            sureClick() {
                _this.$store.commit('closeMessageAlert');

                Api.release({
                    to_topic: params.isShare ? 1 : 0,
                    content: params.content
                }).then(res => {
                    _this.$store.commit('closeMessageAlert');
                    _this.releaseSuccess();
                    _this.searchPrizeCount && _this.searchPrizeCount();
                }).catch(error => {
                    _this.$toast.error(error.msg);
                });

                _this.panel.isOpen = false;
            }
        });
    },
    releaseSuccess() {
        let _this = this;
        // 没有发布过歌曲,提示用户发布歌曲
        Object.assign(_this.panel, {
            isOpen: true,
            title: '发布成功',
            content: '在微博添加话题<br>#源音塘2周年我为音乐发声#<br>并@源音塘才可视为参赛成功哦',
            sureClick() {
                _this.panel.isOpen = false;
            }
        });
    }
};
