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
    md-button.md-primary.md-raised(@click="") Create first script
  md-dialog-alert(:md-active.sync='show_serialport_alert', 
    md-title='Open Serialport Error!', 
    md-content='You have to verify your settings.'
    @md-closed='$router.replace({name:"setting-page"})'
  )
  md-dialog-alert(:md-active.sync='show_watchfolder_alert', 
    md-title='Watch Script Folder Error!', 
    md-content='You have to verify your settings.'
    @md-closed='$router.replace({name:"setting-page"})'
  )
</template>

<script>
import Promise from "bluebird";
import SerialPort from "serialport";
import Joystick from "~/scripts/joystick";
import { mapState } from "vuex";
import { resolve } from "url";

export default {
  name: "Home",
  data() {
    return {
      scripts: [],
      show_serialport_alert: false,
      show_watchfolder_alert: false,
    };
  },
  computed: {
    ...mapState({
      port_name: state => state.Settings.port_name
    })
  },
  watch: {
    port_name() {
      this.init()
    }
  },
  methods: {
    init() {
      this.initSerialPort().catch(err => {
        console.warn(err);
        this.show_serialport_alert = true;
      });

      this.initScriptWatch().catch(err => {
        console.warn(err);
        this.show_watchfolder_alert = true;
      });
    },
    async initSerialPort() {
      if (!this.serial_port) {
        this.serial_port = new SerialPort(this.port_name, {
          autoOpen: false,
          baudRate: 250000, // 250k bps
          dataBits: 8,
          parity: 'none',
          stopBits: 1,
        })
      }

      if (this.serial_port.path !== this.port_name) {
        if (this.serial_port.isOpen) await this.serial_port.close();

        this.serial_port.path = "" + this.port_name;
      }

      if (!this.serial_port.isOpen) {
        await this.serial_port.open();
      }
    },
    async initScriptWatch() {
      throw new Error("Not done yet.");
    },
    deinit() {
      this.deinitSerialPort();
      this.deinitScriptWatch();
    },
    async deinitSerialPort() {
      if (this.serial_port.isOpen) await this.serial_port.close();
    },
    async deinitScriptWatch() {
      throw new Error("Not done yet.");
    }
  },
  components: {},
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.deinit();
  }
};
</script>

<style scoped>
.md-card {
  width: 30%;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
</style>

