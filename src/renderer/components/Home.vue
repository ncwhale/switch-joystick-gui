<template lang="pug">
.home-page
  md-card(md-with-hover='', v-for!='script in scripts', :key='script')
    md-ripple
      md-card-header
        .md-title {{script_map[script].name}}
      md-card-content {{script_map[script].desc}}
        md-icon {{script_map[script].type}}
      //- md-card-actions
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
import Watcher from "~/scripts/watcher";
import Parser from "~/scripts/parser";
import { mapState } from "vuex";
import { resolve } from "url";
import path from "path";

export default {
  name: "Home",
  data() {
    return {
      scripts: [],
      script_map: {},
      process_files: [],
      show_serialport_alert: false,
      show_watchfolder_alert: false
    };
  },
  computed: {
    ...mapState({
      port_name: state => state.Settings.port_name,
      script_folder: state => state.Settings.script_folder
    })
  },
  watch: {
    port_name() {
      this.init();
    },
    script_folder() {
      this.script_watcher.start(this.script_folder);
    },
    process_files() {
      this.start_parse();
    },
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
          parity: "none",
          stopBits: 1
        });
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
      this.scripts = [];

      if (!this.script_watcher) {
        this.script_watcher = new Watcher(this.script_folder);

        this.script_watcher.on("change", filename => {
          console.log(`Watch file: ${filename}`);
          // Try to reparse that file.
          this.process_files.push(filename);
        });

        this.script_watcher.on("rename", filename => {
          // TODO:???
          this.process_files.push(filename);
        });

        this.script_watcher.on("error", filename => {
          console.warn(`Watch error: ${filename}`);
        });

        this.process_files = this.script_watcher.start();
      } else if (this.script_watcher.watch_dir != this.script_folder) {
        this.process_files = this.script_watcher.start(this.script_folder);
      }
    },
    deinit() {
      this.deinitSerialPort();
      this.deinitScriptWatch();
    },
    async deinitSerialPort() {
      if (this.serial_port.isOpen) await this.serial_port.close();
    },
    async deinitScriptWatch() {
      if (this.script_watcher) this.script_watcher.stop();
      delete this.script_watcher;
    },
    start_parse() {
      if(this.process_files.length === 0) return;
      
      let files = this.process_files.slice();
      let folder = "" + this.script_folder;
      this.process_files = [];
      return Promise.map(
        files,
        filename => {
          return this.parse_file(path.join(folder, filename));
        },
        { concurrency: 4 }
      );
    },
    async parse_file(file) {
      let script = await Parser(file);
      if (script) {
        this.$set(this.script_map, file, script)

        if(!this.scripts.includes(file)) {
          if (script.type === "folder") {
            this.scripts.unshift(file);
          } else {
            this.scripts.push(file);
          }
        }
      } else {
        this.scripts = this.scripts.filter(_=> _ != file)
      }
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

