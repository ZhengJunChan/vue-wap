import Vue from 'vue';
import Vuex from 'vuex';

import wx from './wx';
import player from './player';
import user from './user';

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
        user
    }
});

export default store;
