import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        field: [],
    },
    mutations: {
        setField(state, value) {
            let obj = JSON.parse(JSON.stringify(state.field));
            obj = value;
            state.field = obj;
        },
    },
    actions: {
    },
    getters: {
        getField(state) {
            return state.field;
        },
    }
});
