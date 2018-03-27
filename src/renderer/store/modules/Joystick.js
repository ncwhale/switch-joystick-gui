

const state = {
  port_name: '',
};

const getters = {};

const mutations = {
  CHANGE_SERIALPORT_NAME(state, payload) {
    state.port_name = payload;
  },
};

const actions = {
  changePort({ commit }, payload) {
    commit('CHANGE_SERIALPORT_NAME', payload);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
