import Vue from 'vue';
import Vuex from 'vuex';

import wx from './wx';
import alert from './alert';
import player from './player';
import user from './user';
import configs from './configs';

// vux提供的插件
const vux = {
    state: {
        isLoading: false
    },
    mutations: {
        updateLoadingStatus(state, payload) {
            state.isLoading = payload.isLoading;
        }
    }
};

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        player,
        vux,
        wx,
        user,
        alert,
        app: configs
    }
});

export default store;
