/**
 * 接口文档
 * @Author: 郑君婵
 * @DateTime: 2017-11-15
 *
 * 调用方：wap
 * app提供给前端的接口，当wap页嵌套早app内时调用，调用方式如下
 */

网址中键值对含义： {
  token: '', // 用户token
  logAt: '2' // 2：Ios 3：Android
  // uid: '', // 用户id
  // isLogined: '' // 用户是否登录, true: 登录，'false'：未登录
}

// 分享接口：
this.callAppFunction('share', {
  title: '分享标题', // 分享标题
  type: 5, // 5:抽奖活动,6:投票活动
  alias: '', // 活动别名
  inputText: '', // 分享时，填充的话语。如：分享至微博，用户可输入的输入框中默认文字
  link: window.location.origin + '/ciyuan2017', // 分享链接
  imgUrl: window.location.origin + '/static/imgs/activity/2017/concert.png', // 分享图标
  desc: '源音塘次元音乐会现场嘉宾' // 分享描述
});

// toast弹框接口
this.callAppFunction('toast', {
  type: '弹框类型', // success：成功； fail：失败； tip：提示
  text: '提示文字'
});

// 页面跳转接口
this.callAppFunction('go', {
  url: '网页地址',
  title: '网页title',
  activity: 'activity', // 是活动就传，不是活动就不传（包括键名都不传）
  headerType: '头部类型' // share：分享，submit：提交
});

// 设置title
this.callAppFunction('setTitle', {
  title: '网页title',
  headerType: '头部类型' // share：分享，submit：提交
});

// 设置token
this.callAppFunction('setTokens', {
  token: '需要设置的token值'
});

// 打开app登录页
this.callAppFunction('gotoLogin');

/**
 * 作者:[yangbin]
 * 时间: 2018/1/31 18:11
 * 功能介绍：图片预览方法：showImg，参数：{}
 * 参数：{"imgUrl_arr":["url","url"],"index":0}  index 是点击位置，比如有三张图，点击中间的，index就是1
 */

this.callAppFunction('showImg');
/**
 * 作者:[yangbin]
 * 时间: 2018/1/31 18:11
 * 功能介绍：关闭弹框
 * 参数：
 */
this.callAppFunction('closeLotteryDialog');
/**
 * 作者:[yangbin]
 * 时间: 2018/1/31 18:11
 * 功能介绍：打开分享弹框
 * 参数：{
    title: '分享标题', // 分享标题
    type: 5, // 5:抽奖活动,6:投票活动
    alias: '', // 活动别名
    inputText: '', // 分享时，填充的话语。如：分享至微博，用户可输入的输入框中默认文字
    link: window.location.origin + '/ciyuan2017', // 分享链接
    imgUrl: window.location.origin + '/static/imgs/activity/2017/concert.png', // 分享图标
    desc: '源音塘次元音乐会现场嘉宾'// 分享描述
}
 */


this.callAppFunction('showShareWindow');

/**
 * 作者:[yangbin]
 * 时间: 2018/2/7 13:52
 * 功能介绍： 更改app播放状态
 * 参数：play 去播放  pause 去暂停
 */
callAppFunction('playOrpause', {'status': 'play'});
// 返回上一页(并刷新页面，但是要用js自己的跳转)：安卓app可用
this.callAppFunction('goBackPage');

// 返回上一页(不刷新页面)：安卓app可用
this.callAppFunction('goBack');

// 图片预览接口
this.callAppFunction('previewer', {
  list: [{
    src: 'https://placekitten.com/800/400' // 图片地址
  }, {
    src: 'https://placekitten.com/1200/900'
  }], // 图片地址列表
  index: 0 // 图片位置
});

// 设置返回按钮状态
this.callAppFunction('setGoBackStatus', {
  show: false, // 点击返回按钮时，是否点击显示提示框
  title: '标题', // 没有不显示
  content: '提示内容', // 没有不显示
  sureBtnText: '确定按钮',
  cancelBtnText: '取消按钮'
});
