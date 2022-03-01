import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        field: [],
        tableName: '',
    },
    mutations: {
        setField(state, value) {
            let obj = JSON.parse(JSON.stringify(state.field));
            obj = value;
            state.field = obj;
        },
        setTableName(state, value) {
            state.tableName = value;
        }
    },
    actions: {
    },
    getters: {
        getField(state) {
            return state.field;
        },
        getTableName(state) {
            return state.tableName;
        }
    }
});
