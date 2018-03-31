<template lang="pug">
#app
  .page-container
    md-app(md-waterfall='', md-mode='fixed')
      md-app-toolbar.md-primary.electrol-dragable
        .md-toolbar-row
          .md-toolbar-section-start
            md-button.md-icon-button.electrol-none-drag(@click='menuVisible = !menuVisible')
              md-icon menu
            span.md-title {{Title}}
          .md-toolbar-section-end
            router-link.md-icon-button.electrol-none-drag(v-show!="!isSettingsPage", tag='md-button', to='/settings')
              md-icon settings
            router-link.md-icon-button.electrol-none-drag(v-show!="isSettingsPage", tag='md-button', to='/')
              md-icon done
      md-app-drawer(:md-active.sync="menuVisible")
        md-toolbar.md-transparent(md-elevation='0')
          | Navigation
        md-list(@click='menuVisible = false')
          router-link(tag='md-list-item' to='/')
            md-icon home
            span.md-list-item-text Home
          router-link(tag='md-list-item' to='/settings')
            md-icon settings
            span.md-list-item-text Settings
      md-app-content
        router-view
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'joystick-scripter-gui',
  data() {
    return {
      menuVisible: false,
      isSettingsPage: false,
    }
  },
  computed: {
    Title() {
      if('title' in this.$route.meta) {
        return this.$route.meta.title
      }

      return 'Home'
    },
  },
  watch: {
    $route() {
      this.isSettingsPage = this.$route.name === 'setting-page'
    }
  }
};
</script>

<style>
.md-app {
  height: 100vh;
}

.electrol-dragable {
  -webkit-app-region: drag;
}

.electrol-none-drag {
  -webkit-app-region: no-drag;
}
</style>
