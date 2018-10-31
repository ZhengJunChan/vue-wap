/**
 * Created by Administrator on 2018/1/26.
 */

var getPonents = function (title, keys) {
    let o = {};
    title = title || '';
    if (!keys || !keys.length) { return; }
    if (Object.prototype.toString.call(keys) === '[object Array]') {
        keys.map((k) => {
            if (k) {
                o[title + k] = resolve => require([`@/activity/2018/gather-prize/pages/${k}/index.vue`], resolve);
            }
        });
    }
    return o;
};
function WatchWindowH() {
    var a = '';
    this.setEvent = function (fn) {
        setE(fn);
    };
    this.removeEvent = function () {
        removeE();
    };
    function setE(fn) {
        if (typeof fn === 'function') {
            removeE();
        }
        if (typeof fn === 'function') {
            a = function () {
                typeof fn === 'function' && fn();
            };
            window.addEventListener('resize', a, false);
        }
    };
    function removeE() {
        if (typeof a === 'function') {
            window.removeEventListener('resize', a, false);
            a = '';
        }
    };
};
const prizeType = {
    'init': 'init',
    '3': 'coin',
    '4': 'error',
    'musicer_wish': 'sound',
    'year_sign': 'ticket',
    'fortune_dog': 'bless',
    'love_dog': 'bless',
    'cause_dog': 'bless',
    'happy_dog': 'bless'
};
const prizePageTitle = {
    init: '',
    coin: '甜甜圈祝福',
    bless: '抽中拼图狗',
    ticket: '2018新年福签',
    sound: '语音祝福',
    error: '次元空间'
};
let setWindowClose = function (othis) {
    window.addEventListener('beforeunload', function () {
        window.sessionStorage.isPageLoading = 'true';
    });
    window.addEventListener('unload', function () {
        if (!window.sessionStorage.isPageLoading && othis.isFirstLoad) {
            othis.callAppFunction('playOrpause', {'status': 'play'});
        }
    });
};
export default {
    getPonents,
    prizeType,
    prizePageTitle,
    WatchWindowH,
    setWindowClose
};
