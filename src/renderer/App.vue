<template lang="pug">
#app
  .page-container
    md-app(md-waterfall='', md-mode='fixed')
      md-app-toolbar.md-primary
        .md-toolbar-row
          .md-toolbar-section-start
            md-button.md-icon-button(@click='menuVisible = !menuVisible')
              md-icon menu
          //- md-tabs.md-primary
            //- md-tab#tab-home(md-label='Home')
            //- md-tab#tab-pages(md-label='Pages')
            //- md-tab#tab-posts(md-label='Posts')
            //- md-tab#tab-favorites(md-label='Favorites') 
          .md-toolbar-section-end
            md-button.md-icon-button
              md-icon more_vert
      md-app-drawer(:md-active.sync="menuVisible")
        md-toolbar.md-transparent(md-elevation='0')
          | Navigation
        md-list
          router-link(tag='md-list-item' to='/')
            md-icon move_to_inbox
            span.md-list-item-text Home
          router-link(tag='md-list-item' to='/settings')
            md-icon send
            span.md-list-item-text Settings
          md-list-item
            md-icon delete
            span.md-list-item-text Trash
          md-list-item
            md-icon error
            span.md-list-item-text Spam
      md-app-content
        router-view
</template>

<script>
  export default {
    name: 'joystick-scripter-gui',
    data() {
      return {
        menuVisible: false
      }
    }
  };
</script>

<style>
.md-app {
  height: 100vh;
}
</style>
