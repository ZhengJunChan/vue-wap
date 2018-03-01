import fall from './fall-activity.js';
import pets2017 from './pets2017.js';
import report2017 from './2017report.js';
import school from './school.js';
import concert from './concert.js';
import common from './common.js';

import _2018 from './2018';

let pages = [];

let activity = [{
    path: '/activity',
    component: resolve => require(['@/activity/index.vue'], resolve),
    children: pages.concat(school, concert, common, _2018)
}];

activity = activity.concat(fall, pets2017, report2017);

export default activity;
