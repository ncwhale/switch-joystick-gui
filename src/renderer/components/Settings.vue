<template lang="pug">
.settings-page
  ChooseFolder
  ChoosePort
</template>

<script>
import ChoosePort from './Settings/ChoosePort'
import ChooseFolder from './Settings/ChooseFolder'

export default {
  name: 'settings',
  components: {
    ChoosePort,
    ChooseFolder
  },
};
</script>
