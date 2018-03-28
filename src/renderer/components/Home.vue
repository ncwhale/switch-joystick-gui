<template lang="pug">
div
  .test-area
    button(@click="start") Boom!
</template>

<script>
import SerialPort from 'serialport'
import Joystick from '~/scripts/joystick'
import { mapState } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      // serial_port: null,
      // joystick: null,
    }
  },
  computed: {
    ...mapState({
      port_name: state => state.Joystick.port_name,
    }),
  },
  methods: {
    start() {
      if (this.serial_port != null) {
        if (this.serial_port.isOpen) this.serial_port.close()
        this.serial_port = null
      }

      this.serial_port = new SerialPort(this.port_name, {
        autoOpen: true,
        baudRate: 250000, // 250k bps
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
      })

      this.joystick = new Joystick(this.serial_port)
    },
  },
  components: {},
};
</script>

