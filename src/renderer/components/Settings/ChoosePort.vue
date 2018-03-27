<template lang="pug">
.choose-port
  p 当前设置端口： {{port_name}}
  ul
    li(v-for="port in port_list", @click="changePort(port.comName)") {{port.comName}}
</template>

<script>
import SerialPort from 'serialport';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'PortList',
  data() {
    return {
      port_list: [],
    }
  },
  computed: {
    ...mapState({
      port_name: state => state.Joystick.port_name,
    }),
  },
  methods: {
    ...mapActions(['changePort']),
  },
  async mounted() {
    this.port_list = await SerialPort.list();
  },
};
</script>
