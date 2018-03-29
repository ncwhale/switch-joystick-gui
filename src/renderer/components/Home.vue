<template lang="pug">
.home-page
  md-card(md-with-hover='', v-for!='script in scripts', :key='script.name')
    md-ripple
      md-card-header
        .md-title {{script.name}}
      md-card-content {{script.desc}}
      md-card-actions
        md-button.md-icon-button
          md-icon code
        md-button.primary
          md-icon launch
          |  run
  md-empty-state(v-show!='scripts.length === 0', md-icon='devices_other', md-label='Create your first script', md-description="Creating script, you'll be able to control switch as your wish.")
    md-button.md-primary.md-raised(@click="start") Create first script
  md-dialog-alert(:md-active.sync='show_serialport_alert', md-title='Open Serialport Error!', md-content='You have to verify your settings.')
</template>

<script>
import Promise from 'bluebird'
import SerialPort from 'serialport'
import Joystick from '~/scripts/joystick'
import { mapState } from 'vuex';
import { resolve } from 'url';

export default {
  name: 'Home',
  data() {
    return {
      scripts: [],
      show_serialport_alert: false,
    }
  },
  computed: {
    ...mapState({
      port_name: state => state.Joystick.port_name,
    }),
  },
  methods: {
    start() {
      if (this.serial_port !== null) {
        try {
          if (this.serial_port.isOpen) this.serial_port.close()
        } catch(err) {
          console.warn(err)
        }
      }
      
      this.serial_port = null
      this.joystick = null

      return Promise.delay(200).then(() => {
        this.serial_port = new SerialPort(this.port_name, {
          autoOpen: true,
          baudRate: 250000, // 250k bps
          dataBits: 8,
          parity: 'none',
          stopBits: 1,
        })

        this.joystick = new Joystick(this.serial_port)
      }).catch(err => {
        console.log(err)
        this.show_serialport_alert = true
        this.joystick = null
        this.serial_port = null
      })
    },
  },
  components: {},
  mounted() {
    // Do not need reactive on these native objects.
    this.joystick = null
    this.serial_port = null  
  }
};
</script>

<style scoped>
.md-card {
  width: 30%;
  margin: 4px;
  display: inline-block;
  /* vertical-align: top; */
}
</style>

