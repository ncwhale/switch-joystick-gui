<template lang="pug">
.settings-page
  router-link(to='/') home  
  ChoosePort
</template>

<script>
import ChoosePort from './Settings/ChoosePort';

export default {
  name: 'settings',
  components: {
    ChoosePort,
  },
};
</script>
