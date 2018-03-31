<template lang="pug">
md-field
  md-icon folder
  label Script Folder
  md-input(:value='ScriptFolder', @click="chooseFolder")
</template>

<script>
const { dialog } = require("electron").remote;
import { mapActions, mapState } from "vuex";

export default {
  name: "folder-setting",
  computed: {
    ...mapState({
      script_folder: state => state.Settings.script_folder
    }),
    ScriptFolder: {
      get() {
        return this.script_folder;
      },
      set(val) {
        return this.changeScriptFolder(val);
      }
    }
  },
  methods: {
    ...mapActions(["changeScriptFolder"]),
    chooseFolder() {
      let path = dialog.showOpenDialog({
          properties: ['openDirectory']
      })

      if(path !== undefined && path.length >= 1) {
        this.changeScriptFolder(path[0])
      }
    }
  }
};
</script>
