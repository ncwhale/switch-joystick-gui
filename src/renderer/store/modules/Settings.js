const state = {
  port_name: '',
  script_folder: '.',
};

const getters = {};

const mutations = {
  CHANGE_SERIALPORT_NAME(state, payload) {
    state.port_name = payload;
  },
  CHANGE_SCRIPT_FOLDER(state, payload) {
    state.script_folder = payload;
  }
};

const actions = {
  changePort({ commit }, payload) {
    commit('CHANGE_SERIALPORT_NAME', payload)
  },
  changeScriptFolder({ commit }, payload) {
    commit('CHANGE_SCRIPT_FOLDER', payload)
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
